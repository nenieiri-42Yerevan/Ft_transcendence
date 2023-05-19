import React from 'react'
import Signmenu from './Signmenu';
import Login from './Login';
import Form2fa from './Form/Form2fa';
import { selectUser } from './Slices/userSlice';
import Form2fa42 from './Form/Form2fa42';
import Cookies from 'js-cookie';
import axios from 'axios';
import { FORM_ERROR } from 'final-form';


const Tfa_42 = () => {
    const submit42 = async (data) => {
        const sendData = {
            TFA: data.tfa,
            username: Cookies.get('username')
        }
        try {
            console.log(data);
            await axios.post(`${process.env.BACK_URL}/transcendence/auth/signin/2FA_42`, sendData);
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
