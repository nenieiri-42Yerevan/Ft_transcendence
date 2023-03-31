import React from 'react';
import { FieldRenderProps } from 'react-final-form';

type Props = FieldRenderProps<string, any>;

const PasswordInput = ({ input, meta, ...rest }: Props) => (
  <input type="password" {...input} {...rest} />
);

export default PasswordInput;
