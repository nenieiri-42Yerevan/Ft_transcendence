import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { ValidationErrors } from "final-form";
import * as Yup from "yup";
import RadioInput from "./inputs/RadioInput";
import TextInput from "./inputs/TextInput";
import PasswordInput from "./inputs/PasswordInput"
import SelectInput from "./inputs/SelectInput";
import Background from "./background";
import axios from "axios";

type Gender = "male" | "female";

interface Data {
    name: string;
    username: string;
    email: string;
    gender: string;
    password: string;
    repeat_password: string;
    month: string,
    day: string,
    year: string
}

// const Check = (props: any) => {
//     // console.log(err);
//     return (
//         <h1>{props.err}</h1>
//     );

// }

// const Error = (err:any) => {
//     return(
//         err &&
//     );
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
    const required = (value: any) => (value ? undefined : 'Required');
    const onSubmit = (data: Data) => {
        const sendData = {
            name: data.name,
            username: data.username,
            email: data.email,
            gender: data.gender,
            password: data.password,
            date: data.day + "/" + data.month + "/" + data.year
        };
        console.log(sendData);
        axios.post('http://127.0.0.1:7000/transcendence/user/signup', sendData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(sendData);

    }
    return (
        <>
            <div className=" text-xs xl:text-xl lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-center bg-clip-padding">
                <div className=" text-white hidden md:flex md:flex-col md:align-center  md:justify-center  " >
                    <p className="text-center text-3xl md:text-4xl lg:text-5xl">Join the <b className="text-red-900">Game</b></p>
                </div>
                <div className="flex justify-center md:text-lg items-center forms min-w-full min-h-screen md:min-w-fit md:min-h-fit">
                    <Form
                        onSubmit={onSubmit}
                        initialValues={{
                            username: "",
                            email: "",
                            gender: "",
                            password: "",
                            repeat_password: ""
                        }}
                    >

                        {({ handleSubmit, form, submitting, pristine, values, errors }) => (
                            <form onSubmit={handleSubmit} id="signup-form" className="flex flex-col justify-around backdrop-blur-md bg-[#9e9c9c33] outline-none border-[#2d2727] bg-clip-padding shadow-md shadow-[#2e364408]  min-w-full min-h-screen md:min-w-fit md:min-h-fit box-border rounded-none md:rounded-3xl xl:rounded-3xl m-0 md:ml-10 xl:ml-10 px-4 xs:px-6 sm:px-12 md:px-6 py-8 text-white">
                                <div className="text-lg md:text-2xl flex justify-center block">
                                    <p>Join the <b className="text-red-900">Game</b></p>
                                </div>
                                <div className="mt-1 lg:mt-4 xl:mt-6">
                                    <label htmlFor="signup-name" className="font-bold">Name: </label>
                                    <Field<string>
                                        name="name"
                                        className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3"
                                        placeholder="Full Name"
                                        id="signup-name"
                                        component={TextInput}
                                        // validate={required}
                                        key={"name"}
                                    >
                                        {/* {({ input, meta }) => (
                                            <div>
                                                <label>Select Input:</label>
                                                <TextInput {...input}>
                                                </TextInput>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )} */}
                                    </Field>
                                    {/* <SelectInput ></SelectInput> */}
                                    {/* <Check err={errors} /> */}
                                    {/* <h1>{check(errors)} */}
                                    {/* </h1> */}

                                </div>
                                <div className="mt-1 md:mt-4 xl:mt-6">
                                    <label htmlFor="signup-username" className="font-bold">Username: </label>
                                    <Field<string>
                                        name="username"
                                        className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none block min-w-full p-1 md:p-2 lg:p-3"
                                        id="signup-username"
                                        placeholder="Username"
                                        component={TextInput}
                                        key={"username"}
                                    />
                                </div>
                                <div className="mt-1 md:mt-4 xl:mt-6">
                                    <label htmlFor="signup-email" className="font-bold">Email: </label>
                                    <Field<string>
                                        name="email"
                                        className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none block min-w-full p-1 md:p-2 lg:p-3"
                                        placeholder="Email Address"
                                        id="signup-email"
                                        component={TextInput}
                                        key={"email"}
                                    />
                                </div>
                                <div className="block xs:flex mt-1 md:mt-4 xl:mt-6 justify-between">
                                    <div className="justify-self-start">
                                        <label htmlFor="signup-male" className="font-bold">Gender: </label>
                                    </div>
                                    <div className="justify-self-end flex flex-between space-x-12 px-3 md:px-4">
                                        <div className="justify-self-start">
                                            <Field<Gender>
                                                name="gender"
                                                className="accent-[#2d2727]"
                                                type="radio"
                                                value="male"
                                                id="signup-male"
                                                component={RadioInput}
                                                key={"gender"}
                                            />{" "}
                                            <label htmlFor="signup-male" className="ml-2" >Male</label>
                                        </div>
                                        <div className="justify-self-end">
                                            <Field<Gender>
                                                name="gender"
                                                type="radio"
                                                value="female"
                                                id="signup-female"
                                                className="ml-4 accent-[#2d2727]"
                                                component={RadioInput}
                                                key={"gender"}
                                            />{" "}
                                            <label htmlFor="signup-female" className="ml-2">Female</label>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-1 border-gray-300 mt-2 md:mt-4 xl:mt-6"></hr>
                                <div className="mt-1 md:mt-2 xl:mt-3">
                                    <label htmlFor="signup-password" className="font-bold">Password: </label>
                                    <Field<string>
                                        name="password"
                                        className=" rounded-md bg-[#2d2727] outline-[#2d2727] min-w-full mt-2 outline-none block p-1 md:p-2 lg:p-3"
                                        id="signup-password"
                                        placeholder="Password"
                                        component={PasswordInput}
                                        key={"password"}
                                    />
                                </div>
                                <div className="mt-1 md:mt-4 xl:mt-6">
                                    <label htmlFor="signup-repeat-password" className="font-bold">Repeat Password: </label>
                                    <Field<string>
                                        name="repeat-password"
                                        className="rounded-md bg-[#2d2727] outline-[#2d2727] min-w-full mt-2 block p-1 md:p-2 lg:p-3 outline-none "
                                        id="signup-repeat-password"
                                        placeholder="Repeat Password"
                                        component={PasswordInput}
                                        key={"repeat-password"}
                                    />
                                </div>
                                <hr className="border-1 border-gray-300 mt-2 md:mt-4 xl:mt-6"></hr>
                                <div className="block xs:flex justify-between space-x-3 md:space-x-14 mt-1 md:mt-4 xl:mt-6">
                                    <Field<string>
                                        name="day"
                                        defaultValue={"Day"}
                                        className="appearance-none text-center outline-[#2d2727] outline-none  py-1 px-6 xs:py-2 xs:px-10 sm:px-20 md:px-8 xl:px-10 justify-self-center focus:outline-none rounded-md bg-[#2d2727]"
                                        component={SelectInput}
                                        key={"day"}
                                    >
                                        <option className="p-2 md:p-4" key={0} value={"Day"} disabled>Day</option>
                                        {days.map((day, index) => <option className="p-2 md:p-4" key={index + 1} value={day} >{day}</option>)}
                                    </Field>
                                    <Field<string>
                                        name="month"
                                        defaultValue={"Month"}
                                        className="appearance-none text-center  outline-[#2d2727] outline-none py-1 px-2 xs:py-2 xs:px-6 sm:px-12 md:px-6 xl:py-3 xl:px-3 justify-self-start focus:outline-none rounded-md bg-[#2d2727]"
                                        component={SelectInput}
                                        key={"month"}
                                    >
                                        <option value="Month" className="py-1 md:p-2" key={0} disabled>Month</option>
                                        {months.map(({ value }, index) => <option className="p-2 md:p-4" key={index + 1} value={value} >{value}</option>)}
                                    </Field>
                                    <Field<string>
                                        name="year"
                                        defaultValue={"Year"}
                                        className="appearance-none text-center outline-[#2d2727] outline-none py-1 px-6 xs:py-2 xs:px-10 sm:px-16 md:px-6 xl:px-8 justify-self-end focus:outline-none rounded-md bg-[#2d2727]"
                                        component={SelectInput}
                                        key={"year"}
                                    >
                                        <option className="p-2 md:p-4" key={0} value={"Year"} disabled>Year</option>
                                        {years.map((year, index) => <option className="p-2 md:p-4" key={index + 1} value={year} >{year}</option>)}
                                    </Field>
                                </div>
                                <hr className="border-1 border-gray-300 mt-2 md:mt-4 xl:mt-6"></hr>
                                <div className="mt-1 md:mt-20  xl:mt-10 text-red-900 font-bold flex justify-center">
                                    <button form="signup-form" type="submit" className="py-1 lg:py-2 px-8 rounded-md bg-[#2d2727] outline-[#2d2727] outline-none  hover:bg-red-50">Sign Up</button>
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

export default SignUp;