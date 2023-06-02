import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Background from './Background';
import Cookies from 'js-cookie';
import { getUserInfo, setUserInfo } from './Slices/userSlice';


const Redirect = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [iserror, setIserror] = useState(false);
    useEffect(() => {
        console.log(Cookies.get());
        localStorage.setItem('access_token', Cookies.get('access_token'));
        localStorage.setItem('refresh_token', Cookies.get('refresh_token'));
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('username');
		console.log(localStorage.getItem('access_token'));
		console.log(localStorage.getItem('refresh_token'));
        getUserInfo(navigate).then(userInfo=>{
            console.log("getuserinfo ", userInfo);
            dispatch(setUserInfo(userInfo));
        })
        .catch(error=>{
            setIserror(true);
        })
        navigate("/transcendence/user/profile");
    }, []);
    return (
        <>
            <div className="flex flex-col bg-[#121212] ">
                <div>
                    
                </div>
            </div>
        </>
    );


}

export default Redirect;
