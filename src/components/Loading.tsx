import { Warning } from 'phosphor-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='flex flex-col items-center loading'>
      <Warning size={72} color='#51A2FF' />
      <p className='text-xl font-medium text-zinc-500 py-1'>Carregando</p>
      <p className='text-sm font-normal text-zinc-500'>Cada segundo conta para transformar vidas.</p>
    </div>
  )
}
