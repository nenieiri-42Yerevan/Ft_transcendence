import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GroupChatContext} from "../context/ChatContext";
import { useSelector } from 'react-redux';
import { selectUser } from "../Slices/userSlice";
const UserList = () => {
    const {curChat} = useContext(GroupChatContext);
    const userInfo = useSelector(selectUser);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        if (curChat && curChat.users.some(user => user.id == userInfo.user.id))
            setUsers(curChat.users);
        else 
            setUsers([]);
        }, [curChat, userInfo]);
    return ( 
       <div >
      {users && users.map((user, index) =><div key={index} className='bg-gray-700 m-1 text-center rounded-md hover:bg-gray-500'> <Link to={`/transcendence/user/profile/${user.id}`} key={user.id}>{user.username} {user.status==1?"Offline":"Online"}</Link> </div>)}
        </div>);
};

export default UserList;
