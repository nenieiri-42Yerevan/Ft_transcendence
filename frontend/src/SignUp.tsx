import React from "react";
// import { setConfiguration } from '@types/react-grid-system';
// import { VirtualizedGrid } from '@mierak/react-virtualized-grid';
// import "./SignUp.scss"
import logo from "./assets/images/logo.png"

// // setConfiguration({ maxScreenClass: 'xl' });
// // import SkyBox from "./Skybox";
// // import angleToRadians from "./Angle";

// const layout = ()
// {

// }


const SignUp = () => {
    const months: any[] = [
        { value: "January" },
        { value: "February" },
        { value: "March" },
        { value: "April" },
        { value: "May" },
        { value: "June" },
        { value: "July" },
        { value: "August" },
        { value: "September" },
        { value: "October" },
        { value: "November" },
        { value: "December" }
    ];
    const days: any[] = Array.from(Array(31).keys()).map(d => d + 1)
    const years: any[] = Array.from(Array(76).keys()).map(d => d + 1940)

    return (
        <div className=" text-xs xl:text-xl lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-center bg-clip-padding">
            {/* <nav></nav> */}
            <div className=" text-white hidden md:flex md:flex-col md:align-center  md:justify-center  " >
                <p className="text-center text-3xl md:text-4xl lg:text-5xl">Join the <b className="text-red-900">Game</b></p>
            </div>
            <div className="flex justify-center md:text-lg items-center forms min-w-full min-h-screen md:min-w-fit md:min-h-fit">
                <form className="flex flex-col justify-around backdrop-blur-md bg-[#9e9c9c33] outline-none border-[#2d2727] bg-clip-padding shadow-md shadow-[#2e364408]  min-w-full min-h-screen md:min-w-fit md:min-h-fit box-border rounded-none md:rounded-3xl xl:rounded-3xl m-0 md:ml-10 xl:ml-10 px-4 xs:px-6 sm:px-12 md:px-6 py-8 text-white">
                    <div className="text-lg md:text-2xl flex justify-center block">
                        <p>Join the <b className="text-red-900">Game</b></p>
                    </div>
                    <div className="mt-1 lg:mt-4 xl:mt-6">
                        <label htmlFor="signup-name" className="font-bold">Name: </label>
                        <input className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3" type="text" id="signup-name" placeholder="Full Name" />
                    </div>
                    <div className="mt-1 md:mt-4 xl:mt-6">
                        <label htmlFor="signup-username" className="font-bold">Username: </label>
                        <input className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none block min-w-full p-1 md:p-2 lg:p-3" type="text" id="signup-username" placeholder="Username" />
                    </div>
                    <div className="mt-1 md:mt-4 xl:mt-6">
                        <label htmlFor="signup-email" className="font-bold">Email: </label>
                        <input className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 min-w-full outline-none block p-1 md:p-2 lg:p-3" type="email" id="signup-email" placeholder="Email" />
                    </div>
                    <div className="block xs:flex mt-1 md:mt-4 xl:mt-6 justify-between">
                        <div className="justify-self-start">
                            <label htmlFor="signup-male" className="font-bold">Gender: </label>
                        </div>
                        <div className="justify-self-end flex flex-between space-x-12 px-3 md:px-4">
                            <div className="justify-self-start">
                                <input type="radio" id="signup-male" className="accent-[#2d2727]" name="gender" value="male" />
                                <label htmlFor="signup-male" className="ml-2" >Male</label>
                            </div>
                            <div className="justify-self-end">
                                <input type="radio" id="signup-female" name="gender" className="ml-4 accent-[#2d2727]" value="female" />
                                <label htmlFor="signup-female" className="ml-2">Female</label>
                            </div>
                        </div>
                    </div>
                    <hr className="border-1 border-gray-300 mt-2 md:mt-4 xl:mt-6"></hr>
                    <div className="mt-1 md:mt-2 xl:mt-3">
                        <label htmlFor="signup-password" className="font-bold">Password: </label>
                        <input className=" rounded-md bg-[#2d2727] outline-[#2d2727] min-w-full mt-2 outline-none block p-1 md:p-2 lg:p-3" type="password" id="signup-password" placeholder="Password" />
                    </div>
                    <div className="mt-1 md:mt-4 xl:mt-6">
                        <label htmlFor="signup-repeat-password" className="font-bold">Repeat Password: </label>
                        <input className="rounded-md bg-[#2d2727] outline-[#2d2727] min-w-full mt-2 block p-1 md:p-2 lg:p-3 outline-none " type="password" id="signup-repeat-password" placeholder="Repeat Password" />
                    </div>
                    <hr className="border-1 border-gray-300 mt-2 md:mt-4 xl:mt-6"></hr>
                    <div className="block xs:flex justify-between space-x-3 md:space-x-14 mt-1 md:mt-4 xl:mt-6">
                        <select defaultValue={0} className="appearance-none  outline-[#2d2727] outline-none py-1 px-2 xs:py-2 xs:px-6 sm:px-12 md:px-6 xl:py-3 xl:px-3 justify-self-start focus:outline-none rounded-md bg-[#2d2727]">
                            <option value="Month" className="py-1 md:p-2" key={0}>Month</option>
                            {months.map(({ value }, index) => <option className="p-2 md:p-4" key={index + 1} value={value} >{value}</option>)}
                        </select>
                        <select defaultValue={0} className="appearance-none outline-[#2d2727] outline-none  py-1 px-6 xs:py-2 xs:px-10 sm:px-20 md:px-8 xl:px-10 justify-self-center focus:outline-none rounded-md bg-[#2d2727]">
                            <option value="Day" className="p-1 md:p-2" key={0}>Day</option>
                            {days.map((day, index) => <option className="p-2 md:p-4" key={index + 1} value={day} >{day}</option>)}
                        </select>
                        <select defaultValue={0} className="appearance-none outline-[#2d2727] outline-none py-1 px-6 xs:py-2 xs:px-10 sm:px-16 md:px-6 xl:px-8 justify-self-end focus:outline-none rounded-md bg-[#2d2727]">
                            <option value="Year" className="p-1 md:p-2" key={0}>Year</option>
                            {years.map((year, index) => <option className="p-2 md:p-4" key={index + 1} value={year} >{year}</option>)}
                        </select>
                    </div>
                    <hr className="border-1 border-gray-300 mt-2 md:mt-4 xl:mt-6"></hr>
                    <div className="mt-1 md:mt-20  xl:mt-10 text-red-900 font-bold flex justify-center">
                        <button className="py-1 lg:py-2 px-8 rounded-md bg-[#2d2727] outline-[#2d2727] outline-none  hover:bg-red-50">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;