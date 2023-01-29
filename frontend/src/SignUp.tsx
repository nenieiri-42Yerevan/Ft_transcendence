import React from "react";
// import { setConfiguration } from '@types/react-grid-system';
// import { VirtualizedGrid } from '@mierak/react-virtualized-grid';
import "./SignUp.scss"
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
        <div className="backdrop-blur-md p-0 lg:p-12 xl:p-16 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-between bg-clip-padding">
            {/* <nav></nav> */}
            <div className="pt-20 px-10 justify-self-start hidden sm:hidden lg:flex  lg:justify-center xl:flex xl:justify-center " >
                <img className="h-full w-full" src={logo} alt="" />
            </div>
            <div className="flex  justify-center items-center forms min-w-full min-h-screen lg:min-w-fit lg:min-h-fit">
                <form className="flex flex-col justify-around backdrop-blur-md bg-[#9e9c9c33] outline-none border-[#ffffff1a] bg-clip-padding shadow-md shadow-[#2e364408]  min-w-full min-h-screen lg:min-w-fit lg:min-h-fit box-border rounded-none lg:rounded-3xl xl:rounded-3xl m-0 lg:ml-10 xl:ml-10  p-12 px-12 text-white">
                    <div className="mt-3">
                        <label htmlFor="signup-name" className="font-bold">Name: </label>
                        <input className=" rounded-md bg-[#ffffff1a] mt-2 outline-none min-w-full block p-3 " type="text" id="signup-name" placeholder="Full Name" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="signup-username" className="font-bold">Username: </label>
                        <input className=" rounded-md bg-[#ffffff1a] mt-2 outline-none block min-w-full p-3 " type="text" id="signup-username" placeholder="Username" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="signup-email" className="font-bold">Email: </label>
                        <input className=" rounded-md bg-[#ffffff1a] mt-2 min-w-full block p-3 " type="email" id="signup-email" placeholder="Email" />
                    </div>
                    <div className="flex mt-3 justify-between">
                        <div className="justify-self-start">
                            <label htmlFor="signup-male" className="font-bold">Gender: </label>
                        </div>
                        <div className="justify-self-end flex flex-between space-x-12 px-4">
                            <div className="justify-self-start">
                                <input type="radio" id="signup-male" name="gender" value="male" />
                                <label htmlFor="signup-male" className="ml-2" >Male</label>
                            </div>
                            <div className="justify-self-end">
                                <input type="radio" id="signup-female" name="gender" className="ml-4" value="female" />
                                <label htmlFor="signup-female" className="ml-2">Female</label>
                            </div>
                        </div>
                    </div>
                    <hr className="border-1 border-gray-300 my-6"></hr>
                    <div className="mt-3">
                        <label htmlFor="signup-password" className="font-bold">Password: </label>
                        <input className=" rounded-md bg-[#ffffff1a] min-w-full mt-2 outline-none block p-3 " type="password" id="signup-password" placeholder="Password" />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="signup-repeat-password" className="font-bold">Repeat Password: </label>
                        <input className="rounded-md bg-[#ffffff1a] min-w-full mt-2 block p-3 outline-none " type="password" id="signup-repeat-password" placeholder="Repeat Password" />
                    </div>
                    <div className="flex justify-between space-x-14 mt-3">
                        <select defaultValue={0} className="p-3 justify-self-start focus:outline-none rounded-md bg-[#ffffff1a]">
                            <option value="Month" className="p-2" key={0}>Month</option>
                            {months.map(({ value }, index) => <option className="p-4" key={index + 1} value={value} >{value}</option>)}
                        </select>
                        <select defaultValue={0} className="p-3 justify-self-center focus:outline-none rounded-md bg-[#ffffff1a]">
                            <option value="Day" className="p-2" key={0}>Day</option>
                            {days.map((day, index) => <option className="p-4" key={index + 1} value={day} >{day}</option>)}
                        </select>
                        <select defaultValue={0} className="p-3 justify-self-end focus:outline-none rounded-md bg-[#ffffff1a]">
                            <option value="Year" className="p-2" key={0}>Year</option>
                            {years.map((year, index) => <option className="p-4" key={index + 1} value={year} >{year}</option>)}
                        </select>
                    </div>
                    <hr className="border-1 border-gray-300 my-6"></hr>
                    <div className="mt-4  font-bold flex justify-center">
                        <button className="py-2 px-8 rounded-md bg-[#e4e9ff1a] hover:bg-[#7d7d7d]">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;