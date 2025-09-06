'use client'

import Image from 'next/image'
import Logo from "@/assets/logo.svg"

import { tv } from 'tailwind-variants'
import { Gear, Heartbeat, SignOut, UserList } from 'phosphor-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { logoutSession } from '@/app/actions'

const activeLink = tv({
  base: "flex items-center gap-1 p-3 rounded",
  variants: {
    active: {
      true: "bg-blue-300",
      false: "bg-transparent"
    }
  }
})

export default function Aside() {
  const pathaname = usePathname();
  return (
    <aside className='bg-blue-400 p-3'>
      <nav className='flex flex-col justify-center h-full'>
        <div className='py-3'>
          <Image src={Logo} alt="" width={250} height={250} />
        </div>
        <ul className='mt-10 flex flex-col gap-5'>
          <li className={activeLink({ active: pathaname === "/admin/doador/painel-de-familias" })}>
            <UserList size={25} color='#fff' />
            <Link href="/admin/doador/painel-de-familias" className='block p-1 text-base font-normal text-zinc-50'>Fazer uma doação</Link>
          </li>
          <li className={activeLink({ active: pathaname === "/admin/doador/minha-conta" })}>
            <Gear size={25} color='#fff' />
            <Link href="/admin/doador/minha-conta" className='block p-1 text-base font-normal text-zinc-50'>Minha Conta</Link>
          </li>
          <li className={activeLink({ active: pathaname === "/admin/doador/painel-de-doacoes" })}>
            <Heartbeat size={25} color='#fff' />
            <Link href="/admin/doador/painel-de-doacoes" className='block p-1 text-base font-normal text-zinc-50'>Painel de Doações</Link>
          </li>
        </ul>
        <button
          onClick={async () => await logoutSession()}
          className='transition ease-in-out mt-auto flex items-center px-5 py-3 text-center text-base font-normal text-white bg-blue-950 rounded-4xl hover:rounded-full hover:bg-blue-900'
        >
          <SignOut size={32} />
          Sair da minha conta
        </button>
      </nav>
    </aside>
  )
}
