import { createContext } from 'react'
import { io, Socket } from 'socket.io-client';

const socketOptions = {
    transportOptions: {
        polling: {
            extraHeaders: {
                Token: `Bearer ${localStorage.getItem('access_token')}`,
            },
        },
    },
};
export const socket = io(`${process.env.BACK_URL}`, socketOptions);
export const SocketContext = createContext<Socket>(socket);
export const SocketProvider = SocketContext.Provider;
