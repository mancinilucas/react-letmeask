import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

//HTMLAttributes do react permite o elemento tipado herdar os atributos do html relacionados aquela tag
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps){
  return(
    <button className="button" {...props}/>
  );
}