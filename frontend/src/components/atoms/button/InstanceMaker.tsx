/* eslint-disable react/require-default-props */
import { PropsWithChildren } from 'react';
import { TButtonElementProps } from '../../../types/elementProps';
import './Button.scss';

interface IProps extends Omit<TButtonElementProps, 'type'> {
  nativeType?: 'button' | 'submit' | 'reset';
  division?: 'btn' | 'check' | 'icon';
  type?: 'primary' | 'secondary' | 'tertiary';
  size?: 's' | 'm' | 'l' | 'xl';
}

export default function Button({
  children,
  nativeType = 'button',
  division = 'btn',
  size = 'l',
  type = 'primary',
  className = '',
  ...props
}: PropsWithChildren<IProps>) {
  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      // eslint-disable-next-line react/button-has-type
      type={nativeType}
      className={`${division} ${division}-${size} ${className} ${division}-${type}`}
    >
      {children}
    </button>
  );
}
