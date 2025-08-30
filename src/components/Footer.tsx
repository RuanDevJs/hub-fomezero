'use client'

import Image from 'next/image'
import { Phone } from 'phosphor-react'

import Logo from "@/assets/logo.svg"

export default function Footer() {
  return (
    <footer className='bg-black px-14 py-12'>
      <div className="flex items-center justify-between">
        <div>
          <Image src={Logo} width={272} height={272} draggable={false} alt="" />
        </div>
        <nav>
          <ul className='flex items-center justify-center gap-10'>
            <li className='flex items-center gap-2'>
              <Phone size={32} color='#fff' />
              <a className='block w-full font-normal text-zinc-50 text-lg'>
                +55 0800 555 777
              </a>
            </li>
            <li>
              <a className='block w-full font-normal text-zinc-50 text-lg'>
                contato@hubfomezero.org
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
