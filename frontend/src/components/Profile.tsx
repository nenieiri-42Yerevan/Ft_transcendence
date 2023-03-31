import React from "react";
import Background from "./Background";
import avatar from "@SRC_DIR/assets/images/avatar.png"
import pong from "@SRC_DIR/assets/images/pong.png"
import { Link } from "react-router-dom";
import Profilmenu from './Profilemenu';
import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {fetchFriendsData , fetchMatches, selectUser, setFriends} from './Slices/userSlice';

const Profile = () => {
    const userInfo = useSelector(selectUser);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const removeToken = () => {
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("access_token");
    }
    useEffect(() => {
        const authorized = location.state ? location.state.authorized : false;
        if (!authorized)
            navigate("/transcendence/user/signin");
        else
        {
            fetchFriendsData(dispatch, userInfo);
            fetchMatches(dispatch, userInfo);
        }
      }, []);
      return (
        <>
            <Profilmenu/>
            <div className = "flex flex-row justify-between backdrop-blur-md min-h-full min-w-full bg-black/50 z-[668] absolute">
                <div className="w-full m-4 rounded">
                    <div className="bg-[#1E1E1E] w-full flex flex-col p-5 items-center">
                        <img src={avatar} alt="Profile" className="rounded-full w-32 h-32 object-cover" />
                        <div className="mt-1">
                            <h1 className="font-bold text-4xl text-white">{userInfo.name && userInfo.name + " " + userInfo.lastName && userInfo.lastName}</h1>
                            <p className="text-white">{userInfo.username && userInfo.username}</p>
                        </div>
                    </div>
                    <div className="w-full bg-[#1E1E1E] p-8 mt-2 rounded">
                        <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Game Stats</h2>
                        <hr />
                        <p className="text-white flex justify-between p-2">Rank: <span>{userInfo.rank && userInfo.rank}</span></p>
                    </div>
                </div>
                <div className="w-full h-fit bg-[#1E1E1E] m-4 p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Played Matches</h2>
                    <hr />
                    {/* fetchMatches */}
                </div>
                <div className="w-full h-fit m-4 bg-[#1E1E1E] p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Friends <span>more</span></h2>
                    <hr />
                    {userInfo.names && userInfo.names.slice(0, 5).map((name: string, index: number) => (
                        <p key={index} className="text-white text-center p-2 flex justify-between"><img className = "w-[2em]" src = {avatar}></img> <span>{name}</span></p>
                    ))}
                </div>
            </div>
        <Background/>
        </>
    ); 
}
export default Profile;