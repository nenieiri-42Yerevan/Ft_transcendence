import Navigation from "../NavBar";
import Rooms from "./Rooms";
import ChatSpace from "./ChatSpace";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
import { io } from 'socket.io-client';
const GroupChatComponent = ({chatSocket, chatInfo}) => {

    const userInfo = useSelector(selectUser);
    const [gchat, setGChat] = useState([]);
    const [allChat, setAllChat] = useState([]);
    const [curChat, setCurChat] = useState(null);
    useEffect(() => {
        console.log(chatInfo);
        setGChat(chatInfo.userGroups);
        setAllChat(chatInfo.groups);
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

        return () => {
            chatSocket.off('info');
            chatSocket.off('my-chats');
            chatSocket.off('leave');
            chatSocket.off('text');
            chatSocket.off('join');
        };
        }, [chatSocket, chatInfo]);

    return (
        <>
        <Navigation />
        <div className=" bg-[#262525] py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-dark-blue min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl" >
           <Rooms gsocket={chatSocket} gchat={gchat} allChat={allChat} setGChat={setAllChat} user={userInfo.user} setCurChat={setCurChat} />  
        <div className="w-full md:w-4/5 h-screen bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-2 rounded text-center">
            <ChatSpace curChat={curChat} groupSocket={chatSocket}/>
        </div>
       </div>
       
    </>
)
}

export default GroupChatComponent;
