// import React from "react";
import React, { useRef, useState } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// import SkyBox from "./Skybox";
// import angleToRadians from "./Angle";
import "./Skybox.scss"
import "./App.scss"
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Welcome from "./Welcome";




export default function App(props: any) {
  // const orbitControlsRef = useRef(null);
  // const ballRef = useRef(null);
  // const boxRef = useRef();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
}