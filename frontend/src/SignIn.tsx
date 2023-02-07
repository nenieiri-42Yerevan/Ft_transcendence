import React from "react";
import logo from "./assets/images/logo.png"
import { Form, Field } from "react-final-form";
import TextInput from "./inputs/TextInput";
import PasswordInput from "./inputs/PasswordInput";
import axios from "axios";
import Background from "./background";
import { useState } from 'react';


interface Data {
    login: string;
    password: string;
}
const SignIn = () => {
    const [error, setError] = useState(""); // added state to store error message

    const onsubmit = (data: Data) => {
        const sendData = {
            username: data.login,
            password: data.password,
        };
        axios.post('http://localhost:7000/transcendence/auth/signin/local', sendData)
        .then(function (response) {
            const accessToken = response.data.access_token;
             if (!accessToken) {
               setError("Something is wrong"); // added error message if no access token received
               return;
            }
            sessionStorage.setItem("access_token", accessToken);
            console.log(response);
        })
        .catch(function (error) {
            setError("Wrong Login or Password"); // added error message on axios error
        });
        
    }
    return (
        <>
        <div className="backdrop-blur-md p-0 lg:px-4 xl:px-16 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-between bg-clip-padding">
            <div className="h-screen ml-64 items-center text-lg md:text-2xl pt-10 justify-center hidden sm:hidden lg:flex  lg:justify-center xl:flex xl:justify-center " >
                <p className="text-3xl md:text-5xl text-center">enjoy the <b className="text-red-900">Game</b></p>
            </div>
            <div className="flex  justify-center items-center forms min-w-full min-h-screen lg:min-w-fit lg:min-h-fit">
                <Form
                    onSubmit={onsubmit}
                    >
                    {({ handleSubmit, form, submitting, pristine, values, errors }) => (
                        <form onSubmit={handleSubmit} id="signin-form" className="flex flex-col justify-around backdrop-blur-md bg-[#9e9c9c33] outline-none border-[#ffffff1a] bg-clip-padding shadow-md shadow-[#2e364408]  min-w-full min-h-screen lg:min-w-fit lg:min-h-fit box-border rounded-none lg:rounded-3xl xl:rounded-3xl m-0 lg:ml-10 xl:ml-10  p-12 px-12 text-white">
                            {error && <div className="text-red-600">{error}</div>} {/* added error message display */}
                            <Field<string>
                                name="login"
                                placeholder="login"
                                id="signlogin"
                                key={"login"} >
                                    {({ input, meta, ...rest }) => (
                                            <div className="mt-1 lg:mt-4 xl:mt-6">
                                                <label htmlFor="signlogin" className="font-bold">Login: </label>
                                                {
                                                    // (meta.error && meta.touched) ?
                                                    // <TextInput input={input} className=" rounded-md bg-[#2d2727] outline-red-900 mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3" meta={meta} {...rest} />
                                                    // :
                                                    <TextInput input={input} className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3" meta={meta} {...rest} />
                                                }
                                            </div>
                                        )}
                            </Field>
                            <Field<string>
                                name="password"
                                placeholder="password"
                                id="signlpsw"
                                key={"password"} >
                                    {({ input, meta, ...rest }) => (
                                            <div className="mt-1 lg:mt-4 xl:mt-6">
                                                <label htmlFor="signlogin" className="font-bold">Login: </label>
                                                {
                                                    // (meta.error && meta.touched) ?
                                                    // <TextInput input={input} className=" rounded-md bg-[#2d2727] outline-red-900 mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3" meta={meta} {...rest} />
                                                    // :
                                                    <PasswordInput input={input} className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3" meta={meta} {...rest} />
                                                }
                                            </div>
                                        )}
                            </Field>
                            <div className="mt-1 md:mt-20  xl:mt-10 text-red-900 font-bold flex justify-center">
                                <button form="signin-form" type="submit" className="py-1 lg:py-2 px-8 rounded-md bg-[#2d2727] outline-[#2d2727] outline-none  hover:bg-red-50">Sign In</button>
                            </div>
                        </form>
                    )}
                </Form>
            </div>
        </div> 
        <Background />
    </>
    )
}
export default SignIn;