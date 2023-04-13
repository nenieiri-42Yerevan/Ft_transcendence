import React, { FC, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchFriendsData, fetchMatches, selectUser, Friends, getAvatar, setAvatar } from './Slices/userSlice';


interface Props {
  userInfo?: object;
};



const LeaderBoard: FC<Props> = ({userInfo}) => {

    return (<div className="w-1/6 rounded-2">
      <h2 className="flex items-center justify-center text-xl h-12 bg-teal-800 mr-2 ml-2 border-b border-white rounded-md">Leaderboard</h2>
       {/* {matches?.length === 0 ? (  */}
        <p className="flex items-center justify-center text-xl h-12 bg-teal-800 mr-2 ml-2 rounded-md">No data</p>
      {/* //  ) : (
      //   matches?.map(match => (
      //     <div key={match.id} className="flex items-center">
      //       <img src={match.avatar} alt={match.username} className="w-8 h-8 rounded-full mr-2"/>
      //       <span className="mr-2">{match.username}</span>
      //       <span>{match.score}</span>
      //     </div>
      //   ))
      // )} */}
    </div>);
     
}

export default LeaderBoard;
