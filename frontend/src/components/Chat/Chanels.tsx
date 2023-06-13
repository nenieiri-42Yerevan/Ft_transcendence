import React, { useState, useEffect, useContext } from 'react';
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import Navigation from "../NavBar";
import Rooms from "./Rooms";
import ChatSpace from "./ChatSpace";
import { GroupChatContext, getGroupChats } from "../context/ChatContext";
import { io } from "socket.io-client";

const Chanels = ({notify, chatSocket, gameSocket}) => {

    const userInfo = useSelector(selectUser);
    const [curChat, setCurChat] = useState(null);
    const [allChat, setAllChats] = useState(null);

    useEffect(() => {
        },[curChat]);
    return (
        <>
        <GroupChatContext.Provider value={{curChat, setCurChat, allChat, setAllChats}}>
        <div className="h-screen overflow-hidden min-h-screen max-h-screen bg-[#262525]">
        <Navigation />
        <section className="flex h-full ">
        <div className="flex w-1/5 max-h-full mb-11 m-1">
           <Rooms user={userInfo.user} />  
        </div>
        <div className="flex w-4/5 max-h-full mb-11 m-1 rounded-md bg-[#1E1E1E] border-[#393939]">
          {curChat && curChat.users.some(user => user.id == userInfo.user.id)? <ChatSpace notify={notify} groupSocket={chatSocket} gameSocket={gameSocket}/>: 
          <div className='flex flex-col h-full w-full justify-center text-center text-white text-3xl font-bold'>Choose Room</div>}
        </div>
        </section>

        </div>
        </ GroupChatContext.Provider>
        </>
    );
}

export default Chanels;
