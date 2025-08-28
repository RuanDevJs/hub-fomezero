"use client"

import Image from 'next/image'
import Logo from "@/assets/logo.svg"
import { MagnifyingGlass, Phone } from 'phosphor-react'
import Button from '@/components/Button'
import API from '@/services/api'

export default function Home() {
  return (
    <div className='bg-zinc-50'>
      <main id='page-home-background'>
        <header className='px-14 py-12'>
          <div className='flex items-center justify-between'>
            <nav>
              <ul className='flex items-center gap-8'>
                <li className='mr-2'>
                  <a href="#">
                    <Image src={Logo} width={270} height={270} alt="" draggable={false} quality={80} />
                  </a>
                </li>
                <li>
                  <a href="#" className='block w-full font-normal text-zinc-50 text-lg'>Home</a>
                </li>
                <li>
                  <a href="#" className='block w-full font-normal text-zinc-50 text-lg'>Familias Carentes</a>
                </li>
                <li>
                  <a href="#" className='block w-full font-normal text-zinc-50 text-lg'>Faça sua Doação</a>
                </li>
                <li>
                  <a href="#" className='block w-full font-normal text-zinc-50 text-lg'>Sobre</a>
                </li>
              </ul>
            </nav>
            <nav>
              <ul className='flex items-center justify-center gap-10'>
                <li className='flex items-center gap-2'>
                  <Phone size={32} color='#fff' />
                  <a className='block w-full font-normal text-zinc-50 text-lg'>
                    Entre em contato
                  </a>
                </li>
                <li>
                  <Button>Fazer Login</Button>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <div className='px-14 py-12'>
          <h1 className='text-8xl text-center text-white leading-32'>
            Alimente Esperança <br /> <span className='text-blue-300'>Transforme Vidas</span>
          </h1>
          <p className='w-2/4 my-3 mx-auto text-zinc-300 text-center'>Conectamos doadores e famílias em vulnerabilidade, tornando a doação de alimentos simples, rápida e segura. Juntos, podemos combater a fome e levar esperança a quem mais precisa.</p>
          <div className='text-center mt-10'>
            <Button>Fazer minha doação</Button>
          </div>
        </div>
      </main>
      <section id='donation' className='mt-20 px-14'>
        <h1 className='text-6xl text-center text-zinc-800 leading-32'>Familias <span className='text-blue-300'>Carentes</span></h1>
        <div className='rounded-3xl w-[30%] my-3 mx-auto grid grid-cols-[1fr_minmax(auto,_52px)] items-center justify-center bg-gray-100 h-14 gap-3'>
          <input type="text" className='text-base font-normal text-zinc-700 w-full h-full px-5 outline-none' placeholder='CEP - Encontre famílias perto de você' />
          <button className='w-full h-full flex items-center justify-start cursor-pointer'>
            <MagnifyingGlass size={32} color='#333' />
          </button>
        </div>
        <div className='grid grid-cols-3 gap-5 mt-14'>
          {API.map((data, index) => {
            return (
              <div className='rounded-4xl' key={index}>
                <div>
                  <Image src={data.image_src} quality={80} alt="" />
                </div>
                <div>
                  <div>
                    <p>{data.published_at.toLocaleDateString('pt-BR')}</p>
                    <p>{data.donations}</p>
                  </div>
                  <h2>{data.familyName}</h2>
                  <p>
                    {data.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
