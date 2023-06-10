import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GroupChatContext} from "../context/ChatContext";
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
const UserList = () => {
    const {curChat} = useContext(GroupChatContext);
    const userInfo = useSelector(selectUser);
    const [users, setUsers] = useState(null);
    const Status = {
        0: "OFFLINE",
        1: "ONLINE",
    };

    useEffect(() => {
        if (curChat && curChat.users.some(user => user.id == userInfo.user.id))
            setUsers(curChat.users);
        else 
            setUsers([]);
        }, [curChat, userInfo]);
    return ( 
       <div >
      {users && users.map((user, index) => 
          <div key={index} className='bg-gray-700 m-1 text-center text-white text-xl rounded-md hover:bg-gray-500'> 
          <Link className='flex flex-row justify-between m-2' to={`/transcendence/user/profile/${user.id}`} key={user.id}>
          <p className="truncate">{(userInfo.user.username == user.username) ? "You" : user.username}</p>
          <p>{Status[user.status]}</p>
          </Link> 
          </div>)}

        </div>);
};

export default UserList;
