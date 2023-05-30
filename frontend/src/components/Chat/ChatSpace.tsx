import React, { useState, useEffect } from 'react';

const ChatSpace = (curChat) => {

    useEffect(() => {
    },[curChat]);

    return ( 
    <div className='md:h-4/5 flex flex-row h-80vh justify-start'>
    <div className='md:w-1/5 bg-gray50'>Users</div>
    <div className='md:w-4/5 bg-gray100'>Chat window</div>
        
    </div>
    );
}

export default ChatSpace;
