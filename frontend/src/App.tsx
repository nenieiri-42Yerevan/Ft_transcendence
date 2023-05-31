import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './Skybox.scss';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile/Profile';
import UserProfile from './components/Profile/UserProfile';
import Settings from './components/Profile/Settings';
import Welcome from './components/Welcome';
import Chat from './components/Chat/Chat';
import GroupChatComponent from './components/Chat/GroupChat';
import Dashboard from "./components/Dashboard";
import Redirect from './components/Redirect';
import Tfa_42 from './components/Tfa_42';
import Game from "./components/Game/Game";
import DirectChats from './components/Chat/DirectChats';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const App = (props: any) => {
   
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
            gameSocket.on('connect', () => {
                console.log('Socket connection established!');
                });
            gameSocket.on('disconnect', (data) => {
                console.log('Socket connection closed.', data);
                });
            gameSocket.on('info', (data) => {
                    console.log('Info : ', data);
            });

    },[]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/transcendence" element={<Welcome />} />
          <Route path="/transcendence/redirect" element={<Redirect />} />
          <Route path="/transcendence/tfa_42" element={<Tfa_42 />} />
          <Route path="/transcendence/user/signup" element={<SignUp />} />
          <Route path="/transcendence/user/signin" element={<SignIn />} />
          <Route path="/transcendence/user/profile" element={<Profile />} />
          <Route path="/transcendence/user/profile/:id" element={<UserProfile />} />
          <Route path="/transcendence/user/profile/settings" element={<Settings />} />
          <Route path="/transcendence/user/dashboard" element={<Dashboard />} />
          <Route path="/transcendence/user/chat/:id" element={<Chat />} />
          <Route path="/transcendence/user/chat" element={<GroupChatComponent />} />
          <Route path="/transcendence/user/directchats" element={<DirectChats />} />
          <Route path="/transcendence/game" element={<Game gameSocket={gameSocket} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
