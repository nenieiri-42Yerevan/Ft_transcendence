import React, { useState, useEffect } from "react";
import { getAvatar } from "./Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import pong from "@SRC_DIR/assets/images/pong.png";

const GameHistoryTable = ({matches}) => {
    const [winner, setWinner] = useState(null);
    const [loser, setLoser] = useState(null);
    const [avatars, setAvatars] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (matches != null) {
           const distinctPlayers = matches.reduce((acc, match) => {
                    acc.add(match.winner.id);
                    acc.add(match.loser.id);
                    return acc;
                    }, new Set());     
            distinctPlayers.forEach(id => {
                getAvatar(1, navigate, dispatch, id).then(avatar =>
                setAvatars(prevState => ({ ...prevState, [id]: avatar })));
            });
        }
    },[setAvatars, matches]);
    return (<div className=" w-full md:w-3/6 h-fit bg-[#1E1E1E] m-1 border-[#393939] border-solid border p-8 rounded text-center">
      <h2 className="font-bold text-2xl text-white text-center  flex justify-between"><img className="w-[2em]" src={pong}></img>Played Matches</h2>
      <hr />
      <br />
       {matches == null || matches.length == 0 ? (  
        <p className="text-xl mb-2 font-bold text-white">No data</p>
         ) : (
         matches.slice(0, 10).map(match => {
          return ( <div key={match.id} className="flex flex-row h-12 justify-between items-center text-2xl mr-2 ml-2 mb-1 border-b border-white ">
             <button onClick={() => navigate(`/transcendence/user/profile/${match.winner.id}`)}>
                <img src={avatars[match.winner.id]} alt={match.winner.username} className="w-8 h-8 rounded-full ml-2"  />
             </ button>
             <span className="text-green-700 truncate">{match.winner.username}</span>
             <span className="transform">{`${Math.max(match.score[0], match.score[1])} : ${Math.min(match.score[0], match.score[1])}`}</span>
             <span className="text-red-700 truncate">{match.loser.username}</span>
             <button onClick={() => navigate(`/transcendence/user/profile/${match.loser.id}`)} >
             <img src={avatars[match.loser.id]} alt={match.loser.username} className="w-8 h-8 rounded-full mr-2"/>
             </button>
           </div>);
         }
         ))} 
    </div>);
     
}

export default GameHistoryTable;
