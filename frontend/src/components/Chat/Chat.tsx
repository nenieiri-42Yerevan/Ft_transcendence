import Navigation from "../NavBar";
import React, { useState } from 'react';

const Chat = () => {
    return (
        <>
        <Navigation />
        <div className=" bg-[#262525] py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-dark-blue min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl" >
        <div className='w-full md:w-1/5 h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-8 rounded'>
            ROOMS
        </div>
        <div className="w-full md:w-4/5 h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-8 rounded">
            CHAT
        </div>
        </div>
    </>
)
}
export default Chat;

