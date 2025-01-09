import { Link } from 'react-router-dom'
import add_Product_Icon from '../assets/Product_cart.svg';
import list_Product_Icon from '../assets/Product_list_icon.svg';

const Sidebar = () => {
    return (
        <div className="bg-[#f6f6f6] flex md:flex-col flex-row ma:max-w-[250px] md:max-w-[220px] w-full md:pt-9 py-5 justify-center md:justify-start md:h-screen gap-5">
            <Link to={'/addproduct'}>
                <div className='flex flex-col sd:flex-row text-center gap-5 items-center justify-center md:py-5 md:mx-5 p-5 w-full md:w-auto bg-white'>
                    <img src={add_Product_Icon} alt="" />
                    <p>Add Products</p>
                </div>
            </Link>
            <Link to={'/productlist'}>
                <div className='flex flex-col sd:flex-row text-center gap-5 items-center justify-center md:py-5 md:mx-5 p-5 w-full md:w-auto bg-white'>
                    <img src={list_Product_Icon} alt="" />
                    <p>Product List</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar