import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GroupChatContext} from "../context/ChatContext";
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
import { block, follow } from "../Slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
import { GameContext } from '../context/GameSocket';
import axios, { HttpStatusCode } from "axios";
import { toast } from 'react-toastify';
const UserList = ({notify, gameSocket, chatSocket}) => {
    const {curChat, setCurChat} = useContext(GroupChatContext);
    const {setInvite, setPlayerId} = useContext(GameContext);
    const userInfo = useSelector(selectUser);
    const [users, setUsers] = useState(null);
    const disp = useDispatch();
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(null);
    const [selectedUser, setSelectedUser] = useState(false);
    const [points, setPoints] = useState({
                                            x: 0,
                                            y: 0,
                                          });
    const Status = {
        0: "green-700",
        1: "red-700",
    };

    useEffect(() => {
        if (curChat && curChat.users.some(user => user.id == userInfo.user.id))
            setUsers(curChat.users);
        else 
            setUsers([]);
        const handleClick = () => setClicked(false);
        
        gameSocket.on('room', (data) => {
            console.log('Invite to room : ', data);
            setPlayerId(0);
            notify.emit('message', { id: selectedUser.id, message: data, opponent: userInfo.user}); 
        });

        chatSocket.on('group-chat', (gchat) => {
            setCurChat(gchat);
            });
        chatSocket.on('ban', (gchat) => {
            if (curChat.id == gchat.channel.id) {
                curChat.banned.push(gchat.banned_user.id);
                curChat.users = curChat.users.filter(user => user.id != gchat.banned_user.id);
            }
            setCurChat(curChat);
            setUsers(curChat.users);
            });
        chatSocket.on('mute', (gchat) => {
            if (curChat.id == gchat.channel.id) {
                if (curChat.muted.some(id => id == gchat.muted_user.id))
                    curChat.muted = curChat.muted.filter((id) => id != gchat.muted_user.id);
                else
                    curChat.muted.push(gchat.muted_user.id);
            }
            setCurChat(curChat);
            });
        window.addEventListener("click", handleClick);
        
        chatSocket.on('admin', (data) => {
            curChat.admins.push(data.admin_user.id);
            setCurChat(curChat);
            });
    
    return () => {
        window.removeEventListener("click", handleClick);
        gameSocket.off('room');
     chatSocket.off('group-chat');
        };
        }, [notify, curChat, userInfo, gameSocket, selectedUser]);

    const followUser = () => {
        follow(disp, navigate, userInfo.user, selectedUser.id);
    }

    const sendInvite = () => {
        gameSocket.emit("join-room");
    }

    const addAdmin = () => {
        chatSocket.emit('admin', {gid:curChat.id, userId:selectedUser.id});
    }

    const kickUser = async () => {
        try {
        const groupDelete = await axios.delete(
            `${process.env.BACK_URL}/transcendence/chat/group/delete/${selectedUser.id}/${curChat.id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            }
        );
        chatSocket.emit('group-chat', curChat.id);
        } catch (ex) {
            toast.error(`Can't create chat: ${ex}`, { autoClose: 3000 });
        }
    
    }

    const ban = () => {
        chatSocket.emit('ban', {channelId:curChat.id, userId:selectedUser.id});
    }

    const mute = () => {
        chatSocket.emit('mute', {channelId:curChat.id, userId:selectedUser.id}); 
    }

    return ( 
     <div>
          {users && users.map((user, index) => {
              if (user.id === userInfo.user.id) {
                 return null; // Skip rendering this user
                }
           return (     
           <div key={index} onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            setSelectedUser(user);
          }}>
          <div key={index} className='bg-gray-700 m-1 text-center text-white text-xl rounded-md hover:bg-gray-500'> 
          <Link className='flex flex-row items-center justify-between m-2' to={`/transcendence/user/profile/${user.id}`} key={user.id}>
          <p className="truncate">{user.username}</p>
          <p className="text-xs truncate">{curChat.admins.some(id => id == user.id) && "adm"}</p>
          </Link> 
          </div>
          </div>)})}
          {clicked && (
        <div className="absolute flex flex-col w-400 text-white text-xl bg-gray-800 rounded-lg box-border p-2"
              style={{ top: `${points.y}px`, left: `${points.x}px` }}>
            { curChat.admins?.some(id => id == userInfo.user.id) &&
            (<>
            <button onClick={mute} className='rounded-md p-2 hover:bg-gray-500'>{`${curChat.muted.some(id => selectedUser.id == id)?"UnMute":"Mute"}`}</button>
            <button onClick={ban} className='rounded-md p-2 hover:bg-gray-500'>Ban</button>
            <button onClick={kickUser} className='rounded-md p-2 hover:bg-gray-500'>Kick</button>
            </>)
            }
            { curChat.owner.id == userInfo.user.id &&
            <button onClick={addAdmin} className='rounded-md p-2 hover:bg-gray-500'>Give admin rights</button>
            }
            <button onClick={followUser} className='rounded-md p-2 hover:bg-gray-500'>{userInfo?.user?.follows.includes(Number(selectedUser.id)) ? "Unfollow" : "Follow"}</button>
            <button onClick={sendInvite} className='rounded-md p-2 hover:bg-gray-500'>Let's Play</button>
        </div>
      )}
    </div>);
};

export default UserList;
