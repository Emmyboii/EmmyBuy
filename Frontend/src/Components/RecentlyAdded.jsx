import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    IoIosArrowForward,
    IoIosArrowBack,
} from "react-icons/io";
import HomeItems from './HomeItems';

const CustomPrevArrow = ({ onClick, show, hidden }) => {
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
                opacity: hidden ? 0 : 1,
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

const CustomNextArrow = ({ onClick, show, hidden }) => {
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
                opacity: hidden ? 0 : 1,
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

const RecentlyAdded = () => {
    const [recentlyAdded, setRecentlyAdded] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);

    const [hovered, setHovered] = useState(false);


    const sliderRef = useRef(null);

    useEffect(() => {
        fetch('https://emmybuy.vercel.app/product/recentlyAddedHome')
            .then((res) => res.json())
            .then((data) => {
                setRecentlyAdded(data)
            })
    }, [])

    useEffect(() => {
        if (sliderRef.current) {
            const slides = sliderRef.current.innerSlider.props.children.length;
            setTotalSlides(slides);
        }
    }, [recentlyAdded]);

    const settings = {
        infinite: false,
        dots: false,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: true,
        afterChange: (index) => setCurrentSlide(index),
        nextArrow: (
            <CustomNextArrow show={hovered} hidden={currentSlide >= totalSlides - 5} />
        ),
        prevArrow: (
            <CustomPrevArrow show={hovered} hidden={currentSlide === 0} />
        ),
    };

    return (
        <div>
            <div className="flex items-center justify-between bg-black text-white px-10 py-4 text-[25px] font-semibold">
                <p>Recently Added</p>
                <p className="flex gap-1 items-center">
                    <span>View more</span>
                    <span>
                        <IoIosArrowForward className='mt-1' />
                    </span>
                </p>
            </div>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Slider ref={sliderRef} {...settings}>
                    {recentlyAdded.map((item, i) => (
                        <HomeItems
                            key={i}
                            id={item.id}
                            Image={item.Image}
                            Name={item.Name}
                            Old_price={item.Old_price}
                            New_price={item.New_price}
                            Items_left={item.Items_left}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default RecentlyAdded