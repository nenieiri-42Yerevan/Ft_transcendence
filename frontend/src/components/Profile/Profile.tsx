import React, { useState } from "react";
import Background from "../Background";
import avatar from "@SRC_DIR/assets/images/avatar.png"
import pong from "@SRC_DIR/assets/images/pong.png"
import { Link } from "react-router-dom";
import Profilmenu from './Profilemenu';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsData, fetchMatches, selectUser, Friends, getAvatar, setAvatar, enable2fa } from '../Slices/userSlice';
import refreshToken from "../Utils/refreshToken";
import Footer from "./Footer";
import FriendsList from "./FriendsList";
import Header from './Header';

const Profile = () => {
    const userInfo = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loaded, setloaded] = useState(false);
    useEffect(() => {
        if (!userInfo.user)
            navigate("/transcendence/user/signin");
        else {    
            fetchFriendsData(0, navigate, dispatch, userInfo.user);
            fetchMatches(0, navigate, dispatch, userInfo.user);
            getAvatar(0, navigate, dispatch, userInfo.user.id);
            setloaded(true);
        }
    }, []);
    return (
        <>
        <div className ="backdrop-blur-md flex flex-col min-h-full min-w-full bg-black/50 z-[668] absolute">
            <Profilmenu />
            <div className="flex md:flex-row flex-col min-h-screen justify-between">
                {userInfo.user && <Header loaded = {loaded} userInfo = {userInfo} />}
                <div className="w-full h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Played Matches</h2>
                    <hr />
                    <p className = "text-white hover:bg-[#616161] text-center p-2 flex justify-between">No Data </p>
                    {/* fetchMatches */}
                </div>
                <div className="w-full h-fit m-4 border-[#393939] border-solid border bg-[#1E1E1E] p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Friends <span>more</span></h2>
                    <hr />
                    {userInfo && userInfo.user && userInfo.user.names && userInfo.user.names.slice(0, 5).map((obj: Friends, index: number) => (
                       <FriendsList index = {index} obj = {obj} key = {index}/>
                    ))}
                    <p className = "text-white text-center p-2 flex justify-between hover:bg-[#616161]">{userInfo && userInfo.user &&  userInfo.user.names && userInfo.user.names.length === 0 && "No Data"} </p>
                </div>
            </div>
            <Footer/>
        </div>
        <Background />
        </>
    );
}
export default Profile;