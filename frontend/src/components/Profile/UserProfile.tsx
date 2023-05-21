import React from "react";
import Background from "../Background";
import avatar from "@SRC_DIR/assets/images/avatar.png"
import pong from "@SRC_DIR/assets/images/pong.png"
import { Link, useParams } from "react-router-dom";
import Profilmenu from './Profilemenu';
import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {fetchFriendsData , fetchMatches, block, follow, getUserById, Friends, selectUser, getAvatar} from '../Slices/userSlice';
import Footer from "./Footer";
import Profile from "./Profile";
import FriendsList from "./FriendsList";
import UserHeader from "./UserHeader";

const UserProfile = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [friends, setFriends] = useState<Friends[]>([]);
    const current = useSelector(selectUser);
    const [photo, setphoto] = useState<string>('');
    const [loaded, setloaded] = useState(false);
    useEffect(() => {
        console.log(id);
        getUserById(id, navigate).then(async userInfo => {
            setUserInfo(userInfo);
            const friends = await fetchFriendsData(1, navigate, dispatch, userInfo);
            if (friends)
            setFriends(friends);
            // await fetchMatches(1, dispatch, userInfo);
            const photo = await getAvatar(1, navigate, dispatch, id);
            if (photo)
            {
                setphoto(photo);
            }
        }).catch(error=>{});
        setloaded(true);
    }, [id]);
    if (loaded && userInfo == null)
        return (<h1>User Not Found</h1>);
    if (id == current?.user?.id)
        return (
            <Profile/>
        );
    return (
        <>
        <div className="flex flex-col bg-[#262525]">
            <Profilmenu/>
            <div className = "flex md:flex-row flex-col justify-between min-h-screen min-w-full">
                <UserHeader loaded = {loaded} photo = {photo} userInfo = {userInfo} current = {current} id = {id}/>
                <div className="w-full h-fit bg-[#1E1E1E] border-[#393939] border-solid border m-4 p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Played Matches</h2>
                    <hr />
                    <p className = "text-white hover:bg-[#616161] text-center p-2 flex justify-between">No Data </p>
                    {/* fetchMatches */}
                </div>
                <div className="w-full h-fit m-4 bg-[#1E1E1E] border-[#393939] border-solid border p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Friends <span>more</span></h2>
                    <hr />
                    {friends  && friends.slice(0, 5).map((obj: Friends, index: number) => (
                        <FriendsList index = {index} obj = {obj} key = {index}/>
                    ))}
                    <p className = "text-white text-center p-2 flex justify-between hover:bg-[#616161]">{ friends && friends.length === 0 && "No Data"} </p>
                </div>
            </div>
            <Footer/>
        </div>
        </>
    ); 
}
export default UserProfile;