import { useState, useEffect } from "react"
import upload_area from '../assets/upload_area.svg';

const EditProduct = () => {


    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({
        Name: "",
        New_price: "",
        Old_price: "",
        Image: image,
        Items_left: "",
    })

    useEffect(() => {
        let id = localStorage.getItem('ProductID')
        fetch(`${import.meta.env.VITE_API_URL}/product/productById`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData({
                    Name: data.Name || "",
                    New_price: data.New_price || "",
                    Old_price: data.Old_price || "",
                    Image: data.Image || "",
                    Items_left: data.Items_left || "",
                })
                setImage(data.Image || null);
            })
    }, [])

    useEffect(() => {
        let objectUrl;
        if (image instanceof File) {
            objectUrl = URL.createObjectURL(image);
        }
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [image]);

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const imageHander = (e) => {
        setImage(e.target.files[0])
    }

    const Edit_Product = async () => {
        const id = localStorage.getItem('ProductID'); // Retrieve product ID from localStorage
        let product = { ...formData, id }; // Include the ID in the payload
        let responseData = {};

        try {
            // If a new image is uploaded
            if (image instanceof File) {
                let uploadData = new FormData();
                uploadData.append('product', image); // Field name must match the backend

                // Upload the image
                responseData = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                    method: 'POST',
                    credentials: "include",
                    headers: { Accept: 'application/json' },
                    body: uploadData,
                }).then((res) => res.json());

                if (!responseData.success) {
                    throw new Error('Image upload failed');
                }

                // Use the uploaded image URL
                product.Image = responseData.image_url;
            }

            // Update the product details, including the new or existing image URL
            const updateResponse = await fetch(`${import.meta.env.VITE_API_URL}/product/updateProduct`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            const updateData = await updateResponse.json();
            if (updateData.success) {
                alert('Product Updated Successfully');
            } else {
                alert('Failed to Update Product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('An error occurred while updating the product.');
        } finally {
            setImage(null);
            setFormData({
                Name: "",
                New_price: "",
                Old_price: "",
                Image: "",
                Items_left: "",
            });
            window.location.replace('/productlist')
        }
    };


    return (
        <div className="max-w-[700px] md:w-full box-border py-[30px] mp:px-[50px] px-[20px] flex flex-col gap-6 m-[30px] bg-white">
            <p className="pt-5 text-[30px] flex items-center justify-center text-center">Edit Product</p>
            <div className='w-full text-[#7b7b7b] text-[18px]'>
                <p>Product Name</p>
                <input value={formData.Name} onChange={handleChange} className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] text-[#7b7b7b] outline-0 rounded text-[14px]" type="text" name="Name" placeholder="Product name here" />
            </div>
            <div className='sk:flex gap-10'>
                <div className='w-full text-[#7b7b7b] text-[18px]'>
                    <p>Old Price</p>
                    <input value={formData.Old_price} onChange={handleChange} className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[14px]" type="text" name="Old_price" placeholder="Old price here" />
                </div>
                <div className='w-full text-[#7b7b7b] text-[18px]'>
                    <p>New Price</p>
                    <input value={formData.New_price} onChange={handleChange} className="w-full h-[50px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[14px]" type="text" name="New_price" placeholder="New price here" />
                </div>
            </div>
            <div className='sk:flex gap-10'>
                <div className="w-full text-[#7b7b7b] text-[18px]">
                    <label htmlFor="image">
                        <p>Image</p>
                        <img className="h-[120px] w-[120px] cursor-pointer rounded-xl object-contain" src={image instanceof File ? URL.createObjectURL(image) : image || upload_area} alt="" />
                        <input onChange={imageHander} type="file" name="Image" id="image" hidden />
                    </label>
                </div>
                <div className='w-full text-[#7b7b7b] text-[17px]'>
                    <p>Item left</p>
                    <input value={formData.Items_left} onChange={handleChange} className="h-[50px] w-[70px] pl-[15px] box-border border-2 border-[#c3c3c3] outline-0 rounded text-[18px]" type="number" name="Items_left" />
                </div>
            </div>
            <button onClick={Edit_Product} className="bg-blue-700 text-white w-[160px] h-[50px] rounded-lg mt-4 flex flex-col items-center justify-center">Edit</button>
        </div>
    )
}

export default EditProduct