import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const UserList = ({users}) => {
    return ( 
       <div className='bg-gray-700 m-1 text-center rounded-md hover:bg-gray-500'>
      {users.map((user) => <Link to={`/transcendence/user/profile/${user.id}`} key={user.id}>{user.username} {user.status==1?"Offline":"Online"}</Link>)}
    </div>);
};

export default UserList;
