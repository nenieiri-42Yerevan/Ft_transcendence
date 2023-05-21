import React from "react";
import { Form, Field } from "react-final-form";
import FormLogin from "./Form/formLogin";
import Background from "./Background";

const Login = (props)=>{ 
    return (
        <>
            <div className="bg-[#262525] p-0 flex-row lg:px-4 xl:px-16 flex justify-between">
                <div className="h-screen ml-64 items-center text-lg md:text-2xl pt-10 justify-center hidden sm:hidden lg:flex  lg:justify-center xl:flex xl:justify-center " >
                    <p className="text-3xl md:text-5xl text-center">enjoy the <b className="text-red-900">Game</b></p>
                </div>
                <div className="flex flex-col justify-center items-center forms min-w-full min-h-screen lg:min-w-fit lg:min-h-fit">
                    <Form
                        onSubmit={props.onSub}
                        render={props.rend}
                    >
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login;