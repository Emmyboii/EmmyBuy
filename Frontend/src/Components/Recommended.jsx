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
                opacity: hidden ? 0 : 1,
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

const CustomNextArrow = ({ onClick, show, hidden }) => {
    if (show === false) return null
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                zIndex: 1,
                opacity: hidden ? 0 : 1,
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

const Recommended = () => {
    const [recommend, setRecommend] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);

    const [hovered, setHovered] = useState(false);


    const sliderRef = useRef(null);

    useEffect(() => {
        const cachedData = localStorage.getItem('recommendedItems')
        const now = new Date().getTime();

        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);

            // Check if 24 hours have passed since the data was cached
            if (now - timestamp < 24 * 60 * 60 * 1000) {
                setRecommend(data); // Use the cached data if still valid
                return;
            }
        }

        fetch(`${process.env.REACT_APP_API_URL}/product/reommendedHome`)
            .then((res) => res.json())
            .then((data) => {
                setRecommend(data)
                localStorage.setItem(
                    'recommendedItems',
                    JSON.stringify({ data, timestamp: now }))
            })
    }, [])

    useEffect(() => {
        if (sliderRef.current && recommend.length > 0) {
            // Delay recalculation to ensure slider has rendered
            setTimeout(() => {
                const slides = sliderRef.current.innerSlider.props.children.length;
                setTotalSlides(slides);
            }, 100);
        }
    }, [recommend]);

    useEffect(() => {
        const handleResize = () => {
            if (sliderRef.current) {
                sliderRef.current.slickGoTo(0); // Ensure it resets to the first slide
            }
        };

        // Adding the resize event listener
        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const settings = {
        infinite: false,
        dots: false,
        speed: 1000,
        initialSlide: 0,
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
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 4.06,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3.7,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 910,
                settings: {
                    slidesToShow: 3.3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2.7,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 2.4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2.15,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1.7,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1.6,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1.45,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 350,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1
                }
            },
        ]
    };
    return (
        <div>
            <div className="flex items-center justify-between bg-black text-white md:px-10 px-3 py-4 md:text-[25px] text-[20px] font-semibold">
                <p className='text-[17px] sm:text-[19px]'>Recommended For You</p>
                <p className="flex gap-1 items-center cursor-pointer">
                    <span className='text-[13px]'>VIEW MORE</span>
                    <span>
                        <IoIosArrowForward className='mt-[2px] text-[15px]' />
                    </span>
                </p>
            </div>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Slider ref={sliderRef} {...settings}>
                    {recommend.map((item, i) => (
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

export default Recommended