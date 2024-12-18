import { useState } from "react"
import upload_area from '../assets/upload_area.svg';


const AddProduct = () => {

    const [image, setImage] = useState(false)
    const [formData, setFormData] = useState({
        Name: "",
        Brand: "",
        New_price: "",
        Old_price: "",
        Image: image,
        Category: "Phone & Accessories",
        Mini_Category: "",
        Sub_Category: "Mobile",
        Items_left: "",
    })

      const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const imageHander = (e) => {
        setImage(e.target.files[0])
    }

    const Add_Product = async () => {
        console.log(formData);
        let responseData;
        let product = { ...formData }

        let productData = new FormData()
        productData.append("product", image)

        await fetch('http://localhost:5000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: productData,
        }).then((res) => res.json())
            .then((data) => responseData = data)
        if (responseData.success) {
            try {
                product.Image = responseData.image_url
                console.log(product);
                await fetch('http://localhost:5000/product/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product),
                }).then((res) => res.json())
                    .then((data) => {
                        data.success ? alert("Product Added Successfully") : alert("Failed to add Product")
                    })
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setImage(false)
                setFormData({
                    Name: "",
                    Brand: "",
                    New_price: "",
                    Old_price: "",
                    Image: image,
                    Category: "Phone & Accessories",
                    Mini_Category: "",
                    Sub_Category: "Mobile",
                    Items_left: "",
                })
            }
        }
    }

    return (
        <div className="w-[700px] box-border py-[30px] px-[50px] flex flex-col gap-6 m-[30px] bg-white">
            <p className="pt-5 text-[30px] flex items-center justify-center text-center">Add a Product</p>
            <div className='w-full text-[#7b7b7b] text-[18px]'>
                <p>Product Name</p>
                <input value={formData.Name} onChange={handleChange} className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] text-[#7b7b7b] outline-0 rounded text-[14px]" type="text" name="Name" placeholder="Product name here" />
            </div>
            <div className='flex gap-10'>
                <div className='w-full text-[#7b7b7b] text-[18px]'>
                    <p>Old Price</p>
                    <input value={formData.Old_price} onChange={handleChange} className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[14px]" type="text" name="Old_price" placeholder="Old price here" />
                </div>
                <div className='w-full text-[#7b7b7b] text-[18px]'>
                    <p>New Price</p>
                    <input value={formData.New_price} onChange={handleChange} className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[14px]" type="text" name="New_price" placeholder="New price here" />
                </div>
            </div>
            <div className='flex gap-10'>
                <div className='w-full text-[#7b7b7b] text-[18px]'>
                    <p>Brand</p>
                    <input value={formData.Brand} onChange={handleChange} className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[14px]" type="text" name="Brand" placeholder="Brand name here" />
                </div>
                <div className="w-full text-[#7b7b7b] text-[18px]">
                    <label htmlFor="image">
                        <p>Image</p>
                        <img className="h-[120px] w-[120px] cursor-pointer rounded-xl object-contain" src={image ? URL.createObjectURL(image) : upload_area} alt="" />
                        <input onChange={imageHander} type="file" name="Image" id="image" hidden />
                    </label>
                </div>
            </div>
            <div className='flex gap-10'>
                <div className='w-full text-[#7b7b7b] text-[18px]'>
                    <p>Category</p>
                    <select value={formData.Category} onChange={handleChange} name="Category" className='h-[50px] p-[10px] text-[14px] border-2 border-[#c3c3c3] rounded'>
                        <option value="Phone & Accessories">Phone & Accessories</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Drinks & Groceries">Drinks & Groceries</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Appliances">Appliances</option>
                    </select>
                </div>
                <div className='w-full text-[#7b7b7b] text-[18px]'>
                    <p>Sub Category</p>
                    <select value={formData.Sub_Category} onChange={handleChange} name="Sub_Category" className='h-[50px] p-[10px] text-[14px] border-2 border-[#c3c3c3] rounded'>
                        <option value="Mobile">Mobile</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                        <option value="Alcohol">Alcohol</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Soft_drink">Soft Drink</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="XBox">XBox</option>
                        <option value="Small">Small</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
            </div>
            <div className='flex gap-10'>
                <div className='w-full text-[#7b7b7b] text-[17px]'>
                    <p>Mini Category</p>
                    <select value={formData.Mini_Category} onChange={handleChange} name="Mini_Category" className='h-[50px] p-[10px] text-[14px] border-2 border-[#c3c3c3] rounded'>
                        <option value=""></option>
                        <option value="Wear">Wear</option>
                        <option value="Shoe">Shoe</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div className='w-full text-[#7b7b7b] text-[17px]'>
                    <p>Item left</p>
                    <input value={formData.Items_left} onChange={handleChange} className="h-[50px] w-[70px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[18px]" type="number" name="Items_left" />
                </div>
            </div>
            <button onClick={Add_Product} className="bg-blue-700 text-white w-[160px] h-[50px] rounded-lg mt-4 flex flex-col items-center justify-center">Add</button>
        </div>
    )
}

export default AddProduct