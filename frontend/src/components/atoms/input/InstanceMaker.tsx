/* eslint-disable react/require-default-props */
import { PropsWithChildren } from 'react';
import { TInputElementProps } from '../../../types/elementProps';
import './Input.scss';

interface IProps extends Omit<TInputElementProps, 'type'> {
  nativeType?: 'email' | 'text' | 'password' | 'date' | 'radio';
  type?: 'primary' | 'secondary' | 'tertiary';
  size?: 'm';
}

export default function Input({
  children,
  nativeType = 'text',
  size = 'm',
  type = 'primary',
  placeholder = '',
  className = '',
  id = '',
  ...props
}: PropsWithChildren<IProps>) {
  return (
    <input
      {...props}
      type={nativeType}
      id={id}
      placeholder={placeholder}
      className={`input-${size} ${className} input-${type}`}
    />
  );
}
