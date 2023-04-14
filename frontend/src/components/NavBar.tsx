import React, { FC } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./Slices/userSlice";


const Navigation  = () => {
  const location = useLocation();
  const activeTab = location.pathname;
  const userInfo = useSelector(selectUser).user;
  return (
    <>
      <nav className="flex justify-between w-full h-10 py-2 px-4 bg-[#1E1E1E] text-white">
        <ul className="flex gap-4">
          <li>
            <Link to="/transcendence/user/dashboard" className={classNames({"font-bold": activeTab.includes("/dashboard")
              })}>Dashboard</Link>
          </li>
          <li>
            <Link to="#" className={classNames({"font-bold": activeTab.includes("/friends")
              })}>Friends</Link>
          </li>
          <li>
            <Link to="/transcendence/user/chat" className={classNames({"font-bold": activeTab.includes("/chat")
              })}>Chat</Link>
          </li>
          <li>
            <Link to="/transcendence/game" className={classNames({"font-bold": activeTab.includes("/game")
              })}>Game</Link>
          </li>
          
           
        </ul>
        <div className='flex flex-row h-full justify-end'>
          <img className='h-7 w-7 mr-3 item-center rounded-full' src={userInfo.img}/>
        <Link
              to="/transcendence/user/profile"
              className="text-center font-bold"
            >
              {userInfo.name}
            </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
