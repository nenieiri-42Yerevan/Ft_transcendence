import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './Skybox.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile/Profile';
import UserProfile from './components/Profile/UserProfile';
import Settings from './components/Profile/Settings';
import Welcome from './components/Welcome';
import Chat from './components/Chat/Chat';
import Chanels from './components/Chat/Chanels';
import Dashboard from "./components/Dashboard";
import Redirect from './components/Redirect';
import Tfa_42 from './components/Tfa_42';
import Game from "./components/Game/Game";
import DirectChats from './components/Chat/DirectChats';
import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { selectUser } from './components/Slices/userSlice';
import { useSelector } from 'react-redux';
import AllUsers from './components/AllUsers';
import { useNavigate } from "react-router-dom";
import { GameContext } from './components/context/GameSocket';

const App = (props: any) => {
    const userInfo = useSelector(selectUser);
   const [gameSocket, setGameSocket] = useState(null);
   const [chatSocket, setChatSocket] = useState(null);
   const [chatInfo, setChatInfo] = useState(null);
   const [notify, setnotify] = useState(null);
   const [invite, setInvite] = useState(false);
   const [playerId, setPlayerId] = useState(0);
    const [start, setStart] = useState(false);
  useEffect(() => {
      if (!userInfo.user) {
        return; 
    }
    const socketOptions = {
            transportOptions: { 
                polling: {
                    extraHeaders: {
                        authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        },
                    },
                },
                reconnection: true,
                reconnectionAttempts: 5,
                timeout: 3000,
            };
            const gameSocket = io(`${process.env.BACK_URL}/pong`, socketOptions);
            const chatSocket = io(`${process.env.BACK_URL}/chat`, socketOptions);
            const notify = io(`${process.env.BACK_URL}/notify`, socketOptions);
            setGameSocket(gameSocket);
            setChatSocket(chatSocket);
            setnotify(notify);
            setTimeout(() => {
                gameSocket.connect();
                chatSocket.connect();
                notify.connect();
                }, 1000);
            gameSocket.on('connect', () => {
                console.log('Game Socket connection established!');
                });
            notify.on('connect', ()=>{
              console.log("notify connected");
            })
            notify.on('disconnect', (data)=>{
              console.log("notify disconnected");
            })

            notify.on('error', (data)=>{
              console.log("notify error:", data);
                toast.error(data, {
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    });
            })
            notify.on('message', (data) => {
                console.log(data);
                if (data.opponent && data.message) {
                toast.info(<div className="flex flex-col">
                        <div className="pb-2">{`Invite to the game from ${data.opponent.username}`}</div>
                        <div className="flex flex-row justify-end">
                        <button
                        className="px-4 py-1 mr-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => {
                            setInvite(false);
                            setPlayerId(0);
                        notify.emit('message', { id: data.opponent.id, submit:false }); 
                        toast.dismiss();
                        }}
                        >
                        Decline
                        </button>
                        <button
                        className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => {
                            console.log(data);
                            gameSocket.emit('join-room', data.message);
                            setInvite(true);
                            setPlayerId(1);
                        notify.emit('message', { id: data.opponent.id, submit:true }); 
                            //useNavigate("/transcendence/game", { state: {notify: true}});
                            toast.dismiss();
                        }}
                        >
                        Submit
                        </button>
                        </div>
                        </div>, {
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    });} else if (data.submit != undefined){
                        
                        toast.info(`User  ${(data.submit == true)?"Accepted":"Declined"}`, {autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
});
                        setInvite(data.submit);
                    }
                });

            gameSocket.on('disconnect', (data) => {
                console.log('Game Socket connection closed.', data);
                });
            chatSocket.on('connect', () => {
                console.log('Chat Socket connection established!');
                });
            chatSocket.on('disconnect', (data) => {
                console.log('Chat Socket connection closed.', data);
                });
            chatSocket.on('error', (data) => {
                console.log('Chat Socket error:', data);
                });
            chatSocket.on('info', (data) => {
                setChatInfo(data.message);
                });
            gameSocket.on('info', (data) => {
                console.log('Info : ', data);
            });
            gameSocket.on('room', (data) => {
                console.log('Room : ', data);
            });
            gameSocket.on('error', (data) => {
                console.log('Error : ', data);
            });

            return () => { 
                gameSocket.close();
                chatSocket.close();
                notify.close();
                };

    },[userInfo?.user?.id]);
  return (
    <>
        <GameContext.Provider value={{setInvite, invite, start, setStart, playerId, setPlayerId}}>
    <ToastContainer />
      <Router>
        <Routes>
          <Route path="/transcendence" element={<Welcome />} />
          <Route path="/transcendence/user/all" element={<AllUsers />} />
          <Route path="/transcendence/redirect" element={<Redirect notify = {notify}/>} />
          <Route path="/transcendence/tfa_42" element={<Tfa_42 notify = {notify}/>} />
          <Route path="/transcendence/user/signup" element={<SignUp />} />
          <Route path="/transcendence/user/signin" element={<SignIn notify = {notify}/>} />
          <Route path="/transcendence/user/profile" element={<Profile notify = {notify}/>} />
          <Route path="/transcendence/user/profile/:id" element={<UserProfile gameSocket={gameSocket} notify={notify} chatSocket = {chatSocket} />} />
          <Route path="/transcendence/user/profile/settings" element={<Settings notify = {notify}/>} />
          <Route path="/transcendence/user/dashboard" element={<Dashboard />} />
          <Route path="/transcendence/user/chat/:id" element={<Chat notify={notify} gameSocket={gameSocket} chatSocket={chatSocket} />} />
          <Route path="/transcendence/user/chat" element={<Chanels notify={notify} chatSocket={chatSocket} gameSocket={gameSocket} />} />
          <Route path="/transcendence/user/directchats" element={<DirectChats  gameSocket={gameSocket} notify={notify} chatSocket={chatSocket}/>} />
          <Route path="/transcendence/game" element={<Game gameSocket={gameSocket} isInvite={invite} />} />
        </Routes>
      </Router>
      </GameContext.Provider>
    </>
  );
};

export default App;
