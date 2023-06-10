import React, { useState, useEffect, useContext } from 'react';
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import Navigation from "../NavBar";
import Rooms from "./Rooms";
import ChatSpace from "./ChatSpace";
import { GroupChatContext, getGroupChats } from "../context/ChatContext";

const Chanels = ({chatSocket}) => {

    const userInfo = useSelector(selectUser);
    const [curChat, setCurChat] = useState(null);
    const [allChat, setAllChats] = useState(null);



    useEffect(() => {
        },[]);
    return (
        <>
        <div className="h-screen flex flex-col min-h-screen max-h-screen bg-[#262525]">
        <Navigation />
        <div className="flex flex-row h-full">
        <GroupChatContext.Provider value={{curChat, setCurChat, allChat, setAllChats}}>
        <div className="flex flex-col bg-[#1E1E1E] w-1/5 border border-solid border-[#393939] justify-center m-2 text-white text-2xl" >
           <Rooms user={userInfo.user} />  
        </div>
        <div className="flex flex-row  w-4/5 bg-[#1E1E1E] border-[#393939] border-solid border m-2  rounded">
          {curChat && curChat.users.some(user => user.id == userInfo.user.id)? <ChatSpace groupSocket={chatSocket}/> : 
          <div className='flex flex-row w-full justify-center items-center text-center text-white text-3xl font-bold'>Choose Room</div>}
        </div>
        </ GroupChatContext.Provider>
        </div>

        </div>
        </>
    );
}

export default Chanels;
