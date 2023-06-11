import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { FORM_ERROR } from 'final-form';
import FormLogin from "./Form/formLogin";
import Login from "./Login"
import Background from "./Background";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserInfo, getUserInfo, loginRequest, loginFailure, getUserById, getAvatar } from './Slices/userSlice';
import { useState } from "react";
import Form2fa from "./Form/Form2fa";
import Signmenu from "./Signmenu";

interface Data {
    login: string;
    password: string;
}
interface tfa {
    login: string;
    password: string;
    tfa: string;
}
const SignIn = ({notify}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const userInfo = useSelector(selectUser); 
    useEffect(() => {
        if (userInfo && userInfo.user != null && !userInfo.user.isUnAuth) {
            
            navigate("/transcendence/user/profile");
        }
    }, []);
    const onsubmit = async (data: Data) => {
        dispatch(loginRequest());
        const sendData = {
            username: data.login,
          password: data.password,
        };
        try {
            const response = await axios
                .post(`${process.env.BACK_URL}/transcendence/auth/signin/local`, sendData)
                const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            if (!refreshToken) {
                return { [FORM_ERROR]: "Something is wrong" }
            }
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            const userInfo = await getUserInfo(navigate, dispatch);
            dispatch(setUserInfo(userInfo));
            navigate("/transcendence/user/profile");
        }
        catch (error: any) {
            if (error.response.status == 403)
            {
                setIsError(true);
            }
            else
            {
                dispatch(loginFailure(error.response.data.message))
                    return { [FORM_ERROR]: error.response.data.message }
            }
        }
    }
    const submit2fa = async (data)=>{
        dispatch(loginRequest());
        const sendData = {
username: data.login,
          password: data.password,
          TFA: data.tfa,
        };
        try {
            const response = await axios
                .post(`${process.env.BACK_URL}/transcendence/auth/signin/2FA`, sendData)
                const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            if (!refreshToken) {
                return { [FORM_ERROR]: "Something is wrong" }
            }
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            const userInfo = await getUserInfo(navigate, dispatch);
            dispatch(setUserInfo(userInfo));
            navigate("/transcendence/user/profile");
        }
        catch(error)
        {
            dispatch(loginFailure(error.response.data.message))
                return { [FORM_ERROR]: error.response.data.message }
        }
    }
    return (
        <>
            <Signmenu/>
            {isError ? <Login onSub = {submit2fa} rend = {Form2fa}/> : <Login onSub = {onsubmit} rend = {FormLogin}/>}
            </>
           )
}
export default SignIn;
