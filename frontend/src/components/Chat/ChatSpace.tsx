import React, { useState, useEffect } from 'react';
import UserList from "./UserList";
import MessageInput from './MessageInput';
import ChatWindow from './ChatWindow';
import AdminWindow from './AdminWindow';

const ChatSpace = ({curChat, setCurChat, groupSocket, refresh}) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (curChat) {
            setMessages(curChat.messages);
            setUsers(curChat.users);
            console.log(curChat);
            console.log("users", users);
            console.log("messages", messages);
        }
    },[users, messages, curChat]);

    return ( 
    <>
        <div className='flex flex-col w-1/5  m-2 border border-[#393939]  rounded-md'>
            <div className='border-b h-16 rounded-md bg-gray-800  border-[#393939] flex items-center justify-center text-2xl text-white font-bold'>User List</div>
            <div className='h-full flex flex-col justify-start overflow-y-auto '><UserList users={users} /></div>
            <div className='flex flex-col h-fit w-full text-white text-center text-md font-bold'><AdminWindow curChat={curChat} setCurChat={setCurChat} refresh={refresh} /></div>
        </div>
        <div className='flex flex-col w-4/5  m-2'>
            <div className='h-full rounded-md border border-[#393939]'><ChatWindow messages={messages} /></div>
            <div><MessageInput groupSocket={groupSocket} curChat={curChat} /></div>
        </div>
    </>
    );
}

export default ChatSpace;
