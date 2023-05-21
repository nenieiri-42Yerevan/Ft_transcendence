import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import { Data, validate } from './Utils/Scheme';
import FormContent from './Form/FormContent';
import Background from './Background';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from './Slices/userSlice';
import Signmenu from './Signmenu';

const SignUp = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser);
  useEffect(() => {
    if (userInfo && userInfo.user != null && !userInfo.user.isUnAuth) {
      navigate("/transcendence/user/profile");
    }
  }, [userInfo]);
  const onSubmit = async (data: Data) => {
    const sendData = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      gender: data.gender,
      password: data.password,
      date_of_birth: data.day + '/' + data.month + '/' + data.year,
    };
    try {
      await axios.post(
        `${process.env.BACK_URL}/transcendence/user/signup`,
        sendData
      );
      navigate('/transcendence/user/signin');
    } catch (error: any) {
      return { [FORM_ERROR]: error.response.data.message };
    }
  };
  return (
    <>
      <Signmenu />
      <div className="  py-0 md:py-6 text-xs xl:text-xl gap-x-0 md:gap-x-4 lg:text-lg md:text-md sm:text-sm p-0 lg:p-2 xl:p-3  flex justify-center bg-[#262525]">
        <div className=" text-white hidden md:flex md:flex-col md:align-center  md:justify-center  ">
          <p className="text-center text-3xl lg:text-4xl xl:text-5xl">
            Join the <b className="text-red-900">Game</b>
          </p>
        </div>
        <div className="flex justify-center md:text-lg items-center min-w-full min-h-screen md:min-w-fit md:min-h-fit">
          <Form onSubmit={onSubmit} validate={validate} render={FormContent} />
        </div>
      </div>
    </>
  );
};

export default SignUp;
