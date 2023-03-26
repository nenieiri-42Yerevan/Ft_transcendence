import Background from "./Background";
import avatar from "./assets/images/avatar.png"
import pong from "./assets/images/pong.png"
import { Link } from "react-router-dom";
import Profilmenu from './profilemenu';
import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {selectUser, setFriends} from './Slices/userSlice';

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
        const fetchFriendsData = async () => {
          const friendIds = userInfo.follows;
          const friendNames:string[] = [];
          for (const id of friendIds) {
            try {
              const response = await axios.get(`http://localhost:7000/transcendence/user/by-id/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                  }
              });
              friendNames.push(response.data.username);
            } catch (error) {
              console.log(error);
            }
          }
          dispatch(setFriends(friendNames));
        };
        fetchFriendsData();
      }, []);
      return (
        <>
            <Profilmenu/>
            <div className = "flex flex-row justify-between backdrop-blur-md min-h-full min-w-full bg-black/50 z-[668] absolute">
                <div className="w-full m-4 rounded">
                    <div className="bg-[#1E1E1E] w-full flex flex-col p-5 items-center">
                        <img src={avatar} alt="Profile" className="rounded-full w-32 h-32 object-cover" />
                        <div className="mt-1">
                            <h1 className="font-bold text-4xl text-white">John Doe</h1>
                            <p className="text-white">Player ID: 123456</p>
                        </div>
                    </div>
                    <div className="w-full bg-[#1E1E1E] p-8 mt-2 rounded">
                        <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Game Stats</h2>
                        <hr />
                        <p className="text-white flex justify-between p-2">Rank: <span>1</span></p>
                        <p className="text-white flex justify-between p-2">Games Played: <span>1</span></p>
                        <p className="text-white flex justify-between p-2">Win Rate: <span>1</span></p>
                    </div>
                </div>
                <div className="w-full h-fit bg-[#1E1E1E] m-4 p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Played Matches</h2>
                    <hr />
                    <p className="text-white flex justify-between p-2">you win against: <span>1</span></p>
                    <p className="text-white flex justify-between p-2">You lost against: <span>1</span></p>
                    <p className="text-white flex justify-between p-2">you Win against: <span>1</span></p>
                        {/* {playedMatches.map((match, index) => (
                        <div key={index} className="flex justify-between items-center border-b py-4">
                            <p className="text-lg">{match.opponent}</p>
                            <p className={`text-lg ${match.result === 'win' ? 'text-green-500' : 'text-red-500'}`}>{match.result}</p>
                        </div>
                        ))} */}
                </div>
                <div className="w-full h-fit m-4 bg-[#1E1E1E] p-8 rounded">
                    <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Friends <span>more</span></h2>
                    <hr />
                    <p className="text-white text-center p-2">arastepa</p>
                    <p className="text-white text-center p-2">arastepa</p>
                    <p className="text-white text-center p-2">arastepa</p>
                    {/* {friends.map((friend, index) => (
                    <div key={index} className="flex justify-between items-center border-b py-4">
                        <p className="text-lg">{friend.name}</p>
                        <p className={`text-lg ${friend.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>{friend.status}</p>
                    </div>
                    ))} */}
                </div>
            </div>
        <Background/>
        </>
    ); 
}
export default Profile;