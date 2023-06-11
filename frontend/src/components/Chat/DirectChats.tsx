import React, {useContext, useEffect, useState} from 'react'
import Navigation from '../NavBar';
import Header from './Header';
import Users from './Users';
import { ChatContext, getChat } from '../context/ChatContext';
import { useSelector } from 'react-redux';
import { selectUser } from '../Slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

const DirectChats = ({chatSocket, gameSocket, notify}) =>{
    const { data, dispatch } = useContext(ChatContext);
    const [chats, setChats] = useState([]);
    const userInfo = useSelector(selectUser);
    const navigate = useNavigate();
    const disp = useDispatch();

     useEffect(()=>{
      if (userInfo && !userInfo.user)
            navigate("/transcendence/user/signin");
      const getData = async()=>{
        const res = await getChat(userInfo?.user?.id, navigate, dispatch);
        setChats(res.data);
      }
      getData();
    }, [])

    return (
        <>
        <div className="container bg-[#262525] min-w-full min-h-full">
          <Navigation />
          <div className="min-w-full rounded lg:grid lg:grid-cols-3">
            <div className="border-r border-[#393939] lg:col-span-1">
              <Users data={chats && chats} gameSocket={gameSocket} notify={notify} />
            </div>
            <div className="hidden lg:col-span-2 lg:block">
              <div className="w-full">
              </div>
            </div>
          </div>
        </div>
        </>
      )
}

export default DirectChats;
