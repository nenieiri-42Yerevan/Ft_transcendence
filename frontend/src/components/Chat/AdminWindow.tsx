import React, { useState, useEffect, useContext } from 'react';
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import axios, { HttpStatusCode } from "axios";
import { GroupChatContext, getGroupChats } from '../context/ChatContext';

const AdminWindow = () => {
    const userInfo = useSelector(selectUser);
    const { curChat, setCurChat, setAllChats } = useContext(GroupChatContext);

    useEffect(() => {}, []);
    const leaveRoom = async () => {
        try {
            const groupLeave = await axios.delete(
                `${process.env.BACK_URL}/transcendence/chat/group/delete/${userInfo.user.id}/${curChat.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                }
            );
            setCurChat(null);
            getGroupChats().then(chats => setAllChats(chats)).catch(err => setAllChats(null));;
        } catch (ex) {
            console.log("Can't delete chat:", ex);
        }
    };

    return (
        <button onClick={leaveRoom} className='text-xl font-bold bg-red-500 m-1 rounded-md'>Leave Room </button>
    );
};

export default AdminWindow;
