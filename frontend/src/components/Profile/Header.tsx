import React, { useState, useEffect } from "react"
import avatar from "@SRC_DIR/assets/images/avatar.png"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchFriendsData, fetchMatches, selectUser, Friends, getAvatar, setAvatar, enable2fa, getUserById } from '../Slices/userSlice';
import pong from "@SRC_DIR/assets/images/pong.png"
import isettings from "@SRC_DIR/assets/images/settings.png"
import iupload from "@SRC_DIR/assets/images/upload.png"

const Header = (props)=>{
    const navigate = useNavigate();
    const [rank, setRank] = useState(0);
    const {userInfo} = props;
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState<File | null>(null);
    
    useEffect(() => {
        if (userInfo && !userInfo.user)
            navigate("/transcendence/user/signin");
        else {
           getUserById(userInfo.user.id, navigate, dispatch)
           .then(info=>{
            setRank(info.rank);
           })
        }
    }, []);

    return (<div className="w-full  md:w-1/4 my-1 rounded mx-4 ">
    <div className="bg-[#1E1E1E] w-full border-[#393939] border-solid border flex flex-col p-5  justify-center items-center text-center">
        <img src={props.loaded ? (props.userInfo.user.img ? props.userInfo.user.img : avatar) : null } className="rounded-full w-32 h-32" />
        <div className="mt-1">
            <h1 className="font-bold text-4xl text-white">{props.userInfo.user.name && props.userInfo.user.name} <span>{props.userInfo.user.lastName && props.userInfo.user.lastName}</span></h1>
            <p className="text-white mb-8">{props.userInfo.user.username && props.userInfo.user.username} {<span >&#127760;</span>}</p>
            <input className="text-white p-1 my-2 w-40 " id="profile-image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files && e.target.files[0])} />
            <p><button className="bg-[#1e81b0] p-1 my-2 w-40 flex justify-around text-white" onClick={async ()=>{imageFile && await setAvatar(imageFile, navigate, props.userInfo.user.id, dispatch); imageFile &&  getAvatar(0, navigate, dispatch, props.userInfo.user.id);}}>Upload  <img src={iupload} alt="" className = "w-7"/></button></p>
            <Link to="/transcendence/user/profile/settings" className="bg-[#1e81b0] p-1 my-2 w-40 text-center text-white flex justify-around">Settings <img src={isettings} alt="" className = "w-7"/></Link>
        </div>
    </div>
    <div className="w-full bg-[#1E1E1E] border-[#393939] border-solid border p-8 mt-2 rounded">
        <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Game Stats</h2>
        <hr />
        <p className="text-white flex justify-between p-2">Rank: <span>{rank}</span></p>
    </div>
</div>);
}

export default Header;

