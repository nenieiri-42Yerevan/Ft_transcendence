import React, { useState, useEffect} from "react";
import { getAvatar } from "./Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import pong from "@SRC_DIR/assets/images/pong.png";
import axios from "axios";
const ActiveChallenges = ({userInfo}) => {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.BACK_URL}/transcendence/user/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    ).then(
    users => { 
        setLeaders(users.data
    .map(user=> ({score:user.rank, username:user.username}))
    .sort((b, a) => a.score - b.score)
    .slice(0,10))
    })
    .catch();

        },[]);
    
    return (
    <div className="w-full md:w-3/6 h-fit bg-[#1E1E1E] border-[#393939] m-1 border-solid border p-8 rounded text-center">
      <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Leader Board</h2>
      <hr />
      <br />
        {leaders?.length === 0 ? (  
        <p className="text-2xl mb-2 font-bold">No data</p>
        ) : (
        leaders.map((match, index) => (
          <div key={index} className="flex w-full h-15 justify-between p-2 m-2 items-center">
            <span className="mr-2">{match.username}</span>
            <span>{match.score}</span>
          </div>
        ))
      )} 
    </div>);
     
}

export default ActiveChallenges;
