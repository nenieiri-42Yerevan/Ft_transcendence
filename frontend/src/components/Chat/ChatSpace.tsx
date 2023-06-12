import React, { useState, useEffect, useContext } from 'react';
import UserList from "./UserList";
import MessageInput from './MessageInput';
import ChatWindow from './ChatWindow';
import AdminWindow from './AdminWindow';
import { GroupChatContext, getGroupChats } from "../context/ChatContext";
import { io } from "socket.io-client";

const ChatSpace = ({notify, groupSocket, gameSocket}) => {


    useEffect(() => {
    },[]);

    return ( 
    <>
        <div className='flex flex-col w-1/5   m-2 border border-[#393939]  rounded-md'>
            <div className='border-b h-16 rounded-md bg-gray-800  border-[#393939] flex items-center justify-center text-2xl text-white font-bold'>User List</div>
            <div className='h-full flex flex-col justify-start overflow-y-auto '><UserList notify={notify} gameSocket={gameSocket} chatSocket={groupSocket}/></div>
            <div className='flex flex-col h-fit w-full text-white text-center text-md font-bold'><AdminWindow /></div>
        </div>
        <div className='flex flex-col max-h-full w-4/5  m-2'>
            <div className='flex h-5/6 rounded-md border border-[#393939]'><ChatWindow groupSocket={groupSocket}/></div>
            <div className='flex '><MessageInput groupSocket={groupSocket}/></div>
        </div>
    </>
    );
}

export default ChatSpace;
