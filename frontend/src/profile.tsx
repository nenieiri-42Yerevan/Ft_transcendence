import Background from "./background";
import avatar from "./assets/images/avatar.png"
import pong from "./assets/images/pong.png"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Fields from './Fields'
import { useSelector } from 'react-redux';
import {selectUser} from './Slices/userSlice';

const Profile = () => {
    const userInfo = useSelector(selectUser);
    console.log(userInfo);
    return (
        <>
            <div className = "flex flex-col justify-center backdrop-blur-md min-h-screen min-w-full items-center bg-black/50 z-[668] absolute">
                <div className="flex flex-col justify-center lg:flex-row">
                    <div className="m-6 w-[30em] justify-center bg-[#9e9c9c33] items-center min-w-full lg:min-w-fit h-fit p-8 rounded-md">
                        <div className="flex justify-center">
                            <img src = {avatar} className = " block w-[10em] h-fit"></img>
                        </div>
                        <p className="text-2xl pb-5 text-center">{userInfo.username}</p>
                        <p className=" text-2xl text-center">{userInfo.email}</p>
                        <p className="text-2xl flex justify-between">Rank: <span>{userInfo.rank}</span></p>
                    </div>
                    <div className="m-5 flex w-[30em] flex-col justify-start min-w-full lg:min-w-fit h-fit p-8 bg-[#9e9c9c33] rounded-md shadow-lg">
                        <div>
                            <p className="text-white font-bold flex justify-between"><img className = "w-[3em]" src = {pong}></img>Friends <span>more</span></p>
                        </div>
                        <hr />
                        <Fields/>
                        <hr />
                        <Fields/>
                        <hr />
                        <Fields/>
                        <hr />
                        <Fields/>
                        <hr />
                        <Fields/>
                    </div>
                </div>
                <div className="m-5">
                    <Link to="#" className="m-3 bg-red-800 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-3 rounded min-w-full md:min-w-[15em] md:mt-20 p-[3em]">
                            Log Out
                    </Link>
                    <Link to="#" className="m-3 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-3 rounded min-w-full md:min-w-[15em] md:mt-20 p-[3em]">
                            Enable 2FA
                    </Link>
                </div>
            </div>
            <Background/>
        </>
    );
    
}
export default Profile;