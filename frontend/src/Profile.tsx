import Background from "./Background";
import avatar from "./assets/images/avatar.png"
import pong from "./assets/images/pong.png"
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Fields from './Fields'
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
        {/* {location.state.authorized && navigate("/transcendence/user/signin")} */}
            <div className = "flex flex-col justify-center backdrop-blur-md min-h-full min-w-full items-center bg-black/50 z-[668] absolute">
                <div className="flex flex-col justify-center lg:flex-row">
                    <div className="m-6 w-[30em] justify-center bg-[#9e9c9c33] items-center min-w-full lg:min-w-fit h-fit p-8 rounded-md">
                        <div className="flex justify-center">
                            <img src = {avatar} className = " block w-[10em] h-fit"></img>
                        </div>
                        <p className="text-2xl pb-5 text-center">{userInfo.username}</p>
                        <p className=" text-2xl text-center">{userInfo.email}</p>
                        <p className="text-2xl flex justify-between">Rank: <span>{userInfo.rank}</span></p>
                    </div>
                    <div className="m-5 flex w-[30em] flex-col justify-start min-w-full lg:min-w-fit min-h-full p-8 bg-[#9e9c9c33] rounded-md shadow-lg">
                        <div>
                            <p className="text-white font-bold flex justify-between"><img className = "w-[3em]" src = {pong}></img>Friends <span>more</span></p>
                        </div>
                        <hr />
                        <div>
                        {userInfo.names.map((friend:string, index:number) => (
                            <div className="flex flex-row m-1 items-center justify-between" key={index}>
                            <img src={avatar} className="w-[3em] h-fit"></img>
                            <span>{friend}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="m-5">
                    <Link to="/transcendence/user/signin" onClick={removeToken} className="m-3 bg-red-800 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-3 rounded min-w-full md:min-w-[15em] md:mt-20 p-[3em]">
                            Log Out
                    </Link>
                    <Link to="#" className="m-3 md:m-5 text-center bg-[#e4e9ff1a] hover:bg-[#7d7d7d] text-white font-bold py-3 rounded min-w-full md:min-w-[15em] md:mt-20 p-[3em]">
                            Enable 2FA
                    </Link>
                </div>
            </div>
            <Background/>
        </>
    );
    
}
export default Profile;