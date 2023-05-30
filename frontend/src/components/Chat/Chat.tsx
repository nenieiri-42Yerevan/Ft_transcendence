import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Users from "./Users";
import Messages from "./Messages";
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
import { ChatContext } from "../context/ChatContext";
import { useParams } from "react-router-dom";
import { chatSocket } from "../Profile/UserHeader";
import Navigation from "../NavBar";

const Chat = () => {
  const userInfo = useSelector(selectUser);
  const { id } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { dispatch, data } = useContext(ChatContext);
  useEffect(() => {
    chatSocket.on('info', (info) => {
      info.userChats.map(elem => {
        chatSocket.emit('chat', elem.id);
      })
      dispatch({ type: "CHANGE_INFO", payload: info });
    })
    chatSocket.on('chat', (chat) => {
      dispatch({ type: "CHANGE_CHAT", payload: chat });
      if (chat.users[1].id == userInfo?.user?.id ? chat.users[0].id == id : chat.users[1].id == id)
        setMessageList(chat.messages);
    })
    chatSocket.on('textDM', info=>{
      chatSocket.emit('chat', info.channelId);
    })
    return () => {
      chatSocket.off('info');
      chatSocket.off('chat');
      chatSocket.off('textDM');
    };
  }, [chatSocket, messageList, id])

  const sendmsg = () => {
    const curChat = data.chat.find(chat => chat.users[1].id == userInfo?.user?.id ? chat.users[0].id == id : chat.users[1].id == id)
    const datas = {
      channelId: curChat.id,
      text: currentMessage,
    }
    chatSocket.emit('textDM', datas);
    setCurrentMessage('');
  }
  return (
    <>
    <Navigation />
    <div className="container bg-[#262525] min-w-full min-h-full">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-[#393939] lg:col-span-1">
          <Header />
          <Users data={data.chat} />
        </div>
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">
          <Messages messageList={messageList} curId={userInfo?.user?.id} />
            <div className="flex items-center justify-between w-full p-3 border-t border-[#393939]">
              <input type="text" placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }} required value={currentMessage} />
              <button type="submit" onClick={sendmsg}>
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
    </>
  )
}
export default Chat;

