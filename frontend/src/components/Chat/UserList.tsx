import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const UserList = ({users}) => {

    useEffect(() => {}, [users]);
    return ( 
       <div >
      {users && users.map((user, index) =><div key={index} className='bg-gray-700 m-1 text-center rounded-md hover:bg-gray-500'> <Link to={`/transcendence/user/profile/${user.id}`} key={user.id}>{user.username} {user.status==1?"Offline":"Online"}</Link> </div>)}
        </div>);
};

export default UserList;
