import Image from 'next/image'

import { BookmarkSimple, MagnifyingGlass } from 'phosphor-react'
import API from '@/services/api'

export default function Donation() {
  return (
    <section id='donation' className='mt-20 px-14'>
      <h1 className='text-6xl text-center text-zinc-800 leading-32'>Familias <span className='text-blue-300'>Carentes</span></h1>
      <div className='rounded-3xl w-[30%] my-3 mx-auto grid grid-cols-[1fr_minmax(auto,_52px)] items-center justify-center bg-gray-100 h-14 gap-3'>
        <input type="text" className='text-base font-normal text-zinc-700 w-full h-full px-5 outline-none' placeholder='CEP - Encontre famílias perto de você' />
        <button className='w-full h-full flex items-center justify-start cursor-pointer'>
          <MagnifyingGlass size={32} color='#333' />
        </button>
      </div>
      <div className='grid grid-cols-3 gap-5 my-14'>
        {API.map((data, index) => {
          return (
            <div className='bg-white shadow rounded-lg' key={index}>
              <div>
                <Image src={data.image_src} className='w-full h-full' quality={80} alt="" />
              </div>
              <div className='p-3'>
                <div className='flex items-center justify-between mb-1'>
                  <p className='font-normal text-zinc-500 text-sm'>{data.published_at.toLocaleDateString('pt-BR')}</p>
                  <p className='font-normal text-blue-300 text-sm'>{data.donations} doações</p>
                </div>
                <div className='mt-1.5'>
                  <h2 className='font-medium text-zinc-800 text-xl'>{data.familyName}</h2>
                  <p className='font-normal text-zinc-500 text-sm my-1.5'>
                    {data.description}
                  </p>
                </div>
                <div className='grid grid-cols-[50px_1fr] gap-3'>
                  <button className='rounded flex items-center justify-center border-[1.5px] border-blue-300 w-full py-3 text-base mt-2 text-blue-400 cursor-pointer'>
                    <BookmarkSimple size={25} />
                  </button>
                  <button className='rounded border-[1.5px] border-blue-300 w-full py-3 text-base mt-2 text-blue-400 cursor-pointer'>Fazer minha doação</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>

  )
}
