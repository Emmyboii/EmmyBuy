import React, { useContext } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Display from '../Components/Display';
import ProductDescription from '../Components/ProductDescription';
import SimilarProducts from '../Components/SimilarProducts';

const ProductDisplay = () => {
    const { allProduct } = useContext(ShopContext);
    const { productID } = useParams();
    const product = allProduct.find((item) => item.id === Number(productID));

    return (
        <div className='flex flex-col gap-4'>
            <div className="bg-white px-5 flex flex-col gap-4 py-5 shadow-md">
                <div>
                    <div className="flex items-center gap-2">
                        <p>Home</p>
                        <IoIosArrowForward className="mt-[2px]" />
                        {product.Category}
                        <IoIosArrowForward className="mt-[2px]" />
                        <p>
                            {[...new Set([product.Sub_Category])]
                                .map((sub, i) => {
                                    if (sub === "Mobile" || sub === "Tablet") {
                                        return <p key={i}>{sub} Phone</p>
                                    } else if (sub === "Accessories") {
                                        return <p key={i}>Phone {sub}</p>
                                    } else {
                                        return <p key={i}>{sub}</p>
                                    }
                                })
                            }
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[30px] font-bold">{product.Category}</div>
                </div>
            </div>

            <Display product={product} />
            <ProductDescription product={product} />
            <SimilarProducts product={product} />
        </div>
    );
};

export default ProductDisplay;
