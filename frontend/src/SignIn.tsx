import React from "react";
import logo from "./assets/images/logo.png"

const SignIn = () => {
    return (
        <div className="backdrop-blur-md p-0 lg:p-12 xl:p-16 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-between bg-clip-padding">
            <div className="pt-20 px-10 justify-self-start hidden sm:hidden lg:flex  lg:justify-center xl:flex xl:justify-center " >
                <img className="h-full w-full" src={logo} alt="" />
            </div>
            <div className="flex  justify-center items-center forms min-w-full min-h-screen lg:min-w-fit lg:min-h-fit">
                <form className="flex flex-col justify-around backdrop-blur-md bg-[#9e9c9c33] outline-none border-[#ffffff1a] bg-clip-padding shadow-md shadow-[#2e364408]  min-w-full min-h-screen lg:min-w-fit lg:min-h-fit box-border rounded-none lg:rounded-3xl xl:rounded-3xl m-0 lg:ml-10 xl:ml-10  p-12 px-12 text-white">
                    <div className="mt-3">
                        <label htmlFor="SignIn-login" className="font-bold">Login: </label>
                        <input className=" rounded-md bg-[#ffffff1a] mt-2 outline-none min-w-full block p-3 " type="text" id="SignIn-login" placeholder="Login" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="SignIn-password" className="font-bold">Password: </label>
                        <input className=" rounded-md bg-[#ffffff1a] mt-2 outline-none block min-w-full p-3 " type="password" id="SignIn-password" placeholder = "password" />
                    </div>
                    <div className="mt-4  font-bold flex justify-center">
                        <button className="py-2 px-8 rounded-md bg-[#e4e9ff1a] hover:bg-[#7d7d7d]">Sign Up</button>
                    </div>
                </form>
            </div>
        </div> )
}
export default SignIn;