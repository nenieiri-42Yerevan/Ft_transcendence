import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { selectUser, getAvatar } from '../Slices/userSlice';
import { GameContext } from "../context/GameSocket";
import io from 'socket.io-client';
import Engine from './Engine';

const searchOpponent = async (player, setLoading, socket) => {
    try {
        setLoading("Searching...");
        socket.emit('add');
    } catch (err) {
        setLoading("Error");
        console.error(err);
    }
}

const Menu = ({setIsReady}) => {
    const userInfo = useSelector(selectUser);
    const navigate = useNavigate();
    const socket = useContext(GameContext);
    const [isLoading, setIsLoading] = useState("Find Game"); // добавляем новое состояние


    useEffect(() => {
        if (userInfo && !userInfo.user) {
            navigate("/transcendence/user/signin");
        } else {
            socket.on('connect', () => {
                    console.log('Socket connection established!');
                    });

            socket.on('add', (data) => {
                    console.log('Received a message from the backend add:', data);
                    });
            socket.on('room', (data) => {
                    console.log('Received a message from the backend room code:', data);
                    setIsReady(true);
                    });
            socket.on('error', (error) => {
                    console.error('Socket error:', error);
                    });

            socket.on('disconnect', (data) => {
                    console.log('Socket connection closed.', data);
                    });
        }
    },[]);

  return (
      <div className='w-screen h-screen justify-center relative'> 
          <div className='scene w-full h-full absolute'>
              <Engine isPreview={true} /> 
          </div>
        <div className='w-screen h-screen flex justify-center items-center'> 
          <div className="w-1/2 h-1/3 flex flex-col justify-center items-center bg-gray-400 bg-opacity-70 rounded-lg p-8 relative z-10"> 
            <h1 className="text-2xl font-bold text-center mb-4">Pong Game</h1>
            <button
                className="bg-gray-700 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded w-1/2 mb-4"
                onClick={() => searchOpponent(userInfo, setIsLoading, socket)}
            >
                {isLoading}
            </button>
            <p className="text-center">Instructions:</p>
            <ul className="list-disc list-inside mt-2">
                <li>Use the I and K keys to move your paddle up and down</li>
                <li>Use the space bar to pause the game</li>
            </ul>
          </div>
          </div>
      </div>
    );
};
export default Menu;
