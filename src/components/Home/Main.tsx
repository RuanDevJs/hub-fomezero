import Logo from "@/assets/logo.svg"
import { Phone } from 'phosphor-react'

import Button from '../Button'
import Image from 'next/image'

export default function Main() {
  return (
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
  )
}
