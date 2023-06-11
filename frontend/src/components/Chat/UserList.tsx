import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GroupChatContext} from "../context/ChatContext";
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
import { block, follow } from "../Slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserList = ({chatSocket, gameSocket}) => {
    const {curChat} = useContext(GroupChatContext);
    const userInfo = useSelector(selectUser);
    const [users, setUsers] = useState(null);
    const disp = useDispatch();
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);
    const [selectedUser, setSelectedUser] = useState(false);
    const [points, setPoints] = useState({
                                            x: 0,
                                            y: 0,
                                          });
    const Status = {
        0: "OFFLINE",
        1: "ONLINE",
    };

    useEffect(() => {
        if (curChat && curChat.users.some(user => user.id == userInfo.user.id))
            {console.log(curChat);
            setUsers(curChat.users);}
        else 
            setUsers([]);
        const handleClick = () => setClicked(false);
        window.addEventListener("click", handleClick);
    
    return () => {
        window.removeEventListener("click", handleClick);
        };
        }, [curChat, userInfo]);

    const followUser = () => {
        follow(disp, navigate, userInfo.user, selectedUser.id);
    }

    const sendInvite = () => {
        
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
          <p className="truncate">{(userInfo.user.username == user.username) ? "You" : user.username}</p>
          <div className={`h-3 w-3 rounded-full bg-${userInfo.status==1?"green-700":"red-700"}`}/>
          </Link> 
          </div>
          </div>)})}
          {clicked && (
        <div className="absolute flex flex-col w-400 text-white text-xl bg-gray-800 rounded-lg box-border p-2"
              style={{ top: `${points.y}px`, left: `${points.x}px` }}>
            { curChat.admins.some(id => id == userInfo.user.id) &&
            (<>
            <button className='rounded-md p-2 hover:bg-gray-500'>Mute</button>
            <button className='rounded-md p-2 hover:bg-gray-500'>Ban </button>
            <button className='rounded-md p-2 hover:bg-gray-500'>Kick</button>
            </>)
            }
            { curChat.owner.id == userInfo.user.id &&
            <button className='rounded-md p-2 hover:bg-gray-500'>Give admin rights</button>
            }
            <button onClick={followUser} className='rounded-md p-2 hover:bg-gray-500'>{userInfo?.user?.follows.includes(Number(selectedUser.id)) ? "Unfollow" : "Follow"}</button>
            <button className='rounded-md p-2 hover:bg-gray-500'>Let's Play</button>
        </div>
      )}
    </div>);
};

export default UserList;
