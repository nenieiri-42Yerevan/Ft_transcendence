import React, {useEffect, useState} from "react";

const MessageInput = ({groupSocket, curChat}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    
    const sendMsg = () => {
        const msg = {
            channelId: curChat.id,
            text: currentMessage,
        }
        groupSocket.emit('text', msg);
    }

    return( <div className="flex flex-row w-full"> 
              <input type="text" placeholder="Message"
                className="block w-full bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }} required value={currentMessage} />
              <button type="submit" onClick={sendMsg}>
                <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>);

};

export default MessageInput;
