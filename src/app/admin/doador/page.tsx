"use client"

import Image from 'next/image'
import Logo from "@/assets/logo.svg"
import { Gear, House, Phone, Plus } from 'phosphor-react'

export default function DonorPanel() {
  return (
    <div className='bg-white grid grid-cols-[minmax(280px,_auto)_1fr] h-dvh'>
      <aside className='bg-blue-400 p-3'>
        <nav className='flex flex-col justify-center h-full'>
          <div className='py-3'>
            <Image src={Logo} alt="" width={250} height={250} />
          </div>
          <ul className='mt-10 flex flex-col gap-5'>
            <li className='flex items-center gap-1 bg-blue-300 p-3 rounded'>
              <House size={25} color='#fff' />
              <a href="#" className='block p-1 text-base font-normal text-zinc-50'>Painel de Doações</a>
            </li>
            <li className='flex items-center gap-1 p-3 rounded'>
              <Plus size={25} color='#fff' />
              <a href="#" className='block p-1 text-base font-normal text-zinc-50'>Fazer uma nova doação</a>
            </li>
            <li className='flex items-center gap-1 p-3 rounded'>
              <Gear size={25} color='#fff' />
              <a href="#" className='block p-1 text-base font-normal text-zinc-50'>Minhas Configurações</a>
            </li>
            <li className='flex items-center gap-1 p-3 rounded'>
              <Phone size={25} color='#fff' />
              <a href="#" className='block p-1 text-base font-normal text-zinc-50'>Entrar em contato</a>
            </li>
          </ul>
          <a href="#" className='mt-auto'>Sair da minha conta</a>
        </nav>
      </aside>
      <main>Conteudo</main>
    </div>
  )
}
