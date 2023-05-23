import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Engine from './Engine';


const Menu = (props) => {
    const { gameSocket } = props;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState("Find Game"); // добавляем новое состояние

    const searchOpponent = () => {
        try {
            setIsLoading("Searching...");
            gameSocket.emit('add');
        } catch (err) {
            setIsLoading("Error");
            console.error(err);
        }
    }

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
                onClick={() => searchOpponent()}
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
    ) ;
};
export default Menu;
