import React from "react";
import { Form } from "react-final-form";
import { useNavigate } from 'react-router-dom'
import { FORM_ERROR } from 'final-form'
import { setIn } from "final-form";

import * as Yup from "yup";
import FormContent from "Form/FormContent";
import Background from "./background";
import axios from "axios";



interface Data {
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  gender: string,
  password: string,
  repeat_password: string,
  month: string,
  day: string,
  year: string
}

const validationScheme = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required.")
    .matches(/^[a-zA-Z]+$/),
  last_name: Yup.string()
    .required("Last name is required.")
    .matches(/^[a-zA-Z]+$/),
  username: Yup.string()
    .required("Username is required.")
    .min(8, "At least 8 characters long.")
    .matches(/^[a-zA-Z][a-zA-Z0-9_]{7,}[a-zA-Z0-9]$/, "Contains at least 8 character long.\nShould start with lowercase or uppercase.\nContains lowercase, uppercase, digit or '_'."),
  email: Yup.string()
    .required("Email is required.")
    .email("Must be valid email address."),
  gender: Yup.string().required("Gender is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "At least 8 characters long.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Contains at least one lowercase letter.\nContains at least one uppercase letter.\nContains at least one digit.\nContains at least one special character."
    ),
  repeat_password: Yup.string()
    .required("Password is required.")
    .min(8, "At least 8 characters long.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Contains at least one lowercase letter.\nContains at least one uppercase letter.\nContains at least one digit.\nContains at least one special character."
    )
    .oneOf([Yup.ref("password"), null], "Passwords is not same."),
  day: Yup.string()
    .required("Required")
    .test("not_be_day", "Day is required.", (value) => value !== "Day"),
  month: Yup.string()
    .required("Required")
    .test("not_be_month", "Month is required.", (value) => value !== "Month"),
  year: Yup.string()
    .required("Required")
    .test("not_be_year", "Year is required.", (value) => value !== "Year"),
});


const validateForm = async (values: Data) => {
  try {
    await validationScheme.validate(values, { abortEarly: false });
  } catch (err: any) {
    const errors = err.inner.reduce((formError: any, innerError: any) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
};

const SignUp = () => {
  const navigate = useNavigate()
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
        .post("http://127.0.0.1:7000/transcendence/user/signup", sendData)
      navigate("/transcendence/user/signin")

    }
    catch (error: any) {
      // console.log(error);
      // console.log(error.response.data.message);
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
            validate={validateForm}
            render={FormContent}
          />

        </div>
      </div>
      <Background />
    </>
  );
};

export default SignUp;
