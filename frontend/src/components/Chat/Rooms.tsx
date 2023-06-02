import React from 'react';
import Modal from "./Modal";
import axios, { HttpStatusCode } from "axios";
import { useState, useEffect } from 'react';
import Header from './Header';
import deleteImg from '../../assets/images/delete_button.png';
import adminImg from '../../assets/images/admin.png';
import lockImg from '../../assets/images/lock.png';
const Rooms = ({gsocket, gchat, allChat, setGChat, user, setCurChat}) => {
    
    const [modal, setModal] = useState(false);
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
    const [password, setPassword] = useState('');
    const [roomName, setRoomName] = useState('');


    const LeaveChat = async (item) => {
    const groupDelete = await axios.delete(
            `${process.env.BACK_URL}/transcendence/chat/group/delete/${user.id}/${item.id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }
        );
    if (groupDelete.status === HttpStatusCode.Ok) {
        const updatedGchat = gchat.filter((chat) => chat.id !== item.id);
        setGChat(updatedGchat);
    }
    };

    const CreateGroupChat = async (close : boolean) => {
        if (!modal) {
            setModal(true);
        } else {
            if (!close) {
            const chatInfo = await axios.post(
                `${process.env.BACK_URL}/transcendence/chat/group/create/${user.id}`,
                {
                    name : roomName,
                    password : isPasswordEnabled?password:"",
                    public: !isPasswordEnabled,
                }, 
                {    
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  },
                }
            );

                gchat.push(chatInfo.data);
                setGChat(gchat);
            }
            setModal(false);
        }
    }
    const JoinChat = (item) => {
        const ch = allChat.find((chat) => chat.id == item.id);
        if (ch == null) {
           gsocket.emit('join', item); 
        } else {
            setCurChat(item);
        }
    }
    return ( 

    <div className='flex flex-col w-full md:w-2/5 h-fit max-h-screen overflow-scroll   bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-4 rounded text-center'>
    <Header />
    {allChat.length == 0
      ? <p>no rooms.. </p>
      : allChat.map((item, index) =>  
        <div onClick={() => {JoinChat(item)}} className='flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border mb-1 border-[#393939] cursor-pointer hover:bg-[#616161] focus:outline-none' key={index}>
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 truncate font-bold text-xl text-white">{item.name?item.name:item.users[0].username}</span>
              {item.owner && <span>Room</span>}
            </div>
            <div className='flex justify-end'>
              {item.owner && item.owner.id==user.id && <img className='w-7 h-7' src={adminImg} alt='You are admin' />}
              {item.owner && !item.public && <img className='w-7 h-7' src={lockImg} alt='Private room' />}
              {item.owner &&
              <button onClick={() => LeaveChat(item)}>
                  <img className='w-7 h-7 cursor-pointer' src={deleteImg} alt='Delete room' />
              </button>}
            </div>
          </div>
        </div>
        
      )}
    <button className="bg-gray-700 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded mt-4 mb-1" onClick={() => CreateGroupChat(true)}>
      Create Room
    </button>
    {modal && (
      <Modal onClose={(bool) => CreateGroupChat(bool)}>
        <h2 className="text-3xl font-bold mb-2">Create new room</h2>
        <div className="flex flex-col mb-4">
          <label htmlFor="roomName" className="text-lg mb-2 font-medium">
            Room name:
          </label>
          <input type="text" id="roomName" value={roomName} onChange={(e) => setRoomName(e.target.value)} className="border border-gray-500 p-2 rounded-lg text-black focus:outline-none" />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="text-lg mb-2 font-medium">
            Password:
          </label>
          <div className="flex items-center">
            <input type={isPasswordEnabled ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isPasswordEnabled} className="border border-gray-500 p-2 rounded-lg text-black w-full focus:outline-none" />
            <label htmlFor="togglePassword" className="ml-4 cursor-pointer select-none">
              <input type="checkbox" id="togglePassword" checked={isPasswordEnabled} onChange={() => setIsPasswordEnabled(!isPasswordEnabled)} className="mr-2" />
              <span className="text-gray-300">use password</span>
            </label>
          </div>
        </div>
      </Modal>
    )}
  </div>
);    
}

export default Rooms;
