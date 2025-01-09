import React from 'react'
import HeroBanner from '../Components/HeroBanner'
import TodayDeal from '../Components/TodayDeal'
import ShortBanners from '../Components/ShortBanners'
import Recommended from '../Components/Recommended'
import RecentlyAdded from '../Components/RecentlyAdded'
import PhoneDeal from '../Components/PhoneDeal'
import OfficialStore from '../Components/OfficialStore'
import AboutShop from '../Components/AboutShop'
import NewsLetter from '../Components/NewsLetter'


const Home = () => {
    return (
        <>
            <div className='xl:mx-[80px] lg:mx-[60px] ma:mx-[40px] mx-[20px] flex flex-col gap-4'>
                <HeroBanner />
                <ShortBanners />
                <TodayDeal />
                <Recommended />
                <RecentlyAdded />
                <PhoneDeal />
                <OfficialStore />
                <AboutShop />
            </div>
            <div>
                <NewsLetter />
            </div>
        </>
    )
}

export default Home