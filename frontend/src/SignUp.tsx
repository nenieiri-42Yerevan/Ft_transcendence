import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { setIn } from "final-form";

import * as Yup from "yup";
import RadioInput from "./inputs/RadioInput";
import TextInput from "./inputs/TextInput";
import PasswordInput from "./inputs/PasswordInput";
import SelectInput from "./inputs/SelectInput";
import Background from "./background";
import axios from "axios";
import { FORM_ERROR } from 'final-form'
import { error } from "console";

type Gender = "male" | "female";

interface Data {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  gender: string;
  password: string;
  repeat_password: string;
  month: string;
  day: string;
  year: string;
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
  } catch (err:any) {
    const errors = err.inner.reduce((formError: any, innerError: any) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
};

const onSubmit = (data: Data) => {
  const sendData = {
    first_name: data.first_name,
    last_name: data.last_name,
    username: data.username,
    email: data.email,
    gender: data.gender,
    password: data.password,
    date_of_birth: data.day + "/" + data.month + "/" + data.year,
  };
  console.log(sendData);
  axios
    .post("http://127.0.0.1:7000/transcendence/user/signup", sendData)
    .then(function (response) {
      console.log(response.data.message);
    })
    .catch(function (error) {

      return {[FORM_ERROR]: error.response.data.message};
      // console.log(error.response.data.message);
      // console.log(error);
    });
  // console.log(sendData);
};
const getError = (err:any)=> {
  if (err.first_name)
    return err.first_name;
  if (err.last_name)
    return err.last_name;
  if (err.username)
    return err.username;
  if (err.email)
    return err.email;
  if (err.gender)
    return err.gender;
  if (err.password)
    return err.password;
  if (err.repeat_password)
    return err.repeat_password;
  if (err.day)
    return err.day;
  if (err.month)
    return err.month;
  if (err.year)
    return err.year;
  return undefined;
}

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
    { value: "December" },
  ];
  const days: any[] = Array.from(Array(31).keys()).map((d) => d + 1);
  const years: any[] = Array.from(Array(76).keys()).map((d) => d + 1940);
  // const [submitError, setSubmitError] = useState()
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
          >
            {({
              handleSubmit,
              errors,
              submitError,
              submitting,
              pristine,
              form,
              values,
            }) => (
              <form
                onSubmit={handleSubmit}
                id="signup-form"
                className="flex flex-col justify-around
                backdrop-blur-md bg-[#9e9c9c33] outline-none border-[#2d2727]
                bg-clip-padding shadow-md shadow-[#2e364408] min-w-full
                min-h-screen md:min-w-fit md:min-h-fit box-border rounded-none
                md:rounded-3xl xl:rounded-3xl px-4 xs:px-6
                sm:px-12 md:px-6 py-4 text-white gap-y-5"
              >
                <div className="text-xl 2xs:text-xl xs:text-2xl md:text-2xl lg:3xl flex justify-center block">
                  <p>
                    Join the <b className="text-red-900">Game</b>
                  </p>
                </div>
                  {errors && Object.keys(errors).length !== 0
                  ?
                  <pre className="text-red-900 text-xs flex">
                    {(!submitError || Object.keys(submitError).length === 0 )
                    ?
                    getError(errors) :
                    submitError 
                    }
                    </pre>
                  :
                  <></>
                  }
                <div className="flex flex-col xs:flex xs:flex-row justify-between gap-x-3 gap-y-5 sm:gap-x-3">
                  <Field<string>
                    name="first_name"
                    title={errors && errors.first_name ? errors.first_name : ""}
                    placeholder="First Name"
                    id="signup-first_name"
                    key={"first_name"}
                  >
                    {({ input, meta, ...rest }) => (
                      <div className=" xs:justify-self-start flex flex-col gap-y-2">
                        <label
                          htmlFor="signup-first_name"
                          className="font-bold"
                        >
                          First Name:
                        </label>
                        {meta.error && meta.touched ? (
                          <TextInput
                            input={input}
                            className=" rounded-md bg-[#2d2727] outline-red-900 outline-none min-w-full block p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                            meta={meta}
                            {...rest}
                          />
                        ) : (
                          <TextInput
                            input={input}
                            className=" rounded-md bg-[#2d2727] justify-self-start outline-[#2d2727] outline-none min-w-full block p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                            meta={meta}
                            {...rest}
                          />
                        )}
                      </div>
                    )}
                  </Field>
                  <Field<string>
                    name="last_name"
                    title={errors && errors.last_name ? errors.last_name : ""}
                    placeholder="Last Name"
                    id="signup-last_name"
                    key={"last_name"}
                  >
                    {({ input, meta, ...rest }) => (
                      <div className="xs:justify-self-end  flex flex-col gap-y-2">
                        <label htmlFor="signup-last_name" className="font-bold">
                          Last Name:
                        </label>
                        {meta.error && meta.touched ? (
                          <TextInput
                            input={input}
                            className=" rounded-md bg-[#2d2727] outline-red-900  outline-none min-w-full block p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                            meta={meta}
                            {...rest}
                          />
                        ) : (
                          <TextInput
                            input={input}
                            className=" rounded-md bg-[#2d2727] justify-self-end outline-[#2d2727]  outline-none min-w-full block p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                            meta={meta}
                            {...rest}
                          />
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <Field<string>
                  name="username"
                  title={errors && errors.username ? errors.username : ""}
                  id="signup-username"
                  placeholder="Username"
                  key={"username"}
                >
                  {({ input, meta, ...rest }) => (
                    <div className=" flex flex-col gap-y-2 ">
                      <label htmlFor="signup-username" className="font-bold">
                        Username:
                      </label>
                      {meta.error && meta.touched ? (
                        <TextInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-red-900  outline-none block min-w-full p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                        />
                      ) : (
                        <TextInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-[#2d2727]  outline-none block min-w-full p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                        />
                      )}
                    </div>
                  )}
                </Field>
                <Field<string>
                  name="email"
                  title={errors && errors.email ? errors.email : ""}
                  placeholder="Email Address"
                  id="signup-email"
                  key={"email"}
                >
                  {({ input, meta, ...rest }) => (
                    <div className=" flex flex-col gap-y-2">
                      <label htmlFor="signup-email" className="font-bold">
                        Email:
                      </label>
                      {meta.error && meta.touched ? (
                        <TextInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-red-900  outline-none block min-w-full p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                        />
                      ) : (
                        <TextInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-[#2d2727]  outline-none block min-w-full p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                        />
                      )}
                    </div>
                  )}
                </Field>
                <div
                  className="flex justify-between flex-wrap gap-y-3 gap-x-2 xs:flex-nowrap xs:gap-y-0 xs:gap-x-0"
                  title={errors && errors.gender ? errors.gender : ""}
                >
                  <div className="justify-self-start ">
                    <label
                      htmlFor="signup-male"
                      className={
                        "font-bold " +
                        (errors && errors.gender ? "text-red-900" : "")
                      }
                    >
                      Gender:
                    </label>
                  </div>
                  <div className="justify-self-end  flex xs:flex-row justify-center align-center xs:flex-between gap-x-5 gap-y-3  xs:gap-x-36  px-0 xs:px-3 md:px-4">
                    <Field<Gender>
                      name="gender"
                      className="accent-[#2d2727]"
                      type="radio"
                      value="male"
                      id="signup-male"
                      key={"gender"}
                    >
                      {({ input, meta, ...rest }) => (
                        <div className="xs:justify-self-center">
                          <RadioInput input={input} meta={meta} {...rest} />
                          <label htmlFor="signup-male" className="ml-2">
                            Male
                          </label>
                        </div>
                      )}
                    </Field>
                    <div className="xs:justify-self-end">
                      <Field<Gender>
                        name="gender"
                        type="radio"
                        value="female"
                        id="signup-female"
                        className="ml-0  xs:ml-4 accent-[#2d2727]"
                        key={"gender"}
                      >
                        {({ input, meta, ...rest }) => (
                          <div className="flex flex-between xs:block xs:justify-self-start">
                            <RadioInput input={input} meta={meta} {...rest} />
                            <label htmlFor="signup-female" className="ml-2">
                              Female
                            </label>
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>
                </div>
                <hr className="border-1 border-gray-300"></hr>
                <Field<string>
                  name="password"
                  title={errors && errors.password ? errors.password : ""}
                  id="signup-password"
                  placeholder="Password"
                  key={"password"}
                >
                  {({ input, meta, ...rest }) => (
                    <div className=" flex flex-col gap-y-2">
                      <label htmlFor="signup-password" className="font-bold">
                        Password:
                      </label>
                      {meta.error && meta.touched ? (
                        <PasswordInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-red-900 min-w-full outline-none block p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                        />
                      ) : (
                        <PasswordInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-[#2d2727] min-w-full outline-none block p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3"
                        />
                      )}
                    </div>
                  )}
                </Field>
                <Field<string>
                  name="repeat_password"
                  title={
                    errors && errors.repeat_password
                      ? errors.repeat_password
                      : ""
                  }
                  id="signup-repeat-password"
                  className={
                    "rounded-md bg-[#2d2727] min-w-full block p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3 outline-none " +
                    (errors && errors.repeat_password)
                      ? "outline-red-900"
                      : " outline-[#2d2727]"
                  }
                  placeholder="Repeat Password"
                  key={"repeat_password"}
                >
                  {({ input, meta, ...rest }) => (
                    <div className=" flex flex-col gap-y-2">
                      <label
                        htmlFor="signup-repeat-password"
                        className="font-bold"
                      >
                        Repeat Password:
                      </label>
                      {meta.error && meta.touched ? (
                        <PasswordInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className="rounded-md bg-[#2d2727] outline-red-900 min-w-full block p-1 xs:p-1.5 md:p-2 lg:p-3 outline-none "
                        />
                      ) : (
                        <PasswordInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className="rounded-md bg-[#2d2727] outline-[#2d2727] min-w-full  block p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3 outline-none "
                        />
                      )}
                    </div>
                  )}
                </Field>
                <hr className="border-1 border-gray-300 "></hr>
                <div className="flex flex-col  2xs:gap-y-3 2xs:flex 2xs:flex-row justify-between gap-y-3 2xs:gap-x-1.5 xs:gap-x-3 md:gap-x-14 ">
                  <Field<string>
                    name="day"
                    title={errors && errors.day ? errors.day : ""}
                    defaultValue={"Day"}
                    className={
                      "appearance-none text-center  outline-none  py-1 px-4 2xs:px-4  xs:py-2  xs:px-10 sm:px-20 md:px-8 xl:px-10 block xs:justify-self-start focus:outline-none rounded-md bg-[#2d2727] " +
                      (errors && errors.day
                        ? "outline-red-900"
                        : "outline-[#2d2727]")
                    }
                    component={SelectInput}
                    key={"day"}
                  >
                    <option
                      className="p-2 md:p-4"
                      key={0}
                      value={"Day"}
                      disabled
                    >
                      Day
                    </option>
                    {days.map((day, index) => (
                      <option
                        className="p-2 md:p-4"
                        key={index + 1}
                        value={day}
                      >
                        {day}
                      </option>
                    ))}
                  </Field>
                  <Field<string>
                    name="month"
                    title={errors && errors.month ? errors.month : ""}
                    defaultValue={"Month"}
                    className={
                      "appearance-none text-center outline-none py-1 px-6 xs:py-2 xs:px-6 sm:px-12 md:px-6 xl:py-3 xl:px-3 block xs:justify-self-center focus:outline-none rounded-md bg-[#2d2727] " +
                      (errors && errors.month
                        ? "outline-red-900"
                        : "outline-[#2d2727]")
                    }
                    component={SelectInput}
                    key={"month"}
                  >
                    <option
                      value="Month"
                      className="py-1 md:p-2"
                      key={0}
                      disabled
                    >
                      Month
                    </option>
                    {months.map(({ value }, index) => (
                      <option
                        className="p-2 md:p-4"
                        key={index + 1}
                        value={value}
                      >
                        {value}
                      </option>
                    ))}
                  </Field>
                  <Field<string>
                    name="year"
                    title={errors && errors.year ? errors.year : ""}
                    defaultValue={"Year"}
                    className={
                      "appearance-none text-center outline-none py-1 px-6 xs:py-2 xs:px-10 sm:px-16 md:px-6 xl:px-8 block xs:justify-self-end focus:outline-none rounded-md bg-[#2d2727] " +
                      (errors && errors.year
                        ? "outline-red-900"
                        : "outline-[#2d2727]")
                    }
                    component={SelectInput}
                    key={"year"}
                  >
                    <option
                      className="p-2 md:p-4"
                      key={0}
                      value={"Year"}
                      disabled
                    >
                      Year
                    </option>
                    {years.map((year, index) => (
                      <option
                        className="p-2 md:p-4"
                        key={index + 1}
                        value={year}
                      >
                        {year}
                      </option>
                    ))}
                  </Field>
                </div>
                <hr className="border-1 border-gray-300 "></hr>
                <div className="text-red-900 font-bold flex justify-center">
                  <button
                    form="signup-form"
                    disabled={errors && Object.keys(errors).length !== 0}
                    onClick={() => form.reset}
                    type="submit"
                    className={"py-1 xs:py-1.5 lg:py-2 px-8 rounded-md  outline-[#2d2727] outline-none " + (
                      (errors && Object.keys(errors).length !== 0) 
                      ? "disabled bg-[#a79c9b]" 
                      : "bg-[#2d2727] hover:bg-red-50")
                    }
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
      <Background />
    </>
  );
};

export default SignUp;
