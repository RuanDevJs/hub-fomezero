'use client'
import Image from 'next/image'
import Logo from "@/assets/logo.svg"

import { SignOut, UserList, Heartbeat } from 'phosphor-react'
import { tv } from 'tailwind-variants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname();
  return (
    <aside className='bg-blue-400 p-3'>
      <nav className='flex flex-col justify-center h-full'>
        <div className='py-3'>
          <Image src={Logo} alt="" width={250} height={250} />
        </div>
        <ul className='mt-10 flex flex-col gap-5'>
          <li className={activeLink({ active: pathname === "/admin/assistente/painel-de-familias" })}>
            <UserList size={25} color='#fff' />
            <Link href="/admin/assistente/painel-de-familias" className='block p-1 text-base font-normal text-zinc-50'>Painel de famílias</Link>
          </li>
          <li className={activeLink({ active: pathname === "/admin/assistente/painel-de-doacoes" })}>
            <Heartbeat size={25} color='#fff' />
            <Link href="/admin/assistente/painel-de-doacoes" className='block p-1 text-base font-normal text-zinc-50'>Painel de doações</Link>
          </li>
        </ul>
        <a
          href="#"
          className='transition ease-in-out mt-auto flex items-center px-5 py-3 text-center text-base font-normal text-white bg-blue-950 rounded-4xl hover:rounded-full hover:bg-blue-900'
          onClick={async () => await logoutSession()}
        >
          <SignOut size={32} />
          Sair da minha conta
        </a>
      </nav>
    </aside>
  )
}
