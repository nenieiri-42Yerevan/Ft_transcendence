import React from 'react';

const Menu = ({ handleMatchmaking }) => {
  return (
  <div className="menu bg-gray-400 rounded-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-4">Pong Game</h1>
      <button
        className="bg-gray-500 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded w-full mb-4"
        onClick={() => handleMatchmaking(3)}
      >
        Online 
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
