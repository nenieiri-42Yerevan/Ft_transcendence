import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { logout } from './Slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { logOut } from './Slices/userSlice';

const Profilemenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
        }
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(logout())
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    // navigate("/transcendence/user/signin");
  }
  return (
    <>
      <nav className="flex justify-between w-full py-2 px-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="#">Dashboard</Link>
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
          <li className="absolute right-0">
            <Link
              to="/transcendence/user/signin"
              onClick={logOut}
              className="m-3 mr-0 text-center text-red-900 font-bold py-3 "
            >
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Profilemenu;
