import axios from "axios";
import React, { useState, useEffect } from "react";
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Users = (props) => {
  const { data } = props;
  const userInfo = useSelector(selectUser);
  return (
    <ul className="overflow-auto h-[32rem]">
      <h2 className="my-2 mb-2 ml-2 text-lg text-white">Chats</h2>
      <li>
        {data && data.map((elem, index) => {
          const info = elem.users.find(el => ( el.id != userInfo.user.id ))
          if (info)
            return (
              <Link
                to = {`/transcendence/user/chat/${info.id}`}
                className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-[#393939] cursor-pointer hover:bg-[#616161] focus:outline-none" key={index}>
                <img className="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-white">{info.first_name + " " + info.last_name}</span>
                  </div>
                  <span className="block ml-2 text-sm text-white">msg here</span>
                </div>
              </Link>)
        })}
      </li>
    </ul>
  )

};

export default Users;