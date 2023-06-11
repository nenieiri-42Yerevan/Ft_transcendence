import React, {useContext, useEffect, useState} from "react";

import { GroupChatContext} from "../context/ChatContext";
const MessageInput = ({groupSocket}) => {
    const [currentMessage, setCurrentMessage] = useState(""); 
    const {curChat} = useContext(GroupChatContext);

    useEffect(() => {
            
        },[curChat]);
    const sendMsg = () => {
        if (curChat != null) {
            const msg = {
                id: curChat.id,
                value: currentMessage,
            }
            groupSocket.emit('text', msg);
            setCurrentMessage('');
        }
    }

    return( <div className="flex flex-row w-full m-1"> 
              <input type="text" placeholder="Message"
                className="block w-full h-10 bg-gray-100 rounded-full outline-none focus:text-gray-700 p-2 m-1"
                name="message" onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }} required value={currentMessage} />
              <button type="submit" onClick={sendMsg}>
                <svg className="w-10 h-10 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>);
};

export default MessageInput;
