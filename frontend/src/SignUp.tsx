import React from "react";
import { Form, Field } from "react-final-form";
// import { Validators, ValidationSchema } from "@lemoncode/fonk";
import { createFinalFormValidation } from "@lemoncode/fonk-final-form";
import { setIn } from "final-form";
// import { Formik, Form, Field, FormikProps } from "formik";
// import { validate } from "pwd-checker";
// import usePasswordValidator from 'react-use-password-validator'
import * as Yup from "yup";
import RadioInput from "./inputs/RadioInput";
import TextInput from "./inputs/TextInput";
import PasswordInput from "./inputs/PasswordInput";
import SelectInput from "./inputs/SelectInput";
import Background from "./background";
import axios from "axios";

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
    .required("Requires.")
    .matches(/^[a-zA-Z]+$/),
  last_name: Yup.string()
    .required("Requires.")
    .matches(/^[a-zA-Z]+$/),
  username: Yup.string()
    .required("Requires.")
    .min(8, "At least 8 characters long.")
    .matches(/^[a-zA-Z][a-zA-Z0-9_]{7,}[a-zA-Z0-9]$/, "Contains at least 8 character long\nShould start with lowercase or uppercase\nContains lowercase, uppercase, digit or '_'"),
  email: Yup.string()
    .required("Requires.")
    .email("Must be valid email address."),
  gender: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required.")
    .min(8, "At least 8 characters long.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Contains at least one lowercase letter\nContains at least one uppercase letter\nContains at least one digit\nContains at least one special character"
    ),
  repeat_password: Yup.string()
    .required("Required.")
    .min(8, "At least 8 characters long.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Contains at least one lowercase letter\nContains at least one uppercase letter\nContains at least one digit\nContains at least one special character"
    )
    .oneOf([Yup.ref("password"), null], "Passwords is not same"),
  day: Yup.string()
    .required("Required")
    .test("not_be_day", "Required.", (value) => value !== "day"),
  month: Yup.string()
    .required("Required")
    .test("not_be_month", "Required.", (value) => value !== "month"),
  year: Yup.string()
    .required("Required")
    .test("not_be_year", "Required.", (value) => value !== "year"),
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(sendData);
  };
  return (
    <>
      <div className=" text-xs xl:text-xl lg:text-lg md:text-md sm:text-sm backdrop-blur-md p-0 lg:p-2 xl:p-3 bg-black/50 min-w-full min-h-full z-[668] absolute flex justify-center bg-clip-padding">
        <div className=" text-white hidden md:flex md:flex-col md:align-center  md:justify-center  ">
          <p className="text-center text-3xl md:text-4xl lg:text-5xl">
            Join the <b className="text-red-900">Game</b>
          </p>
        </div>
        <div className="flex justify-center md:text-lg items-center forms min-w-full min-h-screen md:min-w-fit md:min-h-fit">
          <Form
            onSubmit={onSubmit}
            // validationSchema={validationScheme}
            initialValues={{
              first_name: "",
              last_name: "",
              username: "",
              email: "",
              gender: "",
              password: "",
              repeat_password: "",
              day: "",
              month: "",
              year: "",
            }}
            validate={validateForm}
          >
            {({
              handleSubmit,
              errors,
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
                md:rounded-3xl xl:rounded-3xl m-0 md:ml-10 xl:ml-10 px-4 xs:px-6
                sm:px-12 md:px-6 py-8 text-white"
              >
                <div className="text-lg md:text-2xl flex justify-center block">
                  <p>
                    Join the <b className="text-red-900">Game</b>
                  </p>
                </div>
                <div className="block xs:flex justify-around">
                  <Field<string>
                    name="first_name"
                    title={errors && errors.first_name ? errors.first_name : ""}
                    placeholder="First Name"
                    id="signup-first_name"
                    key={"first_name"}
                  >
                    {({ input, meta, ...rest }) => (
                      <div className="mt-1 lg:mt-4 xl:mt-6">
                        <label
                          htmlFor="signup-first_name"
                          className="font-bold"
                        >
                          First Name:
                        </label>
                        {meta.error && meta.touched ? (
                          <TextInput
                            input={input}
                            className=" rounded-md bg-[#2d2727] outline-red-900 mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3"
                            meta={meta}
                            {...rest}
                          />
                        ) : (
                          <TextInput
                            input={input}
                            className=" rounded-md bg-[#2d2727] justify-self-start outline-[#2d2727] mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3"
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
                      <div className="mt-1 lg:mt-4 xl:mt-6">
                        <label htmlFor="signup-last_name" className="font-bold">
                          Last Name:
                        </label>
                        {meta.error && meta.touched ? (
                          <TextInput
                            input={input}
                            className=" rounded-md bg-[#2d2727] outline-red-900 mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3"
                            meta={meta}
                            {...rest}
                          />
                        ) : (
                          <TextInput
                            input={input}
                            className=" rounded-md bg-[#2d2727] justify-self-end outline-[#2d2727] mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3"
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
                    <div className="mt-1 md:mt-4 xl:mt-6">
                      <label htmlFor="signup-username" className="font-bold">
                        Username:
                      </label>
                      {meta.error && meta.touched ? (
                        <TextInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-red-900 mt-2 outline-none block min-w-full p-1 md:p-2 lg:p-3"
                        />
                      ) : (
                        <TextInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none block min-w-full p-1 md:p-2 lg:p-3"
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
                  // validate={required}
                >
                  {({ input, meta, ...rest }) => (
                    <div className="mt-1 md:mt-4 xl:mt-6">
                      <label htmlFor="signup-email" className="font-bold">
                        Email:
                      </label>
                      {meta.error && meta.touched ? (
                        <TextInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-red-900 mt-2 outline-none block min-w-full p-1 md:p-2 lg:p-3"
                        />
                      ) : (
                        <TextInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none block min-w-full p-1 md:p-2 lg:p-3"
                        />
                      )}
                    </div>
                  )}
                </Field>
                <div
                  className="block 2xs:flex xs:flex mt-1 md:mt-4 xl:mt-6 justify-between"
                  title={errors && errors.gender ? errors.gender : ""}
                >
                  <div className="justify-self-start">
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
                  <div className="justify-self-end flex flex-col xs:flex-row justify-center align-center xs:flex-between space-x-12 px-3 md:px-4">
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
                        className="ml-4 accent-[#2d2727]"
                        key={"gender"}
                      >
                        {({ input, meta, ...rest }) => (
                          <div className="justify-self-start">
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
                <hr className="border-1 border-gray-300 mt-2 md:mt-4 xl:mt-6"></hr>
                <Field<string>
                  name="password"
                  title={errors && errors.password ? errors.password : ""}
                  id="signup-password"
                  placeholder="Password"
                  key={"password"}
                >
                  {({ input, meta, ...rest }) => (
                    <div className="mt-1 md:mt-2 xl:mt-3">
                      <label htmlFor="signup-password" className="font-bold">
                        Password:
                      </label>
                      {meta.error && meta.touched ? (
                        <PasswordInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-red-900 min-w-full mt-2 outline-none block p-1 md:p-2 lg:p-3"
                        />
                      ) : (
                        <PasswordInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className=" rounded-md bg-[#2d2727] outline-[#2d2727] min-w-full mt-2 outline-none block p-1 md:p-2 lg:p-3"
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
                    "rounded-md bg-[#2d2727] min-w-full mt-2 block p-1 md:p-2 lg:p-3 outline-none " +
                    (errors && errors.repeat_password)
                      ? "outline-red-900"
                      : " outline-[#2d2727]"
                  }
                  placeholder="Repeat Password"
                  key={"repeat_password"}
                >
                  {({ input, meta, ...rest }) => (
                    <div className="mt-1 md:mt-4 xl:mt-6">
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
                          className="rounded-md bg-[#2d2727] outline-red-900 min-w-full mt-2 block p-1 md:p-2 lg:p-3 outline-none "
                        />
                      ) : (
                        <PasswordInput
                          input={input}
                          meta={meta}
                          {...rest}
                          className="rounded-md bg-[#2d2727] outline-[#2d2727] min-w-full mt-2 block p-1 md:p-2 lg:p-3 outline-none "
                        />
                      )}
                    </div>
                  )}
                </Field>
                <hr className="border-1 border-gray-300 mt-2 md:mt-4 xl:mt-6"></hr>
                <div className="flex flex-col xs:flex xs:flex-row justify-between xs:space-x-3 md:space-x-14 mt-1 md:mt-4 xl:mt-6">
                  <Field<string>
                    name="day"
                    title={errors && errors.day ? errors.day : ""}
                    defaultValue={"Day"}
                    className={
                      "appearance-none text-center  outline-none mt-8 py-1 px-6 xs:py-2  xs:px-10 sm:px-20 md:px-8 xl:px-10 block xs:justify-self-start focus:outline-none rounded-md bg-[#2d2727] " +
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
                      "appearance-none text-center outline-none mt-8 py-1 px-6 xs:py-2 xs:px-6 sm:px-12 md:px-6 xl:py-3 xl:px-3 block xs:justify-self-center focus:outline-none rounded-md bg-[#2d2727] " +
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
                      "appearance-none text-center outline-none mt-8 py-1 px-6 xs:py-2 xs:px-10 sm:px-16 md:px-6 xl:px-8 block xs:justify-self-end focus:outline-none rounded-md bg-[#2d2727] " +
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
                <hr className="border-1 border-gray-300 mt-2 md:mt-4 xl:mt-6"></hr>
                <div className="mt-1 md:mt-20  xl:mt-10 text-red-900 font-bold flex justify-center">
                  <button
                    form="signup-form"
                    disabled={errors && Object.keys(errors).length !== 0}
                    onClick={() => form.reset}
                    type="submit"
                    className={"py-1 lg:py-2 px-8 rounded-md  outline-[#2d2727] outline-none " + ((errors && Object.keys(errors).length !== 0) ? "disabled bg-[#a79c9b]" : "bg-[#2d2727] hover:bg-red-50")}
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
