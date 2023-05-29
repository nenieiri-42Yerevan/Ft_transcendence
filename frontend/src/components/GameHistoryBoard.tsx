import React, { useState } from "react";
import { getAvatar } from "./Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const GameHistoryTable = ({matches}) => {
    const [winner, setWinner] = useState(null);
    const [loser, setLoser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (<div className="w-2/6 rounded-2">
      <h2 className="flex items-center justify-center text-xl h-12 bg-gray-800 mr-2 ml-2 border-b border-white rounded-md">Game History</h2>
       {matches == null ? (  
        <p className="flex items-center justify-center text-xl h-12 bg-gray-800 mr-2 ml-2 rounded-md">No data</p>
         ) : (
         matches.slice(0,10).map(match => {
            getAvatar(1, navigate, dispatch, match.winner.id).then(avatar => setWinner(avatar));
            getAvatar(1, navigate, dispatch, match.loser.id).then(avatar => setLoser(avatar));

          return ( <div key={match.id} className="flex flex-row justify-between">
             <img src={winner} alt={match.winner.username} className="w-8 h-8 rounded-full mr-2"/>
             <span>{match.winner.username}</span>
             <span>{Math.max(match.score[0], match.score[1])} : {Math.min(match.score[0], match.score[1])}</span>
             <span>{match.loser.username}</span>
             <img src={loser} alt={match.loser.username} className="w-8 h-8 rounded-full mr-2"/>
           </div>);
         }
         ))} 
    </div>);
     
}

export default GameHistoryTable;
