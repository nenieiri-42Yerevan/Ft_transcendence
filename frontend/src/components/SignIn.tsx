import React from "react";
import { Form, Field } from "react-final-form";
import axios from "axios";
import { FORM_ERROR } from 'final-form';
import FormLogin from "./Form/formLogin";
import Background from "./Background";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserInfo, getUserInfo, loginRequest, loginFailure, getUserById } from './Slices/userSlice';

interface Data {
    login: string;
    password: string;
}
const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            sessionStorage.setItem("access_token", accessToken);
            sessionStorage.setItem("refresh_token", refreshToken);
            const userInfo = await getUserInfo();
            dispatch(setUserInfo(userInfo));
            navigate("/transcendence/user/profile");
        }
        catch (error: any) {
            dispatch(loginFailure(error.response.data.message))
            return { [FORM_ERROR]: error.response.data.message }
        }
    }
    return (
        <>
            <div className="backdrop-blur-md p-0 flex-row lg:px-4 xl:px-16 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-between bg-clip-padding">
                <div className="h-screen ml-64 items-center text-lg md:text-2xl pt-10 justify-center hidden sm:hidden lg:flex  lg:justify-center xl:flex xl:justify-center " >
                    <p className="text-3xl md:text-5xl text-center">enjoy the <b className="text-red-900">Game</b></p>
                </div>
                <div className="flex flex-col justify-center items-center forms min-w-full min-h-screen lg:min-w-fit lg:min-h-fit">
                    <Form
                        onSubmit={onsubmit}
                        render={FormLogin}
                    >
                    </Form>
                </div>
            </div>
            <Background />
        </>
    )
}
export default SignIn;