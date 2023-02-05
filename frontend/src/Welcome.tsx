import React from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import SkyBox from "./Skybox";
import Scene from "./Scene"
import Background from "./background";
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import welphoto from "./assets/images/welcomepagephoto.png"

const Welcome = () => {
    return (
        <>
            {/* <div className="items-center justify-center h-screen flex absolute backdrop-blur-md z-[668] min-w-full min-h-full">
                <img className="mr-60" src={welphoto} alt="Your Image"/>
                <div className="flex lg:min-w-fit lg:min-h-fit box-border rounded-none lg:rounded-3xl xl:rounded-3xl m-0 lg:ml-10 xl:ml-10  p-12 px-12  flex-col justify-between bg-[#9e9c9c33] outline-none border-[#ffffff1a] bg-clip-padding shadow-md shadow-[#2e364408] h-[30em]">
                    <button className="bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-2 rounded w-[15em] pt-[1em] pb-[1em]">
                    Sign Up
                    </button>
                    <button className="bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-2 rounded w-[15em] mt-20 pt-[1em] pb-[1em]">
                    Sign in with 42
                    </button>
                    <button className="bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-2 rounded w-[15em] mt-20 pt-[1em] pb-[1em]">
                    Sign in
                    </button>
                </div>
            </div> */}
            <Background/>
        </>
    );
}


export default Welcome;