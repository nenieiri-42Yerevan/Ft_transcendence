import React from 'react';
import { Link } from 'react-router-dom';

const Profilemenu = () => {
  const removeToken = () => {
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
  };
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
            <Link to="#">Chat</Link>
          </li>
          <li>
            <Link to="#">Game</Link>
          </li>
          <li className="absolute right-0">
            <Link
              to="/transcendence/user/signin"
              onClick={removeToken}
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
