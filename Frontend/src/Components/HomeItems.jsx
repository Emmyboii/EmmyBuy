import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import { IoMdHeart } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";

const HomeItems = (props) => {
    const { saveItem, removeSaveItem, setSavedModal, setSavedRemoveModal } = useContext(ShopContext);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            localStorage.setItem('pendingSaveItem', props.id);
            window.location.replace('/login');
        } else {
            if (!isClicked) {
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

    const handleProductClick = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const pendingItemId = localStorage.getItem('pendingSaveItem');

        if (token && pendingItemId) {
            saveItem(pendingItemId);
            setSavedModal(true);
            localStorage.removeItem('pendingSaveItem');
        }
    }, [saveItem, setSavedModal]);

    const maxItem = props.Items_left < 50 ? 50 : props.Items_left < 150 ? 150 : 200;
    const percentage = (props.Items_left / maxItem) * 100;

    return (
        <div className="w-[240px] p-2 bg-white relative flex flex-col justify-between h-full">
            <Link
                to={`/product/${props.id}`}
                onClick={handleProductClick}
                className="flex-grow flex flex-col justify-between"
            >
                <div className="bg-white hover:shadow-xl px-2 py-[2px] flex-grow flex flex-col justify-between">
                    <div className="flex-grow flex flex-col justify-between">
                        <div>
                            <div className="h-[200px] overflow-hidden">
                                <img
                                    src={props.Image}
                                    alt={props.Name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="my-3 line-clamp-2 text-sm font-medium">{props.Name}</p>
                        </div>
                        <div>
                            <div className="flex gap-2 text-[18px] font-semibold">
                                <p className="flex items-center"><TbCurrencyNaira className="text-[21px]" /> {props.New_price}</p>
                                {props.Old_price > 0 && (
                                    <p className="line-through text-[#a19f9f] flex items-center font-medium">
                                        <TbCurrencyNaira className="text-[21px]" /> {props.Old_price}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm">{props.Items_left} items left</p>
                            <div className="w-full h-[10px] bg-[#e0e0e0] rounded-md">
                                <div
                                    className={`h-full rounded-md ${percentage > 40 ? "bg-green-500" : "bg-red-500"}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>

                    </div>
                </div>
            </Link>
            <IoMdHeart
                className={`absolute top-1 right-4 text-2xl cursor-pointer ${isClicked ? 'text-orange-400' : 'text-transparent'} hover:text-orange-400`}
                style={{
                    stroke: isClicked ? "orange" : "red",
                    strokeWidth: 16,
                }}
                onClick={handleClick}
            />
        </div>
    );
};

export default HomeItems;
