import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { FaArrowLeft } from "react-icons/fa6";

const FilterAndSort = (props) => {
    const {
        allProduct,
        selectedBrand,
        setSelectedBrand,
        selectedSubCategory,
        setSelectedSubCategory,
        setFilteredProducts,
        categorySideBar1,
        onClickCategoryMenu1,
        categorySideBar2,
        onClickCategoryMenu2,
        sortByRecent,
        sortInDescending,
        sortInAscending,
    } = useContext(ShopContext);

    const [selectedSort, setSelectedSort] = useState('');

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

    useEffect(() => {
        if (categorySideBar1 || categorySideBar2) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [categorySideBar1, categorySideBar2]);

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
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const applySort = useCallback((sortType) => {
        if (sortType === 'recent') {
            sortByRecent();
        } else if (sortType === 'high-to-low') {
            sortInDescending();
        } else if (sortType === 'low-to-high') {
            sortInAscending();
        }
    }, [sortByRecent, sortInDescending, sortInAscending]);

    useEffect(() => {
        const savedSortType = localStorage.getItem('selectedSortType');
        if (savedSortType) {
            setSelectedSort(savedSortType);
            applySort(savedSortType);
        }
    }, [applySort]);

    const handleSort = (sortType) => {
        setSelectedSort(sortType);
        localStorage.setItem('selectedSortType', sortType);
        applySort(sortType);
    };

    return (
        <>
            {/* Category Sidebar 1 */}
            <div className={categorySideBar1 ? 'bg-white w-full fixed top-0 left-0 duration-700 flex p-4 h-screen md:hidden z-50 flex-col gap-2' : 'bg-white w-full fixed top-0 left-[-100%] duration-700 flex p-4 z-50 h-screen md:hidden flex-col gap-2'}>
                <div>
                    <h1 className='lg:text-[21px] mk:text-[18px] text-[21px] font-bold'>Browse Categories</h1>
                    {[...new Set(
                        allProduct
                            .filter(item => item.Category === props.Category)
                            .map(item => item.Category)
                    )].map((cat, i) => (
                        <p
                            key={i}
                            onClick={() => {
                                resetFilters();
                                setSelectedSubCategory(null);
                            }}
                            className='font-bold text-[18px] mt-1 cursor-pointer'
                        >
                            {cat}
                        </p>
                    ))}

                    {/* Sub Categories */}
                    {[...new Set(
                        allProduct
                            .filter(item => item.Category === props.Category)
                            .map(item => item.Sub_Category?.trim())
                    )].map((subcat, i) => (
                        <div key={i}>
                            <label className="ml-5 cursor-pointer flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="subcategory"
                                    value={subcat}
                                    checked={selectedSubCategory === subcat}
                                    onChange={() => {
                                        setSelectedSubCategory(subcat);
                                        localStorage.setItem('selectedSubCategory', subcat);
                                    }}
                                />
                                {subcat === "Accessories"
                                    ? `Phone ${subcat}`
                                    : subcat === "Mobile" || subcat === "Tablet"
                                        ? `${subcat} Phones`
                                        : subcat
                                }
                            </label>
                        </div>
                    ))}
                </div>

                {/* Brands */}
                <div>
                    <p className='text-[21px] font-bold'>Brands</p>
                    {[...new Set(
                        allProduct
                            .filter(item => item.Category === props.Category && item.Brand.trim() !== "")
                            .map(item => item.Brand)
                    )].map((brand, i) => {
                        if (selectedSubCategory) {
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

                <button className='absolute bottom-20 left-[25%] right-[25%] text-white text-[20px] p-3 rounded-lg bg-red-500' onClick={onClickCategoryMenu1}>Apply Filter</button>
            </div>

            {/* Category Sidebar 2 */}
            <div className={categorySideBar2 ? 'flex flex-col fixed top-0 left-0 w-full bg-white z-50 h-screen duration-500' : 'flex flex-col fixed top-0 left-[-100%] z-50 w-full h-screen bg-white duration-500'}>
                <div className='md:hidden flex flex-col gap-2'>
                    <div className='flex items-center gap-2 text-[21px] font-bold p-2 shadow-lg'>
                        <FaArrowLeft onClick={onClickCategoryMenu2} />
                        <p>Sort</p>
                    </div>
                    <div>
                        <div className="flex gap-2 p-2">
                            <input
                                type="radio"
                                name="sort"
                                checked={selectedSort === 'recent'}
                                onChange={() => handleSort('recent')}
                            />
                            <p onClick={() => handleSort('recent')} className="cursor-pointer">Recent</p>
                        </div>
                        <hr />
                        <div className="flex gap-2 p-2">
                            <input
                                type="radio"
                                name="sort"
                                checked={selectedSort === 'high-to-low'}
                                onChange={() => handleSort('high-to-low')}
                            />
                            <p onClick={() => handleSort('high-to-low')} className="cursor-pointer">Price - High To Low</p>
                        </div>
                        <hr />
                        <div className="flex gap-2 p-2">
                            <input
                                type="radio"
                                name="sort"
                                checked={selectedSort === 'low-to-high'}
                                onChange={() => handleSort('low-to-high')}
                            />
                            <p onClick={() => handleSort('low-to-high')} className="cursor-pointer">Price - Low To High</p>
                        </div>
                        <hr />
                    </div>
                </div>

                <button className='absolute bottom-20 left-[25%] right-[25%] text-white text-[20px] p-3 rounded-lg bg-red-500' onClick={onClickCategoryMenu2}>Apply</button>
            </div>
        </>
    );
};

export default FilterAndSort;
