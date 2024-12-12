import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import SimilarItems from './SimilarItems';

const SimilarProducts = () => {
    const { allProduct } = useContext(ShopContext);
    const { productID } = useParams();

    const product = allProduct.find((item) => item.id === Number(productID));

    const randomItems = useMemo(() => {
        const acc = allProduct.filter(
            (item) => item.Brand === product.Brand && item.id !== Number(productID)
        );
        const filteredItems = acc.filter((item) => item.Sub_Category === product.Sub_Category);
        const shuffledItems = filteredItems.sort(() => Math.random() - 0.5);
        return shuffledItems.slice(0, 5);
    }, [allProduct, product, productID]);

    return (
        <div className='mx-7'>
            <p className='mb-2 text-[25px] font-bold'>You may also like</p>
            <div className=' bg-white grid grid-cols-5 mb-4'>
                {randomItems
                    .map((item, i) => (
                        <SimilarItems
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
    )
}

export default SimilarProducts