import { ButtonHTMLAttributes } from 'react'

import './style.scss';

//HTMLAttributes do react permite o elemento tipado herdar os atributos do html relacionados aquela tag
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function Button({isOutlined = false, ...props}: ButtonProps){
  return(
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}/>
  );
}