import React, { useState } from 'react';
// import Background from "./Background";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./NavBar";
import search_img from "@SRC_DIR/assets/images/search.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsData, fetchMatches, selectUser, Friends, getAvatar, setAvatar } from './Slices/userSlice';
import axios from "axios";
import Background from "./Background";
import { useEffect } from 'react';
import refreshToken from './Utils/refreshToken';
import GameHistoryTable from './GameHistoryBoard';
import LeaderBoard from './LeaderBoard';
import ActiveChallenges from './RequestsBoard';

const Dashboard = () => {
    
    const userInfo = useSelector(selectUser);
    const navigate = useNavigate();
   // const dispatch = useDispatch();
    useEffect(() => {
        if (!userInfo.user)
            navigate("/transcendence/user/signin");
        else {
            console.log(userInfo.user);
           // fetchFriendsData(0, dispatch, userInfo.user);
           // fetchMatches(0, dispatch, userInfo.user);
            console.log("nn");
            console.log(userInfo);     
        }
    }, []);
      return (
        <>
            <Navigation />
            <div className=" bg-[#262525] py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-dark-blue min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl">
                <div className='flex w-full'>
                <div className='flex w-1/6'> 
                    <form className='flex items-start'>
                        <input className="w-3/4 mr-2 rounded text-black"type="text" />
                        <button type="submit"><img className="h-7 w-7" src={search_img} /></button>
                    </form>
                </div>
                <GameHistoryTable userInfo={userInfo} />
                <ActiveChallenges userInfo={userInfo} />
                <LeaderBoard userInfo={userInfo} />
                </div>
            </div>
        </>
    );
}



export default Dashboard;
