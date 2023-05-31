import React, {useContext, useEffect, useState} from 'react'
import Navigation from '../NavBar';
import Header from './Header';
import Users from './Users';
import { ChatContext } from '../context/ChatContext';


const DirectChats = ({chatSocket}) =>{
    const { data, dispatch } = useContext(ChatContext);
    const [chats, setChats] = useState([]);

     useEffect(()=>{
      if (chatSocket)
      {
        chatSocket.on('info', (info)=>{
          console.log(info);
            info.userChats.map(elem =>{
                chatSocket.emit('chat', elem.id);
            })
            dispatch({ type: "CHANGE_INFO", payload: info });
            console.log("inf:", data);
        })
        chatSocket.on('chat', (chat) =>{
          const chatId = chat.id;
          const existingChat = chats.find(chat => chat.id === chatId);
          if (!existingChat)
            setChats(list =>[...list, chat]);
          dispatch({ type: "CHANGE_CHAT", payload: chat });
          })
        }
        return () => {
            chatSocket.off('join-chat');
            chatSocket.off('chat');
          };
    }, [chatSocket])

    return (
        <>
        <Navigation />
        <div className="container bg-[#262525] min-w-full min-h-full">
          <div className="min-w-full rounded lg:grid lg:grid-cols-3">
            <div className="border-r border-[#393939] lg:col-span-1">
              <Users data={chats && chats} />
            </div>
            <div className="hidden lg:col-span-2 lg:block">
              <div className="w-full">
              </div>
            </div>
          </div>
        </div>
        </>
      )
}

export default DirectChats;