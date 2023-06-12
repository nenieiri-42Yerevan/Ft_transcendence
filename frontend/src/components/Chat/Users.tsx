import axios from "axios";
import React, { useState, useEffect } from "react";
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import avatar from "@SRC_DIR/assets/images/avatar.png";
import ChatUsers from "./ChatUsers";
import { filterItems } from "../context/ChatContext";

const Users = (props) => {
  const { data, gameSocket, notify } = props;
  const userInfo = useSelector(selectUser);
  const [query, setQuery] = useState('');
  const [res, setRes] = useState(null);

  useEffect(()=>{
    setRes(filterItems(query, data, userInfo));
  }, [query, data])

  return (
    <>
      <div className=" my-3">
        <div className="relative text-white">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input type="search" className="block w-full py-2 pl-10 bg-[#262525] border border-[#D1D5DB] rounded outline-none" name="search"
            placeholder="Search" onChange={e => setQuery(e.target.value)} required />
        </div>
      </div>
      <ul className="overflow-auto h-[32rem]">
        <h2 className="my-2 mb-2 ml-2 text-lg text-white">Chats</h2>
        <li>
          {res ? 
          res.map((info, index)=>{return (<ChatUsers gameSocket={gameSocket} notify={notify} info={info} key = {index} currentId = {userInfo?.user?.id}/>)}) : 
          data && data.map((elem, index) => {
            const info = elem.users.find(el => (el.id != userInfo.user.id))
            if (info)
            return (
              <ChatUsers gameSocket={gameSocket} notify={notify} info={info} index={index} key={index} currentId = {userInfo?.user?.id} />
              )
            })
          }
        </li>
      </ul>
    </>
  )

};

export default Users;
