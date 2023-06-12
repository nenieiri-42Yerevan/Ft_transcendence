import React, { useState, useRef, useEffect, useContext } from 'react';
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import { GroupChatContext, getGroupChats } from '../context/ChatContext';

const ChatWindow = ({groupSocket}) => {
    const messagesContainer = useRef(null);
    const userInfo = useSelector(selectUser);
    const {curChat, setCurChat, allChat, setAllChats} = useContext(GroupChatContext);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const container = messagesContainer.current;
    container.scrollTop = container.scrollHeight;
        groupSocket.on('text', (data) => {
                    setMessages(messages => [...messages, {id:data.id, content:data.value, author:data.user}]);});
        if (messages.length == 0)
            setMessages(curChat.messages);
        return () => { groupSocket.off('text')}
    },[messages, curChat]);
   return (
    <div className="flex flex-col overflow-y-auto w-full h-full" ref={messagesContainer}>
      {messages.map((msg, index) => {
        return (
          <div key={index} className={`flex flex-row ${userInfo.user.id == msg.author.id?"justify-end":"justify-start"} ` }>
            <div className="bg-gray-500  rounded-md p-2 m-2"><p className="text-xs text-gray-100">{msg.author.username}</p><p>{msg.content}</p></div>
          </div>
        )
      })}
    </div>
  );
   };

export default ChatWindow; 
