import React, { FC, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Props {
    userId?: string;
};



const ActiveChallenges: FC<Props> = ({userId}) => {
    const [matches, setMatches] = useState<Array<Object>>();
    const getMatches = async () => {
        try {
            const response = await axios.get(`${process.env.BACK_URL}/transcendence/user${userId}/matches`, {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                }});
            console.log(response);
            setMatches(response.data);
        } catch (error:any) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMatches();
      }, []);

    return (<div className="w-2/6 rounded-2">
      <h2 className="flex items-center justify-center text-xl h-12 bg-gray-800 mr-2 ml-2 border-b border-white rounded-md">Active Challenges</h2>
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

export default ActiveChallenges;
