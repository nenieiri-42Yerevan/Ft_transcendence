import React from 'react';
// import Background from '../Background';
import NavBar from "../NavBar";
import Pong from './Pong';
import Menu from './Menu';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Game = () => {
    const [isReady, setIsReady] = useState(false); // добавляем новое состояние
    const [id, setId] = useState(0);
    //const [isReady, setIsReady] = useState(true); // добавляем новое состояние
   const [gameSocket, setGameSocket] = useState(null);
    
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
            const gameSocket = io(`${process.env.BACK_URL}/pong`, socketOptions);
            setGameSocket(gameSocket);
        gameSocket.on('room', (data) => {
                console.log(`${data} room number`);
                });

        gameSocket.on('connect', () => {
                console.log('Socket connection established!');
                });
        gameSocket.on('info', (data) => {
                console.log('Info : ', data);
        });

        gameSocket.on('room', (data) => {
                console.log('Received a message from the backend room code:', data);
                setIsReady(true);
                });

        gameSocket.on('disconnect', (data) => {
                console.log('Socket connection closed.', data);
                });

        gameSocket.on('add', (data) => {
                console.log('Socket add : ', data);
                setId(data - 1);
                });
        return () => gameSocket.close();

      
        }, [setGameSocket, setId, setIsReady]);

    return (
            <>
            <NavBar />
            <div className="flex flex-wrap">
                {isReady ? <Pong gameSocket={gameSocket} id={id} /> : <Menu gameSocket={gameSocket} />}
            </div>
            </>
           );
};

export default Game; 



