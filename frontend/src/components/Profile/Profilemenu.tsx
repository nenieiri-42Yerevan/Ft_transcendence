import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logout, selectUser } from '../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GameContext } from "../context/GameSocket";
// import { logOut } from './Slices/userSlice';

const Profilemenu = ({notify}) => {
  const {invite} = useContext(GameContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser); 
  const [blinking, setBlinking] = useState(false);
   const logOut = async () => {
    try {
      const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      dispatch(logout())
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      await notify.disconnect();
      navigate("/transcendence/user/signin")
    } catch (error) {
    }
   }

  useEffect(() => {
      if (!userInfo)
          navigate("/transcendence/user/signin");
          if (invite) {
              const intervalId = setInterval(() => {
          setBlinking((prevBlinking) => !prevBlinking);
        }, 500);
         return () => clearInterval(intervalId);
          }
  }, [invite]);

  return (
    <>
      <nav className="flex justify-between w-full py-2 px-4 bg-[#1E1E1E] text-white">
        <ul className="flex gap-4">
          <li>
            <Link to="/transcendence/user/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/transcendence/user/chat">Chat</Link>
          </li>
          <li>
            <Link to="/transcendence/game" className={`${blinking && "bg-gray-500"}`}>Game</Link>
          </li>
          <li>
            <Link to="/transcendence/user/profile">Profile</Link>
          </li>
          <li>
            <Link to="/transcendence/user/all">Users</Link>
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
