import { createContext } from 'react'
import { io, Socket } from 'socket.io-client';

const socketOptions = {
    transportOptions: {
        polling: {
            extraHeaders: {
                authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            },
        },
    },
};
export const socket = io(`${process.env.BACK_URL}/pong`, socketOptions);
export const GameContext = createContext<Socket>(socket);
export const SocketProvider = GameContext.Provider;

