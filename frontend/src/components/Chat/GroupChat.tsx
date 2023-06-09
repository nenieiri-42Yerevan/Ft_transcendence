import Navigation from "../NavBar";
import Rooms from "./Rooms";
import ChatSpace from "./ChatSpace";
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, setAvatar } from "../Slices/userSlice";
import { io } from 'socket.io-client';
import axios, { HttpStatusCode } from "axios";
import { ChatContext, getGroupChats } from "../context/ChatContext";
const GroupChatComponent = ({chatSocket, chatInfo}) => {

    const userInfo = useSelector(selectUser);
    const { dispatch, data } = useContext(ChatContext);
    const [gchat, setGChat] = useState([]);
    const [allChat, setAllChat] = useState([]);
    const [curChat, setCurChat] = useState(null);

    useEffect(() => {
        setAllChat(data);
        console.log(data);
        if (chatSocket) {
            chatSocket.on('my-chats', (chats) => {
                console.log('New chats:', chats);
            });
            chatSocket.on('leave', (data) => {
                console.log("Someone leave chat :", data);
            });
            chatSocket.on('text', (data) => {
                console.log("Receive text:", data);
            });
            chatSocket.on('join', (data) => {
                console.log("Receive text:", data);
                console.log("gchat", gchat);
                console.log("allchat", allChat);
                setCurChat(gchat.find((chat) => chat.id == data.gchat.id));
            });
        }

        return () => {
        if (chatInfo && chatSocket) {
            chatSocket.off('info');
            chatSocket.off('my-chats');
            chatSocket.off('leave');
            chatSocket.off('text');
            chatSocket.off('join');
            }
        };
        }, [chatSocket, chatInfo, allChat, curChat]);

    return (
        <>
        <div className="h-screen flex flex-col min-h-screen max-h-screen bg-[#262525]">
        <Navigation />
        <div className="flex flex-row h-full">
        <div className="flex flex-col bg-[#262525] w-1/5  justify-center m-1 text-white text-2xl" >
           <Rooms allChat={allChat} user={userInfo.user} refresh={refreshChats} setCurChat={setCurChat} curChat={curChat}/>  
       </div>
        <div className="flex flex-row  w-4/5 bg-[#1E1E1E] border-[#393939] border-solid border m-1  rounded">
            {curChat?<ChatSpace curChat={curChat} setCurChat={setCurChat} refresh={refreshChats} groupSocket={chatSocket}/>:<div className='flex flex-row w-full justify-center items-center text-center text-white text-3xl font-bold'>Choose Room</div>}
        </div>
        </div>
       </div>
    </>
)
}

export default GroupChatComponent;
