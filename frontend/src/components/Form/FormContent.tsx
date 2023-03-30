import React from 'react';
import RadioInput from './inputs/RadioInput';
import TextInput from './inputs/TextInput';
import PasswordInput from './inputs/PasswordInput';
import SelectInput from './inputs/SelectInput';
import { Field, FormSpy } from 'react-final-form';
import { Gender, days, months, years } from '../Utils/Scheme';

const getError = (err: any) => {
  if (err.first_name) return err.first_name;
  if (err.last_name) return err.last_name;
  if (err.username) return err.username;
  if (err.email) return err.email;
  if (err.gender) return err.gender;
  if (err.password) return err.password;
  if (err.repeat_password) return err.repeat_password;
  if (err.day) return err.day;
  if (err.month) return err.month;
  if (err.year) return err.year;
  return undefined;
};

const FormContent = (props: any) => {
  return (
    <form
      onSubmit={props.handleSubmit}
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
      {props.submitError ? (
        <FormSpy subscription={{ submitError: true }}>
          {({ submitError }) => (
            <pre className="text-red-900 text-xs">{submitError}</pre>
          )}
        </FormSpy>
      ) : (
        props.hasValidationErrors && (
          <FormSpy subscription={{ errors: true }}>
            {({ errors }) => (
              <pre className="text-red-900 text-xs flex">
                {getError(errors)}
              </pre>
            )}
          </FormSpy>
        )
      )}
      <div className="flex flex-col xs:flex xs:flex-row justify-between gap-x-3 gap-y-5 sm:gap-x-3">
        <Field<string>
          name="first_name"
          title={
            props.errors && props.errors.first_name
              ? props.errors.first_name
              : ''
          }
          placeholder="First Name"
          id="signup-first_name"
          key={'first_name'}
        >
          {({ input, meta, ...rest }) => (
            <div className=" xs:justify-self-start flex flex-col gap-y-2">
              <label htmlFor="signup-first_name" className="font-bold">
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
          title={
            props.errors && props.errors.last_name ? props.errors.last_name : ''
          }
          placeholder="Last Name"
          id="signup-last_name"
          key={'last_name'}
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
        title={
          props.errors && props.errors.username ? props.errors.username : ''
        }
        id="signup-username"
        placeholder="Username"
        key={'username'}
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
        title={props.errors && props.errors.email ? props.errors.email : ''}
        placeholder="Email Address"
        id="signup-email"
        key={'email'}
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
        title={props.errors && props.errors.gender ? props.errors.gender : ''}
      >
        <div className="justify-self-start ">
          <label
            htmlFor="signup-male"
            className={
              'font-bold ' +
              (props.errors && props.errors.gender ? 'text-red-900' : '')
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
            key={'gender'}
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
              key={'gender'}
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
        title={
          props.errors && props.errors.password ? props.errors.password : ''
        }
        id="signup-password"
        placeholder="Password"
        key={'password'}
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
          props.errors && props.errors.repeat_password
            ? props.errors.repeat_password
            : ''
        }
        id="signup-repeat-password"
        className={
          'rounded-md bg-[#2d2727] min-w-full block p-1 xs:p-1.5 sm:p-2 md:p-2 lg:p-3 outline-none ' +
          (props.errors && props.errors.repeat_password)
            ? 'outline-red-900'
            : ' outline-[#2d2727]'
        }
        placeholder="Repeat Password"
        key={'repeat_password'}
      >
        {({ input, meta, ...rest }) => (
          <div className=" flex flex-col gap-y-2">
            <label htmlFor="signup-repeat-password" className="font-bold">
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
          title={props.errors && props.errors.day ? props.errors.day : ''}
          defaultValue={'Day'}
          className={
            'appearance-none text-center  outline-none  py-1 px-4 2xs:px-4  xs:py-2  xs:px-10 sm:px-20 md:px-8 xl:px-10 block xs:justify-self-start focus:outline-none rounded-md bg-[#2d2727] ' +
            (props.errors && props.errors.day
              ? 'outline-red-900'
              : 'outline-[#2d2727]')
          }
          component={SelectInput}
          key={'day'}
        >
          <option className="p-2 md:p-4" key={0} value={'Day'} disabled>
            Day
          </option>
          {days.map((day, index) => (
            <option className="p-2 md:p-4" key={index + 1} value={day}>
              {day}
            </option>
          ))}
        </Field>
        <Field<string>
          name="month"
          title={props.errors && props.errors.month ? props.errors.month : ''}
          defaultValue={'Month'}
          className={
            'appearance-none text-center outline-none py-1 px-6 xs:py-2 xs:px-6 sm:px-12 md:px-6 xl:py-3 xl:px-3 block xs:justify-self-center focus:outline-none rounded-md bg-[#2d2727] ' +
            (props.errors && props.errors.month
              ? 'outline-red-900'
              : 'outline-[#2d2727]')
          }
          component={SelectInput}
          key={'month'}
        >
          <option value="Month" className="py-1 md:p-2" key={0} disabled>
            Month
          </option>
          {months.map(({ value }, index) => (
            <option className="p-2 md:p-4" key={index + 1} value={value}>
              {value}
            </option>
          ))}
        </Field>
        <Field<string>
          name="year"
          title={props.errors && props.errors.year ? props.errors.year : ''}
          defaultValue={'Year'}
          className={
            'appearance-none text-center outline-none py-1 px-6 xs:py-2 xs:px-10 sm:px-16 md:px-6 xl:px-8 block xs:justify-self-end focus:outline-none rounded-md bg-[#2d2727] ' +
            (props.errors && props.errors.year
              ? 'outline-red-900'
              : 'outline-[#2d2727]')
          }
          component={SelectInput}
          key={'year'}
        >
          <option className="p-2 md:p-4" key={0} value={'Year'} disabled>
            Year
          </option>
          {years.map((year, index) => (
            <option className="p-2 md:p-4" key={index + 1} value={year}>
              {year}
            </option>
          ))}
        </Field>
      </div>
      <hr className="border-1 border-gray-300 "></hr>
      <div className="text-red-900 font-bold flex justify-center">
        <button
          form="signup-form"
          disabled={
            (props.errors && Object.keys(props.errors).length !== 0) ||
            (props.hasSubmitErrors && !props.dirtySinceLastSubmit)
          }
          type="submit"
          className={
            'py-1 xs:py-1.5 lg:py-2 px-8 rounded-md  outline-[#2d2727] outline-none ' +
            ((props.errors && Object.keys(props.errors).length !== 0) ||
            (props.hasSubmitErrors && !props.dirtySinceLastSubmit)
              ? 'disabled bg-[#a79c9b]'
              : 'bg-[#2d2727] hover:bg-red-50')
          }
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default FormContent;
