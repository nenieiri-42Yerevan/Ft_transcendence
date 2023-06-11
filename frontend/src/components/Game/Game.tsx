import React from 'react';
// import Background from '../Background';
import NavBar from "../NavBar";
import Pong from './Pong';
import Multiplayer from './Multiplayer';
import Menu from './Menu';
import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from "react-router-dom";
import { GameContext } from '../context/GameSocket';

const Game = ({gameSocket, isInvite}) => {
    const [isReady, setIsReady] = useState(isInvite);
    const [id, setId] = useState(0);
    const [mode, setMode] = useState(0);
    const {invite, setPlayerId} = useContext(GameContext);
    
    useEffect(() => {
        setIsReady(invite);

        if (gameSocket) {
        gameSocket.on('room', (data) => {
                console.log('Received a message from the backend room code:', data);
                setIsReady(true);
                });

        gameSocket.on('add', (data) => {
                console.log('Socket add : ', data);
                setPlayerId(data - 1);
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
        }, [mode, gameSocket, invite]);

    return (
            <>
            <NavBar />
            <div className="flex flex-wrap">
                {isReady ? <Multiplayer gameSocket={gameSocket} id={id} setId={setId} mode={mode} /> : <Menu gameSocket={gameSocket} setMode={setMode} />}
        
            </div>
            </>
           );
};

export default Game; 



