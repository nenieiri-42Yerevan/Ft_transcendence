import React, { FC, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchFriendsData, fetchMatches, selectUser, Friends, getAvatar, setAvatar } from './Slices/userSlice';


interface Props {
  userInfo?: object;
};



const LeaderBoard: FC<Props> = ({userInfo}) => {

    return (<div className=" w-full md:w-1/6 h-fit bg-[#1E1E1E] m-1 border-[#393939] border-solid border p-8 rounded text-center">
      <h2 className="text-2xl mb-2 font-bold">Leaderboard</h2>
       {/* {matches?.length === 0 ? (  */}
        <p className="text-2xl mb-2 font-bold">No data</p>
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
