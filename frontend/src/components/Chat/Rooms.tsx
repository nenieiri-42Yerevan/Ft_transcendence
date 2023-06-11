import React from 'react';
import Modal from "./Modal";
import axios, { HttpStatusCode } from "axios";
import { useState, useEffect, useContext } from 'react';
import Header from './Header';
import deleteImg from '../../assets/images/delete_button.png';
import adminImg from '../../assets/images/admin.png';
import lockImg from '../../assets/images/lock.png';
import { GroupChatContext, getGroupChats } from "../context/ChatContext";
import { toast } from 'react-toastify';

const Rooms = ({ user }) => {
    
    const [modal, setModal] = useState(false);
    const [join, setJoin] = useState(false);
    const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
    const [password, setPassword] = useState('');
    const [roomName, setRoomName] = useState('');
    const {curChat, setCurChat, allChat, setAllChats} = useContext(GroupChatContext);

    useEffect(() => {
        if(!allChat) {
            updateChats();
        }

    },[allChat]);

    const updateChats = () => {
        getGroupChats()
            .then(chats => {setAllChats(chats);
            if (curChat) {
                setCurChat(chats.find(chat => chat.id == curChat.id));
            }
        })
    }

    const DeleteChat = async (item) => {
        try {
        const groupDelete = await axios.delete(
            `${process.env.BACK_URL}/transcendence/chat/group/delete/${user.id}/${item.id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }
        );
        setCurChat(null);
        updateChats();
        } catch (ex) {
            toast.error(`Can't create chat: ${ex}`, { autoClose: 3000 });
        }
    };

    const CreateGroupChat = async (close : boolean) => {
        if (!modal) {
            setModal(true);
        } else {
            try {
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
            updateChats();
            }
            } catch (ex) {
                toast.error(`Can't create chat: ${ex}`, { autoClose: 3000 });
            } finally {
                setModal(false);
            }
        }
    }

    const JoinRoom = async (isSub) => {
        if (!join && !curChat.public) {
           setJoin(true); 
        } else if (!isSub) {
            try {
                const response = await axios.post(
                    `${process.env.BACK_URL}/transcendence/chat/group/add/${user.id}`,
                    {
                        id : curChat.id,
                        public : curChat.public,
                        password : password,
                    }, 
                    {    
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                      },
                    }
                );
                updateChats();
                toast.info(`You joined to ${curChat.name}!`, {
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    });
                } catch (ex) {
                    toast.error(ex.response.data.message, {
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    });
            } finally {
                setJoin(false);
            }
        } else {
            setJoin(false);
        }

    }
    

    return ( 
    <div className='flex flex-col w-full bg-[#1E1E1E] border-[#393939] border-solid border  rounded text-center'>
    <div className='flex flex-col h-full'>
    <Header />
    <div className='flex flex-col h-full overflow-y-scroll border border-[#393939] rounded m-1'>
    {allChat && (allChat.length == 0
      ? <p>no rooms.. </p>
      : allChat.map((item, index) =>  
        <div onClick={() => {setCurChat(item);}} className={`flex items-center text-sm border m-1 rounded-md  border-[#393939] hover:bg-[#616161] ${item == curChat && "bg-[#616161]"}`} key={index}>
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 truncate font-bold text-xl text-white">{item.name?item.name:item.users[0].username}</span>
            </div>
            <div className='flex justify-end'>
              {item.owner && item.owner.id==user.id && <img className='w-7 h-7' src={adminImg} alt='You are admin' />}
              {item.owner && !item.public && <img className='w-7 h-7' src={lockImg} alt='Private room' />}
              {item.owner && item.owner.id==user.id &&
              <button onClick={() => DeleteChat(item)}>
                  <img className='w-7 h-7 cursor-pointer' src={deleteImg} alt='Delete room' />
              </button>}
            </div>
          </div>
          </div>
        
      ))}
    </div>
    <button className="bg-gray-700 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded m-2" onClick={() => CreateGroupChat(true)}>
      Create Room
    </button>
    <button className={`${(curChat!=null && !curChat.users.some(u => u.id == user.id))?"bg-gray-700 hover:bg-gray-950":"bg-gray-200"}  text-white font-bold py-2 px-4 rounded m-2`} onClick={() => (curChat && !curChat.users.some((u) => u.id == user.id) && JoinRoom() )}>
      Join Room
    </button>
    <button className="bg-gray-700 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded m-2" onClick={() => {updateChats(); setCurChat(null);}}>
      Refresh
    </button>
      </div>
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
    {join && (
        <Modal onClose={(bool) => JoinRoom(bool)}>
        
         <div className="flex flex-col mb-4">
          <label htmlFor="pass" className="text-lg mb-2 font-medium">
            Password:
          </label>
          <input type="text" id="pass" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-500 p-2 rounded-lg text-black focus:outline-none" />
        </div> 
        

        </Modal>
    )}
  </div>
);    
}

export default Rooms;
