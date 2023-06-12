import React from "react";
import avatar from "@SRC_DIR/assets/images/avatar.png";
import { block, follow, selectUser } from "../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pong from "@SRC_DIR/assets/images/pong.png";
import { io } from 'socket.io-client';
import { useState, useEffect, useContext } from 'react';
import { ChatContext, getChat } from "../context/ChatContext";
import { GameContext } from "../context/GameSocket";


const UserHeader = (props)=>{
    const {chatSocket, gameSocket, notify} = props;
    const userInfo = useSelector(selectUser);
    const disp = useDispatch();
    const navigate = useNavigate();
    const { dispatch } = useContext(ChatContext);
    const { setPlayerId, setInvite } = useContext(GameContext);
    const { data} = useContext(ChatContext);
    const [chatId, setChatId] = useState(null);

    useEffect(()=>{
          chatSocket?.on('join-chat', (data) =>{
            navigate(`/transcendence/user/chat/${props.id}`);
        });

        gameSocket?.on('room', (data) => {
            console.log('Invite to room : ', data);
            setPlayerId(0);
            setInvite(true);
            notify.emit('message', { id: props.id, message: data, opponent: userInfo.user}); 
        });
        return () => {
            chatSocket?.off('join-chat');
            gameSocket?.off('room');
          };
    }, [chatSocket, gameSocket, userInfo])
    const message = ()=>{
        try
        {
            chatSocket.emit('join-chat', Number(props.id));
        }
        catch(error)
        {
            console.log("zz", error);
        }
    }

    const sendInvite = () => {
        gameSocket.emit("join-room");
    }
    return (
    <div className="w-full md:w-1/4 mx-4 m-1 rounded">
        <div className="bg-[#1E1E1E] border-[#393939] border-solid border w-full flex flex-col p-5 items-center">
            <img src={props.loaded ? (props.photo ? props.photo : avatar) : null} className="rounded-full w-32 h-32 object-cover" />
            <div className="h-fit mt-1">
                <h1 className="font-bold text-4xl text-white">{props.userInfo && props.userInfo.first_name && props.userInfo.first_name} <span>{props.userInfo && props.userInfo.last_name && props.userInfo.last_name}</span></h1>
                <p className="text-white">{props.userInfo && props.userInfo.username && props.userInfo.username} {props?.userInfo?.status != 0 && <span >&#127760;</span>}</p>
                <p><button onClick={sendInvite} className="bg-[#1e81b0] p-1 m-2 w-40">Game Invite</button></p>
                <p><button onClick = {()=>follow(disp, navigate, props.current.user, props.id)} className="bg-[#1e81b0] p-1 m-2 w-40">{props?.current?.user?.follows.includes(Number(props.id)) ? "Unfollow" : "follow"}</button></p>
                <p><button onClick = {()=>block(disp, navigate, props.current.user, props.id)} className="bg-red-600 p-1 m-2 w-40">{props?.current?.user?.blocked.includes(Number(props.id)) ? "Unblock" : "Block"}</button></p>
                <p><button onClick = {message} className="bg-[#1e81b0] p-1 m-2 w-40">Message</button></p>
            </div>
        </div>
        <div className="w-full bg-[#1E1E1E] border-[#393939] border-solid border p-8 mt-2 rounded">
            <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Game Stats</h2>
            <hr />
            <p className="text-white flex justify-between p-2">Rank: <span>{props.userInfo && props.userInfo.rank && props.userInfo.rank}</span></p>
        </div>
    </div>
    );

}

export default UserHeader;
