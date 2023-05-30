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
                setGChat(data.groups.concat(data.userChats));
                console.log("info:", gchat, data);
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

             return () => groupChatSocket.close();
        }, [setGroupChatSocket, setGChat]);

    return (
        <>
        <Navigation />
        <div className=" bg-[#262525] py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-dark-blue min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl" >
           <Rooms gchat={gchat} setGChat={setGChat} user={userInfo.user} setCurChat={setCurChat} />  
        <div className="w-full md:w-4/5 h-40vh bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-2 rounded text-center">
            <ChatSpace curChat={curChat} />
        </div>
       </div>
       
    </>
)
}

export default GroupChatComponent;
