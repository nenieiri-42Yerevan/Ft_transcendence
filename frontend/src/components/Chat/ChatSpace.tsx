import React, { useState, useEffect } from 'react';
import UserList from "./UserList";
import MessageInput from './MessageInput';
const ChatSpace = ({curChat, groupSocket}) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (curChat) {
            setMessages(curChat.messages);
            setUsers(curChat.users);
            console.log(users);
        }
    },[users, curChat]);

    return ( 

    <div className='md:h-3/4 flex flex-row h-full justify-start'>
        <div className='md:w-1/5  md:h-5/6 m-1 border border-white flex flex-col rounded-md'>
            <div className='md:h-1/6 border-b rounded-md bg-gray-800  border-white flex items-center justify-center text-2xl font-bold'>User List</div>
            <div className='md:h-5/6 flex flex-col justify-start overflow-scroll '><UserList users={users} /></div>
        </div>
        <div className='md:w-4/5'>
            <div className='md:h-5/6  m-1 rounded-md border border-white'>chat</div>
            <div><MessageInput groupSocket={groupSocket} curChat={curChat} /></div>
        </div>
    </div>
    );
}

export default ChatSpace;
