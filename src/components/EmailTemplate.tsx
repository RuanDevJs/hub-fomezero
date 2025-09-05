import { IFamily } from '@/types/Family';
import Image from 'next/image';
import React from 'react'

interface IProps {
  name?: string;
  family?: IFamily;
}

export default function EmailTemplate({ name }: IProps) {
  return (
    <main className='h-dvh flex items-center justify-center'>
      <div className='text-center'>
        {/* <Image /> */}
        <h1 className='text-7xl text-blue-400'>Olá, Ruan Vitor 👋</h1>
        <p>Nossa família agradece de coração pela sua generosidade. Essa doação chegou em um momento muito importante e trouxe não apenas alimentos para nossa mesa, mas também esperança e força para seguirmos em frente. Que Deus abençoe sua vida e retribua em dobro todo o bem que você fez por nós.
        </p>
      </div>
    </main>
  )
}
