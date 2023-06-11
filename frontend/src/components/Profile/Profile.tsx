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
import { fetchFriendsData, fetchMatches, selectUser, Friends, getAvatar, setAvatar, enable2fa, Matches } from '../Slices/userSlice';
import refreshToken from "../Utils/refreshToken";
import Footer from "./Footer";
import FriendsList from "./FriendsList";
import Header from './Header';
import MatchList from "./MatchList";
import GameHistoryTable from "../GameHistoryBoard";

const Profile = ({notify}) => {
    const userInfo = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loaded, setloaded] = useState(false);
    const [matches, setMatches] = useState(null);
    useEffect(() => {
        if (userInfo && !userInfo.user)
            navigate("/transcendence/user/signin");
        else {
            //notify?.connect();
            fetchFriendsData(0, navigate, dispatch, userInfo.user);
            fetchMatches(0, navigate, dispatch, userInfo.user);
            getAvatar(0, navigate, dispatch, userInfo.user.id);
            if (matches == null) {
                fetchMatches(1, navigate, dispatch, userInfo.user)
                .then((data?: Matches[]) => {
                    setMatches(data);})
                .catch(error => console.log(error));
                }
            setloaded(true);
        }
    }, [notify]);
    return (
        <>
            <div className="flex flex-col bg-[#262525]">
                <Profilmenu notify = {notify}/>
                <div className="flex md:flex-row flex-col min-h-screen justify-between">
                    {userInfo.user && <Header loaded={loaded} userInfo={userInfo} />}
                    <GameHistoryTable matches={matches} />
                    <div className="w-full  mx-4 md:w-1/4 h-fit m-1 border-[#393939] border-solid border bg-[#1E1E1E] p-8 rounded">
                        <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Friends</h2>
                        <hr />
                        {userInfo && userInfo.user && userInfo.user.names && userInfo.user.names.map((obj: Friends, index: number) => (
                            <FriendsList index={index} obj={obj} key={index} />
                        ))}
                        <p className="text-white text-center p-5 font-bold hover:bg-[#616161]">{userInfo && userInfo.user && userInfo.user.names && userInfo.user.names.length === 0 && "No Data"} </p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
export default Profile;
