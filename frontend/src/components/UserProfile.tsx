import React from "react";
import Background from "./Background";
import avatar from "@SRC_DIR/assets/images/avatar.png"
import pong from "@SRC_DIR/assets/images/pong.png"
import { Link, useParams } from "react-router-dom";
import Profilmenu from './Profilemenu';
import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {fetchFriendsData , fetchMatches, UserInfo, getUserById, getUserInfo, selectUser, setFriends} from './Slices/userSlice';

const UserProfile = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null);
    const [friends, setFriends] = useState(null);
    useEffect(() => {
      console.log(id);
        getUserById(id).then(async userInfo => {
          setUserInfo(userInfo);
          const friends = await fetchFriendsData(1, dispatch, userInfo);
          console.log("lll");
          console.log(friends);
          setFriends(friends);
          // await fetchMatches(1, dispatch, userInfo);
        });
      }, [id]);
      return (
        <>
            <Profilmenu/>
            <div className = "flex flex-row justify-between backdrop-blur-md min-h-full min-w-full bg-black/50 z-[668] absolute">
                <div className="w-full m-4 rounded">
                    <div className="bg-[#1E1E1E] w-full flex flex-col p-5 items-center">
                        <img src={avatar} alt="Profile" className="rounded-full w-32 h-32 object-cover" />
                        <div className="mt-1">
                            <h1 className="font-bold text-4xl text-white">{userInfo && userInfo.first_name && userInfo.first_name} <span>{userInfo && userInfo.last_name && userInfo.last_name}</span></h1>
                            <p className="text-white">{userInfo && userInfo.username && userInfo.username}</p>
                            <Link to="/transcendence/user/profile/settings" className="bg-[#1e81b0] p-1">Settings</Link>
                        </div>
                    </div>
                    <div className="w-full bg-[#1E1E1E] p-8 mt-2 rounded">
                        <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Game Stats</h2>
                        <hr />
                        <p className="text-white flex justify-between p-2">Rank: <span>{userInfo && userInfo.rank && userInfo.rank}</span></p>
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
                    {friends  && friends.slice(0, 5).map((name: string, index: number) => (
                        <p key={index} className="text-white text-center p-2 flex justify-between"><img className = "w-[2em]" src = {avatar}></img> <span>{name}</span></p>
                    ))}
                </div>
            </div>
        <Background/>
        </>
    ); 
}
export default UserProfile;