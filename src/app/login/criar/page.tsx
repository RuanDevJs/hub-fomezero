import React from 'react'

export default function Login() {
  return (
    <main className='grid grid-cols-2 items-center gap-10'>
      <aside id='page-login-background' className='flex items-center justify-center'>
        <h1 className='text-7xl font-medium text-center text-white leading-20'>Seu acesso <br /> <span className='text-blue-300'>Uma Vida Transforma</span></h1>
      </aside>
      <div>
        <div className='mb-4'>
          <h1 className='text-5xl text-zinc-800 font-normal'>Cadastro</h1>
          <p className='text-sm text-zinc-500 mt-3.5 w-[70%]'>Cadastre-se no HubFomeZero e faça parte de uma rede de solidariedade que conecta doadores a famílias em situação de vulnerabilidade. Em poucos passos, você pode transformar sua vontade de ajudar em impacto real.</p>
        </div>
        <form className='w-[70%]'>
          <div className='mb-3.5 w-full'>
            <label className='text-lg text-zinc-800 font-normal block mb-1.5'>Email</label>
            <input type="email" className='bg-zinc-100 p-3.5 w-full outline-none text-base rounded' placeholder='john.doe@example.com' />
          </div>
          <div className='mb-3.5'>
            <label className='text-lg text-zinc-800 font-normal block'>Senha</label>
            <input type="password" className='bg-zinc-100 p-3.5 w-full outline-none text-base rounded' placeholder='*******' />
          </div>
          <button className='bg-blue-400 p-3.5 w-full outline-none text-xl rounded text-white uppercase font-medium hover:bg-blue-500 ease-in-out transition cursor-pointer'>me cadastrar</button>
        </form>
      </div>
    </main>
  )
}
