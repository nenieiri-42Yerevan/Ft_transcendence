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

