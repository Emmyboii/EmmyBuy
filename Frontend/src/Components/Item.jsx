import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdHeart } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";

const Item = (props) => {

    const { addToCart, saveItem, removeSaveItem, setCartModal, setSavedRemoveModal, setSavedModal } = useContext(ShopContext)

    const [isClicked, setIsClicked] = useState(false);

    const navigate = useNavigate()

    const handleClick = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Store item ID and redirect to login if not logged in
            localStorage.setItem('pendingSaveItem', props.id);
            navigate('/login');
        } else {
            // Toggle Save/Remove if logged in
            if (isClicked === false) {
                setIsClicked(true);
                saveItem(props.id);
                setSavedModal(true);
            } else {
                setIsClicked(false);
                removeSaveItem(props.id);
                setSavedRemoveModal(true);
            }
        }
    };

    // Scroll to Top on Product Click
    const handleProductClick = () => {
        window.scrollTo(0, 0);
    };

    // Check after Login for Pending Save Item
    useEffect(() => {
        const token = localStorage.getItem('token');
        const pendingItemId = localStorage.getItem('pendingSaveItem');

        if (token && pendingItemId) {
            saveItem(pendingItemId);
            setSavedModal(true);
            localStorage.removeItem('pendingSaveItem');
        }
    }, [saveItem, setSavedModal]);

    return (
        <div className="xl:w-[230px] lg:w-[194px] md:w-[210px] rounded-md bg-white hover:scale-[1.02] py-4 px-3 duration-300 relative flex flex-col justify-between h-full">
            <Link
                to={`/product/${props.id}`}
                onClick={handleProductClick}
                className="flex-grow flex flex-col justify-between"
            >
                <div>
                    <img
                        src={props.Image}
                        alt={`${props.Name}`}
                        className="w-full"
                    />
                    <p className="my-3 line-clamp-[2] text-center">{props.Name}</p>
                </div>
                <div className="mt-auto">
                    <div className="flex gap-1 justify-center sd:text-[18px] text-[16px] font-semibold">
                        <p className="flex items-center">
                            <TbCurrencyNaira className="sd:text-[21px]" />
                            {props.New_price}
                        </p>
                        {props.Old_price > 0 && (
                            <p className="line-through text-[#a19f9f] flex items-center font-medium">
                                <TbCurrencyNaira className="text-[21px]" />
                                {props.Old_price}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
            <button
                onClick={() => {
                    addToCart(props.id);
                    setCartModal(true);
                }}
                className="bg-orange-500 h-[50px] w-full text-white font-bold mt-3"
            >
                ADD TO CART
            </button>
            <IoMdHeart
                className={`absolute top-2 right-2 text-2xl cursor-pointer ${isClicked ? 'text-orange-400' : 'text-transparent'
                    } hover:text-orange-400`}
                style={{
                    stroke: isClicked ? 'orange' : 'red',
                    strokeWidth: 16,
                }}
                onClick={handleClick}
            />
        </div>
    );
}

export default Item