"use client"


import Donation from '@/components/Home/Donation'
import Main from '@/components/Home/Main'
import Sobre from '@/components/Home/Sobre'

export default function Home() {
  return (
    <div className='bg-50'>
      <Main />
      <Donation />
      <Sobre />
    </div>
  )
}
