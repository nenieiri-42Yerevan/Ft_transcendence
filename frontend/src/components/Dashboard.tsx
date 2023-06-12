import React, { useState } from 'react';
// import Background from "./Background";
import { useNavigate } from "react-router-dom";
import Navigation from "./NavBar";
import search_img from "@SRC_DIR/assets/images/search.png";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches, selectUser, Matches } from './Slices/userSlice';
import { useEffect } from 'react';
import GameHistoryTable from './GameHistoryBoard';
import ActiveChallenges from './RequestsBoard';

const Dashboard = () => {
    
    const userInfo = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [matches, setMatches] = useState(null);
    useEffect(() => {
        if (!userInfo.user) {
            navigate("/transcendence/user/signin");
        } else {
            if (matches == null) {
            fetchMatches(1, navigate, dispatch, userInfo.user)
            .then((data?: Matches[]) => {
                setMatches(data);})
            .catch(error => console.log(error));
            }
        }
    }, []);
      return (
        <>
            <Navigation />
            <div className=" bg-[#262525] py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-dark-blue min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl">
                <div className='flex w-full'>
                <GameHistoryTable matches={matches} />
                <ActiveChallenges userInfo={userInfo} />
                </div>
            </div>
        </>
    );
}



export default Dashboard;
