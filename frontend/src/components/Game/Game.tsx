import React from 'react';
// import Background from '../Background';
import NavBar from "../NavBar";
import Engine from './Engine';
const Game = () => {
  return (
    <>
    <NavBar />
    <div className="flex flex-wrap">
            <Engine />
        <div className="w-full md:w-1/5 bg-gray-900 h-screen text-white">
            Chat
        </div>
    </div>
    </>
  );
};

export default Game; 
           
            

