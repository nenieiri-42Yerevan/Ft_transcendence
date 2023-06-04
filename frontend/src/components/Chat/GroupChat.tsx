import Navigation from "../NavBar";
import Rooms from "./Rooms";
import ChatSpace from "./ChatSpace";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
import { io } from 'socket.io-client';
import axios, { HttpStatusCode } from "axios";
const GroupChatComponent = ({chatSocket, chatInfo}) => {

    const userInfo = useSelector(selectUser);
    const [gchat, setGChat] = useState([]);
    const [allChat, setAllChat] = useState([]);
    const [curChat, setCurChat] = useState(null);

    const refreshChats = async () => {
        try {
            const chats = await axios.get(
            `${process.env.BACK_URL}/transcendence/chat/group/`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                },
            }
            );
            console.log(chats);
        } catch (ex) {
            console.log(ex);
        }
    }
    useEffect(() => {
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
            refreshChats();
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
        }, [chatSocket, chatInfo]);

    return (
        <>
        <div className="h-screen flex flex-col min-h-screen max-h-screen bg-[#262525]">
        <Navigation />
        <div className="flex flex-row h-full">
        <div className="flex flex-col bg-[#262525] w-1/5  justify-center m-1 text-white text-2xl" >
           <Rooms gsocket={chatSocket} gchat={gchat} allChat={allChat} setGChat={setAllChat} user={userInfo.user} setCurChat={setCurChat} />  
       </div>
        <div className="flex flex-row  w-4/5 bg-[#1E1E1E] border-[#393939] border-solid border m-1  rounded">
            <ChatSpace curChat={curChat} groupSocket={chatSocket}/>
        </div>
        </div>
       </div>
    </>
)
}

export default GroupChatComponent;
