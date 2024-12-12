import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo1 from '../assets/Homelogo2.jpg';
import logo2 from '../assets/Homelogo3.jpg';
import logo3 from '../assets/Homelogo4.jpg';
import logo4 from '../assets/Homelogo7.jpg';
import logo5 from '../assets/Homelogo6.jpg';
import logo6 from '../assets/Homelogo1.jpg';
import {
    IoIosArrowForward,
    IoIosArrowBack,
} from "react-icons/io";

const CustomPrevArrow = ({ onClick, show }) => {
    if (show === false) return null
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                zIndex: 1,
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "10px",
                borderRadius: "50%",
                transition: "opacity 0.3s ease"
            }}
            onClick={onClick}
        >
            <IoIosArrowBack />
        </div>
    );
};

const CustomNextArrow = ({ onClick, show }) => {
    if (show === false) return null
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                zIndex: 1,
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "10px",
                borderRadius: "50%",
                transition: "opacity 0.3s ease"
            }}
            onClick={onClick}
        >
            <IoIosArrowForward />
        </div>
    );
};

const HeroBanner = () => {


    const [hovered, setHovered] = useState(false);



    const settings = {
        infinite: true,
        fade: true,
        speed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        waitForAnimate: false,
        pauseOnHover: false,
        arrow: true,
        nextArrow: (
            <CustomNextArrow show={hovered} />
        ),
        prevArrow: (
            <CustomPrevArrow show={hovered} />
        ),
    };
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Slider {...settings}>
                <div className='outline-none border-none'>
                    <Link to='/'><img className="w-full h-[400px] cursor-pointer outline-none border-none" src={logo1} alt="Logo 1" /></Link>
                </div>
                <div className='outline-none border-none'>
                    <Link to='/allproducts'><img className="w-full h-[400px] cursor-pointer outline-none border-none" src={logo6} alt="Logo 6" /></Link>
                </div>
                <div className='outline-none border-none'>
                    <Link to='/today-deal'><img className="w-full h-[400px] cursor-pointer outline-none border-none" src={logo5} alt="Logo 5" /></Link>
                </div>
                <div className='outline-none border-none'>
                    <Link to='/accesories'><img className="w-full h-[400px] cursor-pointer outline-none border-none" src={logo2} alt="Logo 2" /></Link>
                </div>
                <div className='outline-none border-none'>
                    <Link to='/fashion'><img className="w-full h-[400px] cursor-pointer outline-none border-none" src={logo4} alt="Logo 4" /></Link>
                </div>
                <div className='outline-none border-none'>
                    <Link to='/'><img className="w-full h-[400px] cursor-pointer outline-none border-none" src={logo3} alt="Logo 3" /></Link>
                </div>
            </Slider>
        </div>
    );
};

export default HeroBanner;
