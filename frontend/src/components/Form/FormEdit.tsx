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
  if (err.email) return err.email;
  if (err.password) return err.password;
  if (err.repeat_password) return err.repeat_password;
  return undefined;
};

const FormContent = (props: any) => {
  return (
    <form
      onSubmit={props.handleSubmit}
      id="edit-form"
      className="flex flex-col justify-around
                    backdrop-blur-md bg-[#9e9c9c33] outline-none border-[#2d2727]
                    bg-clip-padding shadow-md shadow-[#2e364408] min-w-full
                    min-h-screen md:min-w-fit md:min-h-fit box-border rounded-none
                    md:rounded-3xl xl:rounded-3xl px-4 xs:px-6
                    sm:px-12 md:px-6 py-4 text-white gap-y-5"
    >
      <div className="text-xl 2xs:text-xl xs:text-2xl md:text-2xl lg:3xl flex justify-center block">
        <p>
          Enjoy the <b className="text-red-900">Game</b>
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
          id="edit-first_name"
          key={'first_name'}
        >
          {({ input, meta, ...rest }) => (
            <div className=" xs:justify-self-start flex flex-col gap-y-2">
              <label htmlFor="edit-first_name" className="font-bold">
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
          id="edit-last_name"
          key={'last_name'}
        >
          {({ input, meta, ...rest }) => (
            <div className="xs:justify-self-end  flex flex-col gap-y-2">
              <label htmlFor="edit-last_name" className="font-bold">
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
        name="email"
        title={props.errors && props.errors.email ? props.errors.email : ''}
        placeholder="Email Address"
        id="edit-email"
        key={'email'}
      >
        {({ input, meta, ...rest }) => (
          <div className=" flex flex-col gap-y-2">
            <label htmlFor="edit-email" className="font-bold">
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
      <hr className="border-1 border-gray-300"></hr>
      <Field<string>
        name="password"
        title={
          props.errors && props.errors.password ? props.errors.password : ''
        }
        id="edit-password"
        placeholder="Password"
        key={'password'}
      >
        {({ input, meta, ...rest }) => (
          <div className=" flex flex-col gap-y-2">
            <label htmlFor="edit-password" className="font-bold">
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
        id="edit-repeat-password"
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
            <label htmlFor="edit-repeat-password" className="font-bold">
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
      <div className="text-red-900 font-bold flex justify-center">
        <button
          form="edit-form"
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
          Save
        </button>
      </div>
    </form>
  );
};

export default FormContent;
