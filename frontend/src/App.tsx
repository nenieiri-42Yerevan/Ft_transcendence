// import React from "react";
import React, { useRef, useState } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// import SkyBox from "./Skybox";
// import angleToRadians from "./Angle";
import "./Skybox.scss"
import "./App.scss"
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Profile from "./profile";
import Welcome from "./Welcome";
import Test from "./Test";
import Dashboard from "./Dashboard";



export default function App(props: any) {
  // const orbitControlsRef = useRef(null);
  // const ballRef = useRef(null);
  // const boxRef = useRef();
  return (
    <>
      {/* <Test/> */}
      <Router>
        <Routes>
          <Route path="/transcendence" element={<Welcome />} />
          <Route path="/transcendence/user/signup" element={<SignUp />} />
          <Route path="/transcendence/user/signin" element={<SignIn />} />
          <Route path="/transcendence/user/profile" element={<Profile />} />
          <Route path="/transcendence/user/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </>
  );
}