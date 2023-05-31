import Navigation from "../NavBar";
import Rooms from "./Rooms";
import ChatSpace from "./ChatSpace";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
import { io } from 'socket.io-client';
const GroupChatComponent = () => {

    const userInfo = useSelector(selectUser);
    const [groupChatSocket, setGroupChatSocket] = useState(null);
    const [gchat, setGChat] = useState([]);
    const [allChat, setAllChat] = useState([]);
    const [curChat, setCurChat] = useState(null);
    useEffect(() => {
        const socketOptions = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                    },
                },
            }
        };
        const groupChatSocket = io(`${process.env.BACK_URL}/chat`, socketOptions);
        setGroupChatSocket(groupChatSocket);

        groupChatSocket.on('connect', () => {
            console.log('Socket connection established!');
        });
        groupChatSocket.on('info', (data) => {
            setGChat(data.userGroups);
            setAllChat(data.groups);
            console.log(data);
        });
        groupChatSocket.on('disconnect', (data) => {
            console.log('Socket connection closed.', data);
        });
        groupChatSocket.on('my-chats', (chats) => {
            console.log('New chats:', chats);
        });
        groupChatSocket.on('leave', (data) => {
            console.log("Someone leave chat :", data);
        });
        groupChatSocket.on('text', (data) => {
            console.log("Receive text:", data);
        });
        groupChatSocket.on('join', (data) => {
            console.log("Receive text:", data);
            console.log("gchat", gchat);
            console.log("allchat", allChat);
            setCurChat(gchat.find((chat) => chat.id == data.gchat.id));
        });
             return () => groupChatSocket.close();
        }, [setGChat, setAllChat, setCurChat]);

    return (
        <>
        <Navigation />
        <div className=" bg-[#262525] py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-dark-blue min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl" >
           <Rooms gsocket={groupChatSocket} gchat={gchat} allChat={allChat} setGChat={setAllChat} user={userInfo.user} setCurChat={setCurChat} />  
        <div className="w-full md:w-4/5 h-screen bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-2 rounded text-center">
            <ChatSpace curChat={curChat} groupSocket={groupChatSocket}/>
        </div>
       </div>
       
    </>
)
}

export default GroupChatComponent;
