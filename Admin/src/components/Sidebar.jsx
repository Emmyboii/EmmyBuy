import { Link } from 'react-router-dom'
import add_Product_Icon from '../assets/Product_cart.svg';
import list_Product_Icon from '../assets/Product_list_icon.svg';

const Sidebar = () => {
    return (
        <div className="bg-[#f6f6f6] flex flex-col w-[250px] pt-9 h-screen gap-5">
            <Link to={'/addproduct'}>
                <div className='flex gap-5 items-center justify-center py-5 mx-5 bg-white'>
                    <img src={add_Product_Icon} alt="" />
                    <p>Add Products</p>
                </div>
            </Link>
            <Link to={'/productlist'}>
                <div className='flex gap-5 items-center justify-center py-5 mx-5 bg-white'>
                    <img src={list_Product_Icon} alt="" />
                    <p>Product List</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar