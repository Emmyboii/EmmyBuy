import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import Item from '../Components/Item';
import { ShopContext } from '../Context/ShopContext';

const ShopCategory = (props) => {

    const { allProduct } = useContext(ShopContext)
    const [selectedBrand, setSelectedBrand] = useState([])
    const [selectedSubCategory, setSelectedSubCategory] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const updatedFilteredProducts = allProduct.filter(item => {
            const matchesCategory = item.Category === props.Category;
            const matchesSubCategory = selectedSubCategory
                ? item.Sub_Category === selectedSubCategory
                : true;
            const matchesBrand = selectedBrand.length > 0
                ? selectedBrand.includes(item.Brand)
                : true;

            return matchesCategory && matchesSubCategory && matchesBrand;
        });

        setFilteredProducts(updatedFilteredProducts);

        const currentPage = window.location.pathname;
        localStorage.setItem('previousPage', currentPage)
    }, [allProduct, props.Category, selectedSubCategory, selectedBrand]);

    // Handle toggling brand selection
    const toggleBrandSelection = (brand) => {
        setSelectedBrand(prevSelectedBrand => {
            return prevSelectedBrand.includes(brand)
                ? prevSelectedBrand.filter(b => b !== brand)
                : [...prevSelectedBrand, brand];
        });
    };

    const brandHasProducts = (brand) => {
        return allProduct.some(item => item.Brand === brand && item.Category === props.Category && item.Sub_Category === selectedSubCategory);
    };

    const resetFilters = () => {
        setSelectedSubCategory([]);
        setSelectedBrand([]);
    };

    const sortInAscending = () => {
        setFilteredProducts(
            [...filteredProducts].sort((a, b) => a.New_price - b.New_price)
        )
    }
    const sortInDescending = () => {
        setFilteredProducts(
            [...filteredProducts].sort((a, b) => b.New_price - a.New_price)
        )
    }

    const sortByRecent = () => {
        setFilteredProducts(
            [...filteredProducts].sort((a, b) => new Date(b.Date) - new Date(a.Date))
        )
    }

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <>
            {/*Navbar*/}
            <div className='bg-white px-5 flex flex-col gap-4 py-5 w-full shadow-md'>
                {/* Breadcrum */}
                <div>
                    <div className='flex items-center gap-1'>
                        <Link to={'/'}>Home</Link>
                        <IoIosArrowForward className='mt-[2px]' />
                        <div
                            onClick={() => {
                                resetFilters(); // Reset filters
                                setSelectedSubCategory(null); // Optionally set specific category
                            }}
                            className={selectedSubCategory ? 'text-black cursor-pointer' : 'text-red-500 cursor-pointer'}
                        >
                            {props.name}
                        </div>
                        {selectedSubCategory ? (
                            <div className='flex items-center'>
                                <IoIosArrowForward className='mt-[2px]' />
                                <p className='text-red-500'>{selectedSubCategory}</p>
                            </div>
                        ) : ''}
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='text-[30px] font-bold'>{props.name}</div>
                    <div className='flex gap-2'>
                        <p>Sort by:</p>
                        <div className='flex'>
                            <p onClick={sortByRecent} className='border border-red-500 p-2 cursor-pointer'>Recent</p>
                            <p onClick={sortInDescending} className='border border-red-500 p-2 cursor-pointer'>Price - High To Low</p>
                            <p onClick={sortInAscending} className='border border-red-500 p-2 cursor-pointer'>Price - Low To High</p>
                        </div>
                    </div>
                </div>
            </div>

            <img className='w-full h-[500px] object-fill p-5' src={props.banner} alt="" />

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
                            <p
                                key={i}
                                onClick={() => {
                                    resetFilters(); // Reset filters
                                    setSelectedSubCategory(null); // Optionally set specific category
                                }}
                                className='font-bold text-[18px] mt-1 cursor-pointer'
                            >
                                {cat}
                            </p>
                        ))}

                        {/* Sub_Category */}
                        {[...new Set(
                            allProduct
                                .filter(item => item.Category === props.Category) // Filter by category
                                .map(item => item.Sub_Category) // Extract relevant properties
                        )]
                            .map((subcat, i) => {
                                if (subcat === "Accessories") {
                                    return (
                                        <label key={i} className="ml-5 cursor-pointer flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="subcategory"
                                                value={subcat}
                                                checked={selectedSubCategory === subcat}
                                                onChange={() => setSelectedSubCategory(subcat)} // Set selected subcategory
                                            />
                                            Phone {subcat}
                                        </label>
                                    )
                                } else if (subcat === "Mobile" || subcat === "Tablet") {
                                    return (
                                        <label key={i} className="ml-5 cursor-pointer flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="subcategory"
                                                value={subcat}
                                                checked={selectedSubCategory === subcat}
                                                onChange={() => setSelectedSubCategory(subcat)} // Set selected subcategory
                                            />
                                            {subcat} Phones
                                        </label>
                                    )
                                }
                                return (
                                    <label key={i} className="ml-5 cursor-pointer flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="subcategory"
                                            value={subcat}
                                            checked={selectedSubCategory === subcat}
                                            onChange={() => setSelectedSubCategory(subcat)} // Set selected subcategory
                                        />
                                        {subcat}
                                    </label>
                                )
                            })}
                    </div>

                    {/* Brands */}
                    <div>
                        <p className='text-[21px] font-bold'>Brands</p>
                        {[...new Set(
                            allProduct
                                .filter(item => item.Category === props.Category)
                                .map(item => item.Brand)
                        )].map((brand, i) => {
                            if (selectedSubCategory) {
                                // If a sub-category is selected, only show brands with products in that sub-category
                                if (brandHasProducts(brand)) {
                                    return (
                                        <div key={i}>
                                            <label className='flex gap-1 ml-5'>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrand.includes(brand)}
                                                    onChange={() => toggleBrandSelection(brand)}
                                                />
                                                {capitalize(brand)}
                                            </label>
                                        </div>
                                    );
                                }
                                return null;
                            } else {
                                // Show all brands if no sub-category is selected
                                return (
                                    <div key={i}>
                                        <label className='flex gap-1 ml-5'>
                                            <input
                                                type="checkbox"
                                                checked={selectedBrand.includes(brand)}
                                                onChange={() => toggleBrandSelection(brand)}
                                            />
                                            {capitalize(brand)}
                                        </label>
                                    </div>
                                );
                            }

                        })}
                    </div>
                </div>

                {/* Display */}
                <div>
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
            </div>
        </>
    )
}

export default ShopCategory