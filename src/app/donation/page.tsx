"use client"

import { CheckCircle } from 'phosphor-react'

export default function Donation() {

  return (
    <div className='text-center mt-52 px-1'>
      <div className='flex justify-center'>
        <CheckCircle size={100} color="#2A7FFF" />
      </div>
      <h1 className='text-2xl font-medium text-blue-500 mt-2'>Pix feito com sucesso</h1>
      <p className='text-sm font-normal text-blue-500'>Obrigado pela sua doação! Sua solidariedade alimenta esperança e transforma vidas.</p>
    </div>
  )
}
