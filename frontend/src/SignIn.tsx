import React from "react";
import logo from "./assets/images/logo.png"
import { Form, Field } from "react-final-form";
import TextInput from "./inputs/TextInput";
import PasswordInput from "./inputs/PasswordInput";

const SignIn = () => {
    
    return (
        <div className="backdrop-blur-md p-0 lg:p-12 xl:p-16 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-between bg-clip-padding">
            <div className="pt-20 px-10 justify-self-start hidden sm:hidden lg:flex  lg:justify-center xl:flex xl:justify-center " >
                <img className="h-full w-full" src={logo} alt="" />
            </div>
            <div className="flex  justify-center items-center forms min-w-full min-h-screen lg:min-w-fit lg:min-h-fit">
                <Form
                    onSubmit={()=>{}}
                >
                    {({ handleSubmit, form, submitting, pristine, values, errors }) => (
                        <form className="flex flex-col justify-around backdrop-blur-md bg-[#9e9c9c33] outline-none border-[#ffffff1a] bg-clip-padding shadow-md shadow-[#2e364408]  min-w-full min-h-screen lg:min-w-fit lg:min-h-fit box-border rounded-none lg:rounded-3xl xl:rounded-3xl m-0 lg:ml-10 xl:ml-10  p-12 px-12 text-white">
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
                        </form>
                    )}
                </Form>
            </div>
        </div> )
}
export default SignIn;