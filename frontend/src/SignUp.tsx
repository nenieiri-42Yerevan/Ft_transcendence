import React from "react";
import { Form } from "react-final-form";
import { useNavigate } from 'react-router-dom'
import { FORM_ERROR } from 'final-form'
import { Data, validate } from "Utils/Scheme"
import FormContent from "Form/FormContent";
import Background from "./background";
import axios from "axios";


const SignUp = () => {
  const navigate = useNavigate();
  const onSubmit = async (data: Data) => {
    const sendData = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      gender: data.gender,
      password: data.password,
      date_of_birth: data.day + "/" + data.month + "/" + data.year,
    };
    try {
      await axios
        .post("http://127.0.0.1:7000/transcendence/user/signup", sendData);
      navigate("/transcendence/user/signin")

    }
    catch (error: any) {
      return { [FORM_ERROR]: error.response.data.message }

    }
  };
  return (
    <>
      <div className="  py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-center bg-clip-padding">
        <div className=" text-white hidden md:flex md:flex-col md:align-center  md:justify-center  ">
          <p className="text-center text-3xl lg:text-4xl xl:text-5xl">
            Join the <b className="text-red-900">Game</b>
          </p>
        </div>
        <div className="flex justify-center md:text-lg items-center min-w-full min-h-screen md:min-w-fit md:min-h-fit">
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={FormContent}
          />
        </div>
      </div>
      <Background />
    </>
  );
};

export default SignUp;
