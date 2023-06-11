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
import {fetchFriendsData , getUserById, Friends, selectUser, getAvatar, fetchMatches, Matches} from '../Slices/userSlice';
import Footer from "./Footer";
import Profile from "./Profile";
import FriendsList from "./FriendsList";
import UserHeader from "./UserHeader";
import Notfound from "../Notfound";
import GameHistoryTable from "../GameHistoryBoard";
import { io } from 'socket.io-client';

const UserProfile = ({chatSocket, gameSocket, notify}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [friends, setFriends] = useState<Friends[]>([]);
    const current = useSelector(selectUser);
    const [photo, setphoto] = useState<string>('');
    const [loaded, setloaded] = useState(false);
    const [matches, setMatches] = useState(null);
    useEffect(() => {
        getUserById(id, navigate, dispatch).then(async userInfo => {
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
            if (matches == null) {
                fetchMatches(1, navigate, dispatch, userInfo)
                .then((data?: Matches[]) => {
                    setMatches(data);})
                .catch(error => console.log(error));
            }
        }).catch(error=>{error.response.status == 401 && window.location.reload()});
        setloaded(true);
    }, [id]);
    if (loaded && userInfo == null)
        return (<Notfound/>);;
    if (id == current?.user?.id)
        return (
            <Profile notify = {notify}/>
        );
    return (
        <>
        <div className="flex flex-col bg-[#262525]">
            <Profilmenu notify = {notify}/>
            <div className = "flex md:flex-row flex-col justify-between min-h-screen min-w-full">
                <UserHeader loaded = {loaded} photo = {photo} userInfo = {userInfo} current = {current} id = {id} chatSocket = {chatSocket} gameSocket={gameSocket} notify={notify} />
                <GameHistoryTable matches={matches} />
                <div className="w-full md:w-1/4 h-fit m-1 mx-4 bg-[#1E1E1E] border-[#393939] border-solid border p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Friends</h2>
                    <hr />
                    {friends  && friends.map((obj: Friends, index: number) => (
                        <FriendsList index = {index} obj = {obj} key = {index}/>
                    ))}
                    <p className = "text-white text-center p-5   font-bold  hover:bg-[#616161]">{ friends && friends.length === 0 && "No Data"} </p>
                </div>
            </div>
            <Footer/>
        </div>
        </>
    ); 
}
export default UserProfile;
