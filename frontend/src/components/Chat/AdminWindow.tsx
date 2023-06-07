import React, { useState, useEffect } from 'react';
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import axios, { HttpStatusCode } from "axios";

const AdminWindow = ({curChat, setCurChat, refresh}) => {
    const userInfo = useSelector(selectUser);

    useEffect((curChat) => {}, [curChat]);
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
            refresh();
            setCurChat(null);
        } catch (ex) {
            console.log("Can't delete chat:", ex);
        }
    };

    return (
        <button onClick={leaveRoom} className='text-xl font-bold bg-red-500 m-1 rounded-md'>Leave Room </button>
    );
};

export default AdminWindow;
