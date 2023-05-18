import React from 'react';
// import Background from '../Background';
import NavBar from "../NavBar";
import Pong from './Pong';
import Menu from './Menu';
import { useState } from 'react';

const Game = () => {
    const [isReady, setIsReady] = useState(false); // добавляем новое состояние
  return (
    <>
    <NavBar />
    <div className="flex flex-wrap">
    {isReady ? <Pong /> : <Menu setIsReady={setIsReady} />}
    </div>
    </>
  );
};

export default Game; 
           
            

