import React from "react";
import avatar from "@SRC_DIR/assets/images/avatar.png";
import { block, follow } from "../Slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import pong from "@SRC_DIR/assets/images/pong.png";

const UserHeader = (props)=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
    <div className="w-full m-4 rounded">
        <div className="bg-[#1E1E1E] border-[#393939] border-solid border w-full flex flex-col p-5 items-center">
            <img src={props.loaded ? (props.photo ? props.photo : avatar) : null} className="rounded-full w-32 h-32 object-cover" />
            <div className="mt-1">
                <h1 className="font-bold text-4xl text-white">{props.userInfo && props.userInfo.first_name && props.userInfo.first_name} <span>{props.userInfo && props.userInfo.last_name && props.userInfo.last_name}</span></h1>
                <p className="text-white">{props.userInfo && props.userInfo.username && props.userInfo.username}</p>
                <p><button onClick = {()=>follow(dispatch, navigate, props.current.user, props.id)} className="bg-[#1e81b0] p-1 m-2 w-40">{props.current.user.follows.includes(Number(props.id)) ? "Unfollow" : "follow"}</button></p>
                <p><button onClick = {()=>block(dispatch, navigate, props.current.user, props.id)} className="bg-red-600 p-1 m-2 w-40">{props.current.user.blocked.includes(Number(props.id)) ? "Unblock" : "Block"}</button></p>
            </div>
        </div>
        <div className="w-full bg-[#1E1E1E] border-[#393939] border-solid border p-8 mt-2 rounded">
            <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className = "w-[2em]" src = {pong}></img>Game Stats</h2>
            <hr />
            <p className="text-white flex justify-between p-2">Rank: <span>{props.userInfo && props.userInfo.rank && props.userInfo.rank}</span></p>
        </div>
    </div>
    );

}

export default UserHeader;