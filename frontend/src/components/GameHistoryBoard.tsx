import React, { FC, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Props {
  userInfo?: object;
};



const GameHistoryTable: FC<Props> = ({userInfo}) => {
    const [matches, setMatches] = useState<Array<Object>>();
    

    return (<div className="w-2/6 rounded-2">
      <h2 className="flex items-center justify-center text-xl h-12 bg-gray-800 mr-2 ml-2 border-b border-white rounded-md">Game History</h2>
       {/* {matches?.length === 0 ? (  */}
        <p className="flex items-center justify-center text-xl h-12 bg-gray-800 mr-2 ml-2 rounded-md">No data</p>
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

export default GameHistoryTable;
