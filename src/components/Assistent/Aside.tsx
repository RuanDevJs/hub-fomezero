'use client'
import Image from 'next/image'
import Logo from "@/assets/logo.svg"
import { Plus, UserList } from 'phosphor-react'

export default function Aside() {
  return (
    <aside className='bg-blue-400 p-3'>
      <nav className='flex flex-col justify-center h-full'>
        <div className='py-3'>
          <Image src={Logo} alt="" width={250} height={250} />
        </div>
        <ul className='mt-10 flex flex-col gap-5'>
          {/* <li className='flex items-center gap-1 p-3 rounded'>
            <House size={25} color='#fff' />
            <a href="#" className='block p-1 text-base font-normal text-zinc-50'>Painel de Admin</a>
          </li> */}
          <li className='flex items-center gap-1 p-3 rounded bg-blue-300'>
            <UserList size={25} color='#fff' />
            <a href="#" className='block p-1 text-base font-normal text-zinc-50'>Painel de Familias</a>
          </li>
          {/* <li className='flex items-center gap-1 p-3 rounded'>
            <Gear size={25} color='#fff' />
            <a href="#" className='block p-1 text-base font-normal text-zinc-50'>Painel de Doadores</a>
          </li> */}
          {/* <li className='flex items-center gap-1 p-3 rounded'>
            <Phone size={25} color='#fff' />
            <a href="#" className='block p-1 text-base font-normal text-zinc-50'>Painel de Doações / Entregas</a>
          </li> */}
        </ul>
        <a href="#" className='mt-auto'>Sair da minha conta</a>
      </nav>
    </aside>
  )
}
