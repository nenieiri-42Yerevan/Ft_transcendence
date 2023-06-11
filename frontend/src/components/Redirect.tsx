import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Background from './Background';
import Cookies from 'js-cookie';
import { getUserInfo, setUserInfo } from './Slices/userSlice';


const Redirect = ({notify}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [iserror, setIserror] = useState(false);
    useEffect(() => {
        const redir = async()=>{
            localStorage.setItem('access_token', Cookies.get('access_token'));
            localStorage.setItem('refresh_token', Cookies.get('refresh_token'));
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            Cookies.remove('username');
            const info = await getUserInfo(navigate, dispatch);
            dispatch(setUserInfo(info));
            if (Cookies.get('first_login') == 'true')
            {
                Cookies.remove('first_login');
                navigate("/transcendence/user/profile/settings");
            }
            else
                navigate("/transcendence/user/profile");

        }
        redir();
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
