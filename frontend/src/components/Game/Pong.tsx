import React from 'react';
import Engine from './Engine';
// import Chat;
const Pong = () => {
    return ( 
    <>
        <div className='w-full md:w-4/5 h-screen bg-black'>
        <Engine isPreview={false} />
        </div>
        <div className="w-full md:w-1/5 bg-gray-900 h-screen text-white">
            Chat
        </div>
    </>
    )
};

export default Pong;
