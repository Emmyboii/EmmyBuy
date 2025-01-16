import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import { MdFilterAlt } from "react-icons/md";
import Item from '../Components/Item';
import { ShopContext } from '../Context/ShopContext';
import FilterAndSort from '../Components/FilterAndSort';

const ShopCategory = (props) => {

    const { allProduct, selectedBrand, setSelectedBrand, selectedSubCategory, setSelectedSubCategory, filteredProducts, setFilteredProducts, onClickCategoryMenu1, onClickCategoryMenu2, sortByRecent, sortInDescending, sortInAscending } = useContext(ShopContext)


    useEffect(() => {
        // Retrieve saved filters from localStorage
        const savedBrands = JSON.parse(localStorage.getItem('selectedBrand')) || [];
        const savedSubCategory = localStorage.getItem('selectedSubCategory') || null;

        if (savedBrands.length > 0) {
            setSelectedBrand(savedBrands);
        }

        if (savedSubCategory) {
            setSelectedSubCategory(savedSubCategory);
        }
    }, [setSelectedBrand, setSelectedSubCategory]);

    useEffect(() => {
        // Update filtered products based on selected filters
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

        // Save current filters to localStorage
        localStorage.setItem('selectedBrand', JSON.stringify(selectedBrand));
        localStorage.setItem('selectedSubCategory', selectedSubCategory);

        // Save current page to localStorage (optional)
        const currentPage = window.location.pathname;
        localStorage.setItem('previousPage', currentPage);
    }, [allProduct, props.Category, selectedSubCategory, selectedBrand, setFilteredProducts]);


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
        setSelectedSubCategory(null);
        setSelectedBrand([]);
        localStorage.removeItem('selectedBrand');
        localStorage.removeItem('selectedSubCategory');
    };


    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <>
            {/*Navbar*/}
            <div className='bg-white px-5 flex flex-col gap-4 py-5 w-full z-40 shadow-md shadow-black'>
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
                    <div className='ma:text-[30px] md:text-[24px] sd:text-[30px] text-[24px] font-bold'>{props.name}</div>
                    <div className='md:flex hidden gap-2'>
                        <p>Sort by:</p>
                        <div className='flex'>
                            <p onClick={sortByRecent} className='border border-red-500 p-2 cursor-pointer'>Recent</p>
                            <p onClick={sortInDescending} className='border border-red-500 p-2 cursor-pointer'>Price - High To Low</p>
                            <p onClick={sortInAscending} className='border border-red-500 p-2 cursor-pointer'>Price - Low To High</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white w-full flex md:hidden items-center justify-between mt-[2px] text-red-500 py-2'>
                <p onClick={onClickCategoryMenu1} className='flex w-full gap-2 items-center justify-center cursor-pointer'>
                    <MdFilterAlt />
                    FILTER
                </p>
                <div className='border-l-2 border-red-500 h-[30px]'></div>
                <p onClick={onClickCategoryMenu2} className='flex w-full gap-2 items-center justify-center cursor-pointer'>
                    <FaSort />
                    SORT
                </p>
            </div>

            <FilterAndSort Category={props.Category} />

            <img className='w-full md:h-[500px] object-fill sd:p-5 sr:p-2 p-5' src={props.banner} alt="" />

            <div className='sd:m-5 sr:m-2 m-5 md:flex xl:gap-5 gap-3'>
                {/* Sidebar */}
                <div className='bg-white lg:w-[260px] mk:w-[220px] w-[250px] hidden p-4 h-screen md:flex flex-col gap-2'>
                    <div>
                        <h1 className='lg:text-[21px] mk:text-[18px] text-[21px] font-bold'>Browse Categories</h1>
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
                            .map((subcat, i) => (
                                <label key={i} className="ml-5 cursor-pointer flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="subcategory"
                                        value={subcat}
                                        checked={selectedSubCategory === subcat}
                                        onChange={() => setSelectedSubCategory(subcat)} // Set selected subcategory
                                    />
                                    {subcat === "Accessories"
                                        ? `Phone ${subcat}`
                                        : subcat === "Mobile" || subcat === "Tablet"
                                            ? `${subcat} Phones`
                                            : subcat}
                                </label>
                            ))}
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
                                            <label className='flex gap-1 ml-5 cursor-pointer'>
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
                                        <label className='flex gap-1 ml-5 cursor-pointer'>
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
                    <div className='grid lg:grid-cols-4 mk:grid-cols-3 sr:grid-cols-2 grid-cols- xl:gap-3 sd:gap-3 sr:gap-[3px] gap-4 cursor-pointer'>
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