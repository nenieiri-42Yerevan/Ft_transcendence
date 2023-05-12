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
import Dashboard from "./components/Dashboard";
import Game from "./components/Game/Game";

const App = (props: any) => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/transcendence" element={<Welcome />} />
          <Route path="/transcendence/user/signup" element={<SignUp />} />
          <Route path="/transcendence/user/signin" element={<SignIn />} />
          <Route path="/transcendence/user/profile" element={<Profile />} />
          <Route path="/transcendence/user/profile/:id" element={<UserProfile />} />
          <Route path="/transcendence/user/profile/settings" element={<Settings />} />
          <Route path="/transcendence/user/dashboard" element={<Dashboard />} />
          <Route path="/transcendence/user/chat" element={<Chat />} />
          <Route path="/transcendence/game" element={<Game />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
