import React from 'react';
import Engine from './Engine';
// import Chat;
const Pong = () => {
    return ( 
    <>
        <Engine />
        <div className="w-full md:w-1/5 bg-gray-900 h-screen text-white">
            Chat
        </div>
    </>
    )
};

export default Pong;
