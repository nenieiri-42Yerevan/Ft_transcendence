import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

const FieldValidator = (props: any) => {
  return (
    <Field<string>
      name="name"
      className=" rounded-md bg-[#2d2727] outline-[#2d2727] mt-2 outline-none min-w-full block p-1 md:p-2 lg:p-3"
      placeholder="Full Name"
      id="signup-name"
      // component={TextInput}
      // validate={required}
    ></Field>
  );
};
export default FieldValidator;
