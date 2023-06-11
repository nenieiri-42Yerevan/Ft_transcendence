import React from 'react'
import Signmenu from './Signmenu';
import Login from './Login';
import Form2fa from './Form/Form2fa';
import { getUserInfo, selectUser, setUserInfo } from './Slices/userSlice';
import Form2fa42 from './Form/Form2fa42';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FORM_ERROR } from 'final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Tfa_42 = ({notify}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit42 = async (data) => {
        const sendData = {
            TFA: data.tfa,
            username: Cookies.get('username')
        }
        try {
            console.log(data);
            const response = await axios.post(`${process.env.BACK_URL}/transcendence/auth/signin/2FA_42`, sendData);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            const userInfo = await getUserInfo(navigate, dispatch);
            dispatch(setUserInfo(userInfo));
            Cookies.remove('username');
            navigate("/transcendence/user/profile");
            // console.log("TFA42 ", response);
        }
        catch (error) {
            return { [FORM_ERROR]: error.response.data.message };
        }
    }
    return (
        <>
            <Signmenu />
            <Login onSub={submit42} rend={Form2fa42} />
        </>
    );
}

export default Tfa_42;
