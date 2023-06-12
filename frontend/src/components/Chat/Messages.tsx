import axios from "axios";
import React, { useState, useEffect } from "react";
import { selectUser } from "../Slices/userSlice";
import { useSelector } from 'react-redux';
import Message from "./Message";

const Messages = (props) => {
  const userInfo = useSelector(selectUser);
  const [hidden, setHidden] = useState(true);
  const { messageList } = props;
  useEffect(() => {
      console.log(messageList);
      },[messageList]);
  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
      {messageList && messageList.map((messageContent, index) => (
        <Message messageContent={ messageContent} index = {index} key = {index} userInfo = {userInfo} />
      ))}
    </div>
  )
};

export default Messages;
