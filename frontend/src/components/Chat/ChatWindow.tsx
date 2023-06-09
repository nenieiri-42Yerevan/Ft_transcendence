import React, { useState, useEffect, useContext } from 'react';
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import { GroupChatContext } from '../context/ChatContext';

const ChatWindow = () => {
    const userInfo = useSelector(selectUser);
    const {curChat} = useContext(GroupChatContext);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (curChat)
            setMessages(curChat.messages);
        else
            setMessages([]);
    },[curChat]);
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
