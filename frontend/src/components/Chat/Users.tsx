import axios from "axios";
import React, { useState, useEffect } from "react";
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import avatar from "@SRC_DIR/assets/images/avatar.png";
import ChatUsers from "./ChatUsers";

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
              <ChatUsers info = {info} index = {index} key = {index} />
              )
        })}
      </li>
    </ul>
  )

};

export default Users;
