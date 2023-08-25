/* eslint-disable react/require-default-props */
import { PropsWithChildren } from 'react';
import './Header.scss';

interface IProps {
  page?: 'home' | 'save' | 'message' | 'setting';
  size?: 's' | 'm' | 'l' | 'xl';
  className?: '';
  popup?: true | false;
}

export default function Header({
  children,
  page = 'setting',
  size = 'l',
  className = '',
  popup = false,
  ...props
}: PropsWithChildren<IProps>) {
  return (
    <header
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={`${page}-header header-${size} ${className} ${!popup}-header header`}
    >
      {children}
    </header>
  );
}
