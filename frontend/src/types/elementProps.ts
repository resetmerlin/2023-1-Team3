import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

export type TButtonElementProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type TInputElementProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
