import { useState } from "react";
import upload_area from '../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        Name: "",
        Brand: "",
        New_price: "",
        Old_price: "",
        Image: null, // Initialize Image as null
        Category: "Phone & Accessories",
        Mini_Category: "",
        Sub_Category: "Mobile",
        Items_left: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const imageHandler = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const previewURL = URL.createObjectURL(selectedImage); // Create a temporary URL for the image
            setImage(selectedImage);
            setFormData((prev) => ({
                ...prev,
                Image: previewURL, // Use the preview URL instead of the File object
            }));
        }
    };

    const Add_Product = async () => {
        console.log(formData);
        let responseData;
        const product = { ...formData };
        const productData = new FormData();

        productData.append("product", image);

        try {
            // Upload image
            const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    Accept: 'application/json',
                },
                body: productData,
            });

            responseData = await uploadResponse.json();

            if (responseData.success) {
                product.Image = responseData.image_url;

                // Add product
                const addProductResponse = await fetch(`${import.meta.env.VITE_API_URL}/product/addproduct`, {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(product),
                });

                const result = await addProductResponse.json();

                if (result.success) {
                    alert("Product Added Successfully");
                } else {
                    alert("Failed to Add Product");
                }
            } else {
                alert("Failed to Upload Image");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            setImage(null);
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
            });
        }
    };

    return (
        <div className="max-w-[700px] md:w-full box-border py-[30px] mp:px-[50px] px-[20px] flex flex-col gap-6 m-[30px] bg-white">
            <p className="pt-5 text-[30px] flex items-center justify-center text-center">Add a Product</p>
            <div className="w-full text-[#7b7b7b] text-[18px]">
                <p>Product Name</p>
                <input
                    value={formData.Name}
                    onChange={handleChange}
                    className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] text-[#7b7b7b] outline-0 rounded text-[14px]"
                    type="text"
                    name="Name"
                    placeholder="Product name here"
                />
            </div>
            {/* Price Fields */}
            <div className="sk:flex gap-10">
                <div className="w-full text-[#7b7b7b] text-[18px]">
                    <p>Old Price</p>
                    <input
                        value={formData.Old_price}
                        onChange={handleChange}
                        className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[14px]"
                        type="text"
                        name="Old_price"
                        placeholder="Old price here"
                    />
                </div>
                <div className="w-full text-[#7b7b7b] text-[18px]">
                    <p>New Price</p>
                    <input
                        value={formData.New_price}
                        onChange={handleChange}
                        className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[14px]"
                        type="text"
                        name="New_price"
                        placeholder="New price here"
                    />
                </div>
            </div>
            {/* Brand and Image Upload */}
            <div className="sk:flex gap-10">
                <div className="w-full text-[#7b7b7b] text-[18px]">
                    <p>Brand</p>
                    <input
                        value={formData.Brand}
                        onChange={handleChange}
                        className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[14px]"
                        type="text"
                        name="Brand"
                        placeholder="Brand name here"
                    />
                </div>
                <div className="w-full text-[#7b7b7b] text-[18px]">
                    <label htmlFor="image">
                        <p>Image</p>
                        <img
                            className="h-[120px] w-[120px] cursor-pointer rounded-xl object-contain"
                            src={image ? URL.createObjectURL(image) : upload_area}
                            alt=""
                        />
                        <input
                            onChange={imageHandler}
                            type="file"
                            name="Image"
                            id="image"
                            hidden
                        />
                    </label>
                </div>
            </div>
            {/* Categories */}
            <div className='sk:flex gap-10'>
                <div className='w-full text-[#7b7b7b] text-[18px]'>
                    <p>Category</p>
                    <select value={formData.Category} onChange={handleChange} name="Category" className='w-full h-[50px] p-[10px] text-[14px] border-2 border-[#c3c3c3] rounded'>
                        <option value="Phone & Accessories">Phone & Accessories</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Drinks & Groceries">Drinks & Groceries</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Appliances">Appliances</option>
                    </select>
                </div>
                <div className='w-full text-[#7b7b7b] text-[18px]'>
                    <p>Sub Category</p>
                    <select value={formData.Sub_Category} onChange={handleChange} name="Sub_Category" className='w-full h-[50px] p-[10px] text-[14px] border-2 border-[#c3c3c3] rounded'>
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
            {/* Mini Category and Items Left */}
            <div className="sk:flex gap-10">
                <div className="w-full text-[#7b7b7b] text-[17px]">
                    <p>Mini Category</p>
                    <select
                        value={formData.Mini_Category}
                        onChange={handleChange}
                        name="Mini_Category"
                        className="h-[50px] p-[10px] text-[14px] border-2 border-[#c3c3c3] rounded"
                    >
                        <option value=""></option>
                        <option value="Wear">Wear</option>
                        <option value="Shoe">Shoe</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div className="w-full text-[#7b7b7b] text-[17px]">
                    <p>Items Left</p>
                    <input
                        value={formData.Items_left}
                        onChange={handleChange}
                        className="h-[50px] w-[70px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[18px]"
                        type="number"
                        name="Items_left"
                    />
                </div>
            </div>
            {/* Submit Button */}
            <button
                onClick={Add_Product}
                className="bg-blue-700 text-white w-[160px] h-[50px] rounded-lg mt-4 flex flex-col items-center justify-center"
            >
                Add
            </button>
        </div>
    );
};

export default AddProduct;
