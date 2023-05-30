import React, {useContext, useEffect, useState} from 'react'
import Navigation from '../NavBar';
import Header from './Header';
import Users from './Users';
import { ChatContext } from '../context/ChatContext';
import { chatSocket } from "../Profile/UserHeader";


const DirectChats = () =>{
    const { data, dispatch } = useContext(ChatContext);

     useEffect(()=>{
        chatSocket.on('info', (info)=>{
            info.userChats.map(elem =>{
                chatSocket.emit('chat', elem.id);
            })
            dispatch({ type: "CHANGE_INFO", payload: info });
        })
        chatSocket.on('chat', (chat) =>{
            dispatch({ type: "CHANGE_CHAT", payload: chat });
          })
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
              <Users data={data.chat} />
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