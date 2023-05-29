import React, { useState, useEffect } from "react";
import { getAvatar } from "./Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
            console.log(distinctPlayers);
            distinctPlayers.forEach(id => {
                getAvatar(1, navigate, dispatch, id).then(avatar =>
                setAvatars(prevState => ({ ...prevState, [id]: avatar })));
            });
        }
    },[setAvatars, matches]);
    return (<div className="w-2/6 rounded-2">
      <h2 className="flex items-center justify-center text-xl h-12 bg-gray-800 mr-2 ml-2 border-b border-white rounded-md">Game History</h2>
       {matches == null ? (  
        <p className="flex items-center justify-center text-xl h-12 bg-gray-800 mr-2 ml-2 rounded-md">No data</p>
         ) : (
         matches.slice(0, 10).map(match => {
          return ( <div key={match.id} className="flex flex-row h-12 justify-between items-center text-2xl mr-2 ml-2 bg-gray-800 border-b border-white rounded-md">
             <button onClick={() => navigate(`/transcendence/user/profile/${match.winner.id}`)}>
                <img src={avatars[match.winner.id]} alt={match.winner.username} className="w-8 h-8 rounded-full ml-2"  />
             </ button>
             <span className="text-green-700">Winner</span>
             <span>{Math.max(match.score[0], match.score[1])} : {Math.min(match.score[0], match.score[1])}</span>
             <span className="text-red-700">Loser</span>
             <button onClick={() => navigate(`/transcendence/user/profile/${match.loser.id}`)} >
             <img src={avatars[match.loser.id]} alt={match.loser.username} className="w-8 h-8 rounded-full mr-2"/>
             </button>
           </div>);
         }
         ))} 
    </div>);
     
}

export default GameHistoryTable;
