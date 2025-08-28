import React from 'react'

interface IButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: IButtonProps) {
  return (
    <button className='bg-white p-3.5 min-w-32 rounded-3xl cursor-pointer' {...props}>
      {children}
    </button>
  )
}
