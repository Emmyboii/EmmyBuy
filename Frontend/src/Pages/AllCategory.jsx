import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import Item from '../Components/Item';
import { FaSort } from "react-icons/fa";
import { MdFilterAlt } from "react-icons/md";
import { ShopContext } from '../Context/ShopContext';

const AllCategory = (props) => {
    const { allProduct, setResults, selectedBrand, setSelectedBrand, selectedSubCategory, sortByRecent, sortInDescending, sortInAscending } = useContext(ShopContext)


    const results = JSON.parse(localStorage.getItem('SearchResult')) || allProduct;

    useEffect(() => {
        const updatedFilteredProducts = results.filter(item => {
            const matchesCategory = item.Category;
            const matchesSubCategory = selectedSubCategory
                ? item.Sub_Category === selectedSubCategory
                : true;
            const matchesBrand = selectedBrand.length > 0
                ? selectedBrand.includes(item.Brand)
                : true;

            return matchesCategory && matchesSubCategory && matchesBrand;
        });

        setResults(updatedFilteredProducts);

        const currentPage = window.location.pathname;
        localStorage.setItem('previousPage', currentPage)
    }, [results, selectedSubCategory, selectedBrand, setResults]);

    // Handle toggling brand selection
    const toggleBrandSelection = (brand) => {
        setSelectedBrand(prevSelectedBrand => {
            return prevSelectedBrand.includes(brand)
                ? prevSelectedBrand.filter(b => b !== brand)
                : [...prevSelectedBrand, brand];
        });
    };

    const brandHasProducts = (brand) => {
        return results.some(item => item.Brand === brand && item.Sub_Category === selectedSubCategory);
    };

    // const resetFilters = () => {
    //     setSelectedSubCategory([]);
    //     setSelectedBrand([]);
    // };


    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const capitalizeWords = (str) => {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

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
                                setResults(allProduct);
                                localStorage.removeItem('query')
                                localStorage.setItem('SearchResult', JSON.stringify(allProduct));
                            }}
                            className={localStorage.getItem('query') ? 'text-black cursor-pointer' : 'text-red-500 cursor-pointer'}
                        >
                            All Products
                        </div>
                        {localStorage.getItem('query') ? (
                            <IoIosArrowForward className='mt-[2px]' />
                        ) : (
                            ""
                        )}
                        <div className='text-red-500 cursor-pointer'>
                            {capitalizeWords(localStorage.getItem('query') || '')}
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='ma:text-[30px] md:text-[24px] sd:text-[30px] text-[24px] font-bold'>Shop with EmmyBuy</p>
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

            <div className='bg-white flex md:hidden items-center justify-between mt-[2px] text-red-500 sm:px-40 sd:px-20 px-10 py-2'>
                <p className='flex gap-2 items-center cursor-pointer'>
                    <MdFilterAlt />
                    FILTER
                </p>
                <div className='border-l-2 border-red-500 h-[30px]'></div>
                <p className='flex gap-2 items-center cursor-pointer'>
                    <FaSort />
                    SORT
                </p>
            </div>

            <img className='w-full md:h-[500px] object-fill sd:p-5 sr:p-2 p-5' src={props.banner} alt="" />

            <div className='sd:m-5 sr:m-2 m-5 md:flex xl:gap-5 gap-3'>
                {/* Sidebar */}
                <div className='bg-white lg:w-[260px] mk:w-[220px] w-[250px] hidden p-4 h-screen md:flex flex-col gap-2'>
                    <div>
                        <h1 className='lg:text-[21px] mk:text-[18px] text-[21px] font-bold'>Browse Categories</h1>
                        {[...new Set(
                            allProduct
                                .filter(item => item.Category) // Filter by category
                                .map(item => item.Category)
                        )].map((cat, i) => (
                            <p key={i} className='text-[17px] mt-1 ml-5 cursor-pointer'>
                                {cat}
                            </p>
                        ))}
                    </div>

                    {/* Brands */}
                    <div>
                        <p className='text-[21px] font-bold'>Brands</p>
                        {[...new Set(
                            allProduct
                                .filter(item => item.Category && item.Brand.trim() !== "")
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
                    {results.length > 0 ? (
                        <div className='grid lg:grid-cols-4 mk:grid-cols-3 sr:grid-cols-2 grid-cols- xl:gap-3 sd:gap-3 sr:gap-[3px] gap-4 cursor-pointer'>
                            {results
                                .map((item, i) => (
                                    <Item
                                        key={i}
                                        id={item.id}
                                        Image={item.Image}
                                        Name={item.Name}
                                        Old_price={item.Old_price}
                                        New_price={item.New_price}
                                    />
                                ))}
                        </div>
                    ) : (
                        <div className='grid grid-cols-4 gap-3 cursor-pointer'>
                            {allProduct
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
                    )}

                </div>
            </div>
        </>
    )
}

export default AllCategory