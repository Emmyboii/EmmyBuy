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
            <div className='mx-[80px] flex flex-col gap-4'>
                <HeroBanner />
                <TodayDeal />
                <ShortBanners />
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