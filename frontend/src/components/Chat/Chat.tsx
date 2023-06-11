import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import Users from "./Users";
import Messages from "./Messages";
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
import { ChatContext, getChat } from "../context/ChatContext";
import { useParams } from "react-router-dom";
import Navigation from "../NavBar";
import { useNavigate } from 'react-router-dom';
import Notfound from "../Notfound";
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

const Chat = ({ chatSocket, gameSocket, notify }) => {
  const userInfo = useSelector(selectUser);
  const { id } = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { dispatch, data } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const[found, setFound] = useState(true);
  const navigate = useNavigate();
  const disp = useDispatch();
  useEffect(() => {
    if (userInfo && !userInfo.user)
            navigate("/transcendence/user/signin");
    let exists:boolean = false;
    const getData = async()=>{
      const res = await getChat(userInfo.user.id, navigate, disp);
      res.data.map(chat=>{
        if (chat.users[1].id == userInfo?.user?.id ? chat.users[0].id == id : chat.users[1].id == id)
        {
          exists = true;
          setMessageList(chat.messages);
        }
      })
      if (!exists)
        setFound(exists);
      setChats(res.data);
    }
    getData();
    chatSocket?.on('chat', (chat) => {
      if (chat.users[1].id == userInfo?.user?.id ? chat.users[0].id == id : chat.users[1].id == id)
        setMessageList(chat.messages);
    })
    chatSocket?.on('textDM', info => {
      chatSocket?.emit('chat', info.channelId);
    })
    return () => {
      chatSocket?.off('chat');
      chatSocket?.off('textDM');
    };
  }, [chatSocket, id])

  const sendmsg = () => {
    const curChat = chats.find(chat => chat.users[1].id == userInfo?.user?.id ? chat.users[0].id == id : chat.users[1].id == id)
    const datas = {
      channelId: curChat.id,
      text: currentMessage,
    }
    chatSocket.emit('textDM', datas);
    setCurrentMessage('');
  }
  if (!found)
    return (<Notfound/>);
  return (
    <>
      <div className="container bg-[#262525] min-w-full min-h-full">
      <Navigation />
        <div className="min-w-full rounded lg:grid lg:grid-cols-3">
          <div className="border-r border-[#393939] lg:col-span-1">
            <Users gameSocket={gameSocket} notify={notify} data={chats && chats} />
          </div>
          <div className="lg:col-span-2 lg:block">
            <div className="w-full">
              <Messages messageList={messageList} curId={userInfo?.user?.id} />
              <div className="flex items-center justify-between w-full p-3 border-t border-[#393939]">
                <input type="text" placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message" onChange={(event) => {
                    setCurrentMessage(event.target.value);
                  }}  onKeyPress={(event) => {
                    event.key === "Enter" && currentMessage.length !==0 && sendmsg();
                  }} required value={currentMessage} />
                <button type="submit" onClick={()=>{currentMessage.length !==0 && sendmsg()}}>
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

