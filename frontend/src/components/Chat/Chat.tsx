import Navigation from "../NavBar";
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const Chat = () => {

    const [groupChatSocket, setGroupChatSocket] = useState(null);
    useEffect(() => {
            const socketOptions = {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
                        },
                    },
                }
            };
            const groupChatSocket = io(`${process.env.BACK_URL}/chat`, socketOptions);
            setGroupChatSocket(groupChatSocket);

        groupChatSocket.on('connect', () => {
                console.log('Socket connection established!');
                });
        groupChatSocket.on('info', (data) => {
                console.log('Info : ', data);
        });
        groupChatSocket.on('disconnect', (data) => {
                console.log('Socket connection closed.', data);
                });

             return () => groupChatSocket.close();
        }, [setGroupChatSocket]);

    const CreateGroupChat = () => {
    }

    return (
        <>
        <Navigation />
        <div className=" bg-[#262525] py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-dark-blue min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl" >
        <div className='w-full md:w-2/5 h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-8 rounded text-center'>
           <li> ROOMS</ li>
           <button
                className="bg-gray-700 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded mt-4 mb-1"
                onClick={() => CreateGroupChat()}
            >
                Create Room
            </button>

        </div>
        <div className="w-full md:w-4/5 h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-8 rounded text-center">
            CHAT
        </div>
        </div>
    </>
)
}
export default Chat;

