//import Navigation from "../NavBar";
//import Modal from "./Modal";
//import React, { useState, useEffect } from 'react';
//import { io } from 'socket.io-client';
//const Chat = () => {
//
//    const [groupChatSocket, setGroupChatSocket] = useState(null);
//    const [modal, setModal] = useState(false);
//    const [password, setPassword] = useState('');
//    const [roomName, setRoomName] = useState('');
//    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
//    const [gchat, setGChat] = useState(null);
//    useEffect(() => {
//            const socketOptions = {
//            transportOptions: {
//                polling: {
//                    extraHeaders: {
//                        authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
//                        },
//                    },
//                }
//            };
//            const groupChatSocket = io(`${process.env.BACK_URL}/chat`, socketOptions);
//            setGroupChatSocket(groupChatSocket);
//
//        groupChatSocket.on('connect', () => {
//                console.log('Socket connection established!');
//                });
//        groupChatSocket.on('info', (data) => {
//                console.log('Info : ', data);
//                setGChat(data);
//        });
//        groupChatSocket.on('disconnect', (data) => {
//                console.log('Socket connection closed.', data);
//                });
//
//             return () => groupChatSocket.close();
//        }, [setGroupChatSocket, setGChat]);
//
//    const CreateGroupChat = () => {
//        if (!modal) {
//            setModal(true);
//        } else {
//            setModal(false);
//        }
//    }
//
//    return (
//        <>
//        <Navigation />
//        <div className=" bg-[#262525] py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-dark-blue min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl" >
//        <div className='w-full md:w-2/5 h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-4 rounded text-center'>
//           <p className="text-3xl font-bold"> ROOMS</ p>
//           <button
//                className="bg-gray-700 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded mt-4 mb-1"
//                onClick={() => CreateGroupChat()}
//            >
//                Create Room
//            </button>
//
//        </div>
//        <div className="w-full md:w-4/5 h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-8 rounded text-center">
//            CHAT
//        </div>
//        {modal && <Modal onClose={() => CreateGroupChat()}>
//        <h2 className="text-3xl font-bold mb-2">Create new room</h2>
//        <div className="flex flex-col mb-4">
//          <label htmlFor="roomName" className="text-lg mb-2 font-medium">
//            Room name:
//          </label>
//          <input
//            type="text"
//            id="roomName"
//            value={roomName}
//            onChange={(e) => setRoomName(e.target.value)}
//            className="border border-gray-500 p-2 rounded-lg text-black focus:outline-none"
//          />
//        </div>
//        <div className="flex flex-col mb-4">
//          <label htmlFor="password" className="text-lg mb-2 font-medium">
//            Password:
//          </label>
//          <div className="flex items-center">
//            <input
//              type={isPasswordEnabled ? 'text' : 'password'}
//              id="password"
//              value={password}
//              onChange={(e) => setPassword(e.target.value)}
//              disabled={!isPasswordEnabled}
//              className="border border-gray-500 p-2 rounded-lg text-black w-full focus:outline-none"
//            />
//            <label htmlFor="togglePassword" className="ml-4 cursor-pointer select-none">
//              <input
//                type="checkbox"
//                id="togglePassword"
//                checked={isPasswordEnabled}
//                onChange={() => setIsPasswordEnabled(!isPasswordEnabled)}
//                className="mr-2"
//              />
//              <span className="text-gray-300">use password</span>
//            </label>
//            </div>
//            </div>
//        </Modal>}
//        </div>
//    </>
//)

import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Users from "./Users";
import Messages from "./Messages";
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
import { io } from 'socket.io-client';
import { ChatContext, getChat, chatSocket } from "../context/ChatContext";

const Chat = () => {
  const userInfo = useSelector(selectUser);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { dispatch, data } = useContext(ChatContext);
  useEffect(()=>{
    console.log("chat");

    // chatSocket.on('join-chat', (data) =>{
    //   console.log("data ", data);
    // })
    // chatSocket.on('my-chats', (data) =>{
    //   console.log("mychat ", data);
    // })
    console.log("data.chatL:", data);
  }, [chatSocket])
  return (
    <div className="container bg-[#262525]">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-[#393939] lg:col-span-1">
          <Header/>
          <Users/>
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">
            <Messages/>
            <div className="flex items-center justify-between w-full p-3 border-t border-[#393939]">
              <input type="text" placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" required />
              <button type="submit">
                <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Chat;

