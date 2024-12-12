import React, { useContext, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import Item from '../Components/Item';
import { ShopContext } from '../Context/ShopContext';

const ShopCategory = (props) => {

    const { allProduct } = useContext(ShopContext)
    const [selectedBrand, setSelectedBrand] = useState(null)
    const [selectedSubCategory, setSelectedSubCategory] = useState(null)


    const filteredProducts = allProduct.filter(item => {
        const matchesSubCategory = selectedSubCategory ? item.Sub_Category === selectedSubCategory : true;
        const matchesBrand = selectedBrand ? item.Brand === selectedBrand : true;
        const matchesCategory = item.Category === props.Category;

        return matchesSubCategory && matchesBrand && matchesCategory;
    });

    const brandHasProducts = (brand) => {
        return allProduct.some(item => item.Brand === brand && item.Category === props.Category && item.Sub_Category === selectedSubCategory);
    };

    return (
        <>
            {/*Navbar*/}
            <div className='bg-white px-5 flex flex-col gap-4 py-5 shadow-md'>
                {/* Breadcrum */}
                <div>
                    <div className='flex items-center gap-2'>
                        Home <IoIosArrowForward className='mt-[2px]' /> {props.name}
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='text-[30px] font-bold'>{props.name}</div>
                    <div className='flex gap-2'>
                        <p>Sort by:</p>
                        <div className='flex'>
                            <p className='border border-red-500 px-2'>Recent</p>
                            <p className='border border-red-500 px-2'>Price - High To Low</p>
                            <p className='border border-red-500 px-2'>Price - Low To High</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='m-5 flex gap-5'>
                {/* Sidebar */}
                <div className='bg-white w-[260px] p-4 h-screen flex flex-col gap-2'>
                    <div>
                        <h1 className='text-[21px] font-bold'>Browse Categories</h1>
                        {[...new Set(
                            allProduct
                                .filter(item => item.Category === props.Category) // Filter by category
                                .map(item => item.Category)
                        )].map((cat, i) => (
                            <p key={i} className='font-bold text-[18px] cursor-pointer'>{cat}</p>
                        ))}

                        {/* Category */}
                        {[...new Set(
                            allProduct
                                .filter(item => item.Category === props.Category) // Filter by category
                                .map(item => item.Sub_Category) // Extract relevant properties
                        )]
                            .map((cat, i) => {
                                if (cat === "Accessories") {
                                    return <p onClick={() => setSelectedSubCategory(cat)} key={i} className='ml-5 cursor-pointer'>Phone {cat}</p>;
                                } else if (cat === "Mobile" || cat === "Tablet") {
                                    return <p onClick={() => setSelectedSubCategory(cat)} key={i} className='ml-5 cursor-pointer'>{cat} Phones</p>;
                                }
                                return <p onClick={() => setSelectedSubCategory(cat)} key={i} className='ml-5 cursor-pointer'>{cat}</p>;
                            })}
                    </div>

                    {/* Brands */}
                    <div>
                        <p className='text-[21px] font-bold'>Brands</p>
                        {[...new Set(
                            allProduct
                                .filter(item => item.Category === props.Category) // Filter by category
                                .map(item => item.Brand) // Extract brands
                        )].map((brand, i) => {
                            if (selectedSubCategory) {
                                // If a sub-category is selected, only show brands with products in that sub-category
                                if (brandHasProducts(brand)) {
                                    return (
                                        <div key={i}>
                                            <label className='flex gap-1'>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrand === brand}
                                                    onChange={() => setSelectedBrand(brand === selectedBrand ? null : brand)} // Toggle the selected brand
                                                />
                                                {brand}
                                            </label>
                                        </div>
                                    );
                                }
                                return null; // Skip brands with no products in the selected sub-category
                            } else {
                                // Show all brands if no sub-category is selected
                                return (
                                    <div key={i}>
                                        <label className='flex gap-1'>
                                            <input
                                                type="checkbox"
                                                checked={selectedBrand === brand}
                                                onChange={() => setSelectedBrand(brand === selectedBrand ? null : brand)} // Toggle the selected brand
                                            />
                                            {brand}
                                        </label>
                                    </div>
                                );
                            }

                        })}
                    </div>
                </div>

                {/* Display */}
                <div className='grid grid-cols-4 gap-3 cursor-pointer'>
                    {filteredProducts
                        .map((item, i) => (
                            <Item
                                key={i}
                                id={item.id}
                                Image={item.Image}
                                Name={item.Name}
                                Old_price={item.Old_price}
                                New_price={item.New_price}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ShopCategory