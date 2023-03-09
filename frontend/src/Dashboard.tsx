import React from 'react';
import Background from "./background";
import { Link } from "react-router-dom";
import Navigation from "./components/NavBar";
import search_img from "./assets/images/search.png";

const Dashboard = () => {
    return (
        <>
            <Navigation activeTab={'Dashboard'} />
            <div className="  py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl">
                <div className='flex w-1/6'> 
                    <form className='flex items-start'>
                        <input className="w-3/4 mr-2 rounded text-black"type="text" />
                        <button type="submit"><img className="h-7 w-7" src={search_img} /></button>
                    </form>
                </div>
                <div className='flex w-2/6'>
                    <div>Game History</div>
                </div>
                <div className="flex w-2/6">Ere</div>
                <div className="flex w-1/6">van</div>
            </div>
        </>
    );
}



export default Dashboard;