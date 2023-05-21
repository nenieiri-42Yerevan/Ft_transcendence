import React from 'react';
import Multiplayer from './Multiplayer';
// import Chat;
const Pong = () => {
    return ( 
    <>
        <div className='w-full md:w-4/5 h-screen bg-black'>
        <Multiplayer />
        </div>
        <div className="w-full md:w-1/5 bg-gray-900 h-screen text-white">
            Chat
        </div>
    </>
    )
};

export default Pong;
