import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { selectUser, getAvatar } from '../Slices/userSlice';

const wait30Sec = () => {
    return new Promise(resolve => {
            setTimeout(() => {
                    resolve('TimeOut');
                    }, 30000);
            });
};

const searchOpponent = async (playerId, setLoading) => {
    try {
        setLoading(true);
        const response = await wait30Sec();
        setLoading(false);
        console.log(response);
        console.log("After await");
    } catch (err) {
        setLoading(false);
        console.error(err);
    }
}

const Menu = ({ handleMatchmaking }) => {
    const userInfo = useSelector(selectUser);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // добавляем новое состояние
    useEffect(() => {
        if (!userInfo) {
            navigate("/transcendence/user/signin");
        }
    },[]);

  return (
  <div className="menu bg-gray-400 rounded-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-4">Pong Game</h1>
      <button
        className="bg-gray-500 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded w-full mb-4"
        onClick={() => searchOpponent(userInfo.id, setIsLoading)}
      >
       {isLoading ? 'Searching..' : 'Online'}
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded w-full mb-4"
        onClick={() => handleMatchmaking(2)}
      >
        Single
      </button>
      <p className="text-center">Instructions:</p>
      <ul className="list-disc list-inside mt-2">
        <li>Use the I and K keys to move your paddle up and down</li>
        <li>Use the space bar to pause the game</li>
      </ul>
    </div>
  );
};
export default Menu;
