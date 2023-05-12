import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logout, selectUser } from '../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { logOut } from './Slices/userSlice';

const Profilemenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser); 
   const logOut = async () => {
    try {
      const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      });
      dispatch(logout())
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      navigate("/transcendence/user/signin")
    } catch (error) {
      console.log(error);
    }
   }
  return (
    <>
      <nav className="flex justify-between w-full py-2 px-4 bg-[#1E1E1E] text-white">
        <ul className="flex gap-4">
          <li>
            <Link to="/transcendence/user/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="#">Friends</Link>
          </li>
          <li>
            <Link to="/transcendence/user/chat">Chat</Link>
          </li>
          <li>
            <Link to="#">Game</Link>
          </li>
          
           
        </ul>
        <div className='flex flex-row justify-end'>
        <button
              onClick={logOut}
              className="text-center text-red-900 font-bold"
            >
              Log Out
          </button>
        </div>
      </nav>
    </>
  );
};

export default Profilemenu;
