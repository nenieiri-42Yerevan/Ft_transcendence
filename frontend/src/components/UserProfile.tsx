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
import {fetchFriendsData , fetchMatches, block, follow, getUserById, Friends, selectUser} from './Slices/userSlice';

const UserProfile = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null);
    const [friends, setFriends] = useState(null);
    const current = useSelector(selectUser);
    useEffect(() => {
      console.log(id);
        getUserById(id).then(async userInfo => {
          setUserInfo(userInfo);
          const friends = await fetchFriendsData(1, dispatch, userInfo);
          console.log("lll");
          console.log(friends);
          setFriends(friends);
          // await fetchMatches(1, dispatch, userInfo);
        }).catch(error=>{});
      }, [id]);
      if (userInfo == null)
        return (<h1>User Not Found</h1>);
      return (
        <>
            <Profilmenu/>
            <div className = "flex md:flex-row flex-col justify-between backdrop-blur-md min-h-full min-w-full bg-black/50 z-[668] absolute">
                <div className="w-full m-4 rounded">
                    <div className="bg-[#1E1E1E] border-[#393939] border-solid border w-full flex flex-col p-5 items-center">
                        <img src={avatar} alt="Profile" className="rounded-full w-32 h-32 object-cover" />
                        <div className="mt-1">
                            <h1 className="font-bold text-4xl text-white">{userInfo && userInfo.first_name && userInfo.first_name} <span>{userInfo && userInfo.last_name && userInfo.last_name}</span></h1>
                            <p className="text-white">{userInfo && userInfo.username && userInfo.username}</p>
                            <p><button onClick = {()=>follow(dispatch, current.user, id)} className="bg-[#1e81b0] p-1 m-2 w-40">{current.user.follows.includes(Number(id)) ? "Unfollow" : "follow"}</button></p>
                            <p><button onClick = {()=>block(dispatch, current.user, id)} className="bg-red-600 p-1 m-2 w-40">{current.user.blocked.includes(Number(id)) ? "Unblock" : "Block"}</button></p>
                        </div>
                    </div>
                    <div className="w-full bg-[#1E1E1E] border-[#393939] border-solid border p-8 mt-2 rounded">
                        <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Game Stats</h2>
                        <hr />
                        <p className="text-white flex justify-between p-2">Rank: <span>{userInfo && userInfo.rank && userInfo.rank}</span></p>
                    </div>
                </div>
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
                        <p key={index} className="text-white text-center p-2 flex justify-between hover:bg-[#616161]"><img className="w-[2em]" src={avatar}></img> <Link className="p-2 hover:bg-[#1E81B0]" to= {`/transcendence/user/profile/${obj.id}`}>{obj.name}</Link></p>
                    ))}
                    <p className = "text-white text-center p-2 flex justify-between hover:bg-[#616161]">{ friends && friends.length === 0 && "No Data"} </p>
                </div>
            </div>
        <Background/>
        </>
    ); 
}
export default UserProfile;