import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./components/Skybox"
import "./App.css"
import "./Skybox.scss"
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Welcome from "./components/Welcome";
import Chat from "./components/Chat/Chat";



const  App = () => {
  return (
    <>
      {/* <Test/> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<Welcome />} /> */}
          <Route path="/transcendence" element={<Welcome />} />
          <Route path="/transcendence/user/signup" element={<SignUp />} />
          <Route path="/transcendence/user/signin" element={<SignIn />} />
          <Route path="/transcendence/user/profile" element={<Profile />} />
          {/* <Route path="/test" element={<Test />}></Route> */}
          <Route path="/transcendence/user/chat" element={<Chat />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;