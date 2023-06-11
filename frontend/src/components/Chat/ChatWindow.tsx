import React, { useState, useEffect, useContext } from 'react';
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import { GroupChatContext, getGroupChats } from '../context/ChatContext';

const ChatWindow = () => {
    const userInfo = useSelector(selectUser);
    const {curChat, setCurChat, allChat, setAllChats, chatSocket} = useContext(GroupChatContext);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        chatSocket.on('text', (data) => {
                getGroupChats()
                    .then(chats => {setAllChats(chats);
                    if (curChat) {
                        setCurChat(chats.find(chat => chat.id == curChat.id));
                        setMessages(chats.find(chat => chat.id == curChat.id).messages);
                    }
                })
            });
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
