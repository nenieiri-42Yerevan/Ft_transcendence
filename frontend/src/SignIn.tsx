import React from "react";
import { Form, Field } from "react-final-form";
import TextInput from "./Form/inputs/TextInput";
import PasswordInput from "./Form/inputs/PasswordInput";
import axios from "axios";
import { FORM_ERROR } from 'final-form';
import FormLogin from "Form/formLogin";
import Background from "./background";


interface Data {
    login: string;
    password: string;
}
const SignIn = () => {
    const onsubmit = async (data: Data) => {
        const sendData = {
            username: data.login,
            password: data.password,
        };
    try {
            const response = await axios
            .post('http://127.0.0.1:7000/transcendence/auth/signin/local', sendData)
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            console.log(response);
             if (!accessToken || !refreshToken) {
                return { [FORM_ERROR]: "Something is wrong" }
            }
            sessionStorage.setItem("access_token", accessToken);
            sessionStorage.setItem("refresh_token", refreshToken);
            await getUserInfo();
        }
    catch (error: any) {
        console.log(error);
        console.log(error.response.data.message);
        return { [FORM_ERROR]: error.response.data.message }
    
        }
    }
    const getUserInfo = async () => {
        try {
          const response = await axios.get('http://localhost:7000/transcendence/user?getuser', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
            }
          });
          console.log(response.data); // Here you can log or handle the user information
        } catch (error) {
          console.log(error);
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
        <Background/>
        </>
    )
}
export default SignIn;