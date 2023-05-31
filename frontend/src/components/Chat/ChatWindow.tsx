import React, { useState, useEffect } from 'react';
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';

const ChatWindow = ({messages}) => {
    const userInfo = useSelector(selectUser);
    useEffect(() => {
        console.log(messages);
    },[messages]);
   return (
    <div>
      {messages.map((msg) => {
        return (
          <div key={msg.id} className={`w-1/3 p-4 rounded-md bg-gray-500 ${msg.author.id === userInfo.user.id ? 'text-right' : 'text-left'}`}>
            {msg.content}
          </div>
        )
      })}
    </div>
  );
   };

export default ChatWindow; 
