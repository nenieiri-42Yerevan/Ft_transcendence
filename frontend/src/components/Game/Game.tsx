import React from 'react';
// import Background from '../Background';
import NavBar from "../NavBar";
import Pong from './Pong';
import Multiplayer from './Multiplayer';
import Menu from './Menu';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Game = ({gameSocket}) => {
    const [isReady, setIsReady] = useState(false); // добавляем новое состояние
    const [id, setId] = useState(0);
    const [mode, setMode] = useState(0);
    //const [isReady, setIsReady] = useState(true); // добавляем новое состояние
    
    useEffect(() => {

        if (gameSocket) {
        gameSocket.on('room', (data) => {
                console.log('Received a message from the backend room code:', data);
                setIsReady(true);
                });

        gameSocket.on('add', (data) => {
                console.log('Socket add : ', data);
                setId(data - 1);
                });

        }
        return () => {
            if (gameSocket) {
            gameSocket.off('connect');
            gameSocket.off('info');
            gameSocket.off('room');
            gameSocket.off('add');
            gameSocket.off('disconnect');
            }
            }
        }, [mode, gameSocket]);

    return (
            <>
            <NavBar />
            <div className="flex flex-wrap">
                {isReady ? <Multiplayer gameSocket={gameSocket} id={id} mode={mode} /> : <Menu gameSocket={gameSocket} setMode={setMode} />}
        
            </div>
            </>
           );
};

export default Game; 



