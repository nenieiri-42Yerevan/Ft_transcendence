import React from 'react';
// import RadioInput from "./inputs/RadioInput";
import TextInput from './inputs/TextInput';
import PasswordInput from './inputs/PasswordInput';
// import SelectInput from "./inputs/SelectInput";
import { Field, FormSpy } from 'react-final-form';

const form2fa42 = (props: any) => {
  return (
    <form
      onSubmit={props.handleSubmit}
      id="signin-form"
      className="flex flex-col justify-around 
            backdrop-blur-md bg-[#9e9c9c33] outline-none 
            border-[#ffffff1a] bg-clip-padding shadow-md 
            shadow-[#2e364408]  min-w-full min-h-screen
             lg:min-w-fit lg:min-h-fit box-border rounded-none 
             lg:rounded-3xl xl:rounded-3xl m-0 lg:ml-10 xl:ml-10 
             p-12 px-12 text-white"
    >
      {props.submitError && (
        <FormSpy subscription={{ submitError: true }}>
          {({ submitError }) => (
            <pre className="text-red-900 text-xs">{submitError}</pre>
          )}
        </FormSpy>
      )}
      <div className="flex flex-col justify-between">
        <Field<string>
          name="tfa"
          placeholder="2fa code"
          id="2falogin"
          key={'2fa'}
        >
          {({ input, meta, ...rest }) => (
            <div className="mt-1 lg:mt-4 xl:mt-6">
              <label htmlFor="2falogin" className="font-bold">
                2FA:{' '}
              </label>
              {
                <TextInput
                  input={input}
                  className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3"
                  meta={meta}
                  {...rest}
                />
              }
            </div>
          )}
        </Field>
        <div className="mt-1 md:mt-20  xl:mt-10 text-red-900 font-bold flex justify-center">
          <button
            form="signin-form"
            type="submit"
            className="py-1 lg:py-2 px-8 rounded-md bg-[#2d2727] outline-[#2d2727] outline-none  hover:bg-red-50"
          >
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
};
export default form2fa42;
