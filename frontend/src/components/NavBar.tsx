import React, { useContext, useState } from "react";
import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { selectUser } from "./Slices/userSlice";
import { GameContext } from "./context/GameSocket";


const Navigation  = () => {
  const {invite} = useContext(GameContext);
  const location = useLocation();
  const activeTab = location.pathname;
  const userInfo = useSelector(selectUser);
  const navigate = useNavigate();
const [blinking, setBlinking] = useState(false);
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
      <nav className="flex justify-between w-full h-10 py-2 px-4 bg-[#1E1E1E] text-white">
        <ul className="flex gap-4">
          <li>
            <Link to="/transcendence/user/dashboard" className={classNames({"font-bold": activeTab.includes("/dashboard")
              })}>Dashboard</Link>
          </li>
          <li>
            <Link to="/transcendence/user/chat" className={classNames({"font-bold": activeTab.includes("/chat")
              })}>Chat</Link>
          </li>
          <li>
            <Link to="/transcendence/game" className={`${blinking && "bg-gray-500"} ${classNames({"font-bold": activeTab.includes("/game") 
              })}`}>Game</Link>
          </li>
          <li>
            <Link to="/transcendence/user/profile" className={classNames({"font-bold": activeTab.includes("/profile")
              })}>Profile</Link>
          </li>
          <li>
            <Link to="/transcendence/user/all" className={classNames({"font-bold": activeTab.includes("/all")
              })}>users</Link>
          </li>
        </ul>
        <div className='flex flex-row h-full justify-end'>
          <img className='h-7 w-7 mr-3 item-center rounded-full' src={userInfo.user.img}/>
        <Link
              to="/transcendence/user/profile"
              className="text-center font-bold"
            >
              {userInfo.user.username}
            </Link>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
