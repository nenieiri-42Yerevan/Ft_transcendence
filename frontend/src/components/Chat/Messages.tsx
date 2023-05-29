import axios from "axios";
import React, { useState, useEffect } from "react";

const Messages = (props) => {
  const { messageList } = props;
  return (
    <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
      {messageList && messageList.map((messageContent, index) => (
        <ul className="space-y-2" key={index}>
          {messageContent.author.id != props.curId ?
            <li className="flex justify-start">
              <div className="relative max-w-xl px-4 py-2 text-white rounded shadow">
                <span className="block">{messageContent.content}</span>
              </div>
            </li>
            :
            <li className="flex justify-end">
              <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                <span className="block">{messageContent.content}</span>
              </div>
            </li>
          }
        </ul>
      ))}
    </div>
  )
};

export default Messages;