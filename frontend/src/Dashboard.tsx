import React, { useState } from 'react';
import Background from "./background";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./components/NavBar";
import search_img from "./assets/images/search.png";
import axios from "axios";
import { useEffect } from 'react';
import refreshToken from 'Utils/refreshToken';


const Dashboard = () => {
    const [UserName, setName] = useState<string | undefined>('');
    const [UserId, setId] = useState('');
    const [AvatarUrl, setAvatar] = useState<string | undefined>();
    const Navigate = useNavigate();

    console.log(`access tkn: ${sessionStorage.getItem("access_token")}`);
    console.log(`refresh tkn: ${sessionStorage.getItem("refresh_token")}`);
    
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:7000/transcendence/user?getuser', {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
                }});
            console.log(response);
            setName(response.data[0].username);
            setId(response.data[0].id);
        } catch (error:any) {
            console.log(error);
            if ((await refreshToken()) != 200) {
                Navigate("/transcendence/user/signin");
            } else {
                getUser();
            }
        }
    }
/*
    const getAvatar = async (UserId:string) => {
        try {
            const Avatar = await axios.get(`http://localhost:7000/transcendence/user${UserId}/avatar`);
            console.log(Avatar);
            setAvatar(Avatar.data);
        } catch (error:any) {
            console.log(error);
        }
    }
*/
    //refreshToken(Navigate);
    useEffect(() => {
        getUser();
      }, []);
      console.log(`UserName : ${UserName}`);
      console.log(`Avatar : ${AvatarUrl}`);

      return (
        <>
            <Navigation activeTab={'Dashboard'} userName={UserName} avatarUrl={AvatarUrl}/>
            <div className="  py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-center space-between bg-clip-padding text-white text-2xl">
                <div className='flex w-full'>
                <div className='flex w-1/6'> 
                    <form className='flex items-start'>
                        <input className="w-3/4 mr-2 rounded text-black"type="text" />
                        <button type="submit"><img className="h-7 w-7" src={search_img} /></button>
                    </form>
                </div>
                <div className="flex-column w-2/6">Game History</div>
                <div className="flex w-2/6">Ere</div>
                <div className="flex w-1/6">van</div>
                </div>
            </div>

        </>
    );
}



export default Dashboard;