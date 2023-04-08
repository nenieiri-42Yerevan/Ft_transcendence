import React, { useState } from "react";
import Background from "./Background";
import avatar from "@SRC_DIR/assets/images/avatar.png"
import pong from "@SRC_DIR/assets/images/pong.png"
import { Link } from "react-router-dom";
import Profilmenu from './Profilemenu';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsData, fetchMatches, selectUser, Friends, getAvatar, setAvatar } from './Slices/userSlice';
import refreshToken from "./Utils/refreshToken";
import Footer from "./Footer";

const Profile = () => {
    const userInfo = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState<File | null>(null);
    useEffect(() => {
        if (!userInfo.user)
            navigate("/transcendence/user/signin");
        else {
            fetchFriendsData(0, dispatch, userInfo.user);
            fetchMatches(0, dispatch, userInfo.user);
            getAvatar(0, dispatch, userInfo.user.id);
            console.log("nn");
            console.log(userInfo);     
        }
    }, []);
    return (
        <>
        <div className ="backdrop-blur-md flex flex-col min-h-full min-w-full bg-black/50 z-[668] absolute">
            <Profilmenu />
            <div className="flex md:flex-row flex-col min-h-screen justify-between">
                <div className="w-full m-4 rounded">
                    <div className="bg-[#1E1E1E] w-full border-[#393939] border-solid border flex flex-col p-5 items-center">
                        <img src={userInfo.user.img ? userInfo.user.img : avatar } alt="Profile" className="rounded-full w-32 h-32" />
                        <div className="mt-1">
                            <h1 className="font-bold text-4xl text-white">{userInfo.user.name && userInfo.user.name} <span>{userInfo.user.lastName && userInfo.user.lastName}</span></h1>
                            <p className="text-white mb-8">{userInfo.user.username && userInfo.user.username}</p>
                            <input className="text-white p-1 my-2 " id="profile-image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files && e.target.files[0])} />
                            <p><button className="bg-[#1e81b0] p-1 my-2 w-40" onClick={async ()=>{await setAvatar(imageFile, userInfo.user.id, dispatch); getAvatar(0, dispatch, userInfo.user.id);}}>Upload</button></p>
                            <Link to="/transcendence/user/profile/settings" className="bg-[#1e81b0] block p-1 my-2 w-40 text-center">Settings</Link>
                        </div>
                    </div>
                    <div className="w-full bg-[#1E1E1E] border-[#393939] border-solid border p-8 mt-2 rounded">
                        <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Game Stats</h2>
                        <hr />
                        <p className="text-white flex justify-between p-2">Rank: <span>{userInfo.user.rank && userInfo.user.rank}</span></p>
                    </div>
                </div>
                <div className="w-full h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Played Matches</h2>
                    <hr />
                    <p className = "text-white hover:bg-[#616161] text-center p-2 flex justify-between">No Data </p>
                    {/* fetchMatches */}
                </div>
                <div className="w-full h-fit m-4 border-[#393939] border-solid border bg-[#1E1E1E] p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Friends <span>more</span></h2>
                    <hr />
                    {userInfo.user.names && userInfo.user.names.slice(0, 5).map((obj: Friends, index: number) => (
                        <p key={index} className="text-white hover:bg-[#616161] text-center p-2 flex justify-between"><img className="w-[2em]" src={avatar}></img> <Link className="hover:bg-[#1E81B0] p-2" to= {`/transcendence/user/profile/${obj.id}`}>{obj.name}</Link></p>
                    ))}
                    <p className = "text-white text-center p-2 flex justify-between hover:bg-[#616161]">{ userInfo.user.names && userInfo.user.names.length === 0 && "No Data"} </p>
                </div>
            </div>
            <Footer/>
        </div>
        <Background />
        </>
    );
}
export default Profile;