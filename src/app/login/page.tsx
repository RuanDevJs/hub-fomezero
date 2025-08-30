import React from 'react'

export default function Login() {
  return (
    <main className='grid grid-cols-2'>
      <aside id='page-login-background' className='flex items-center justify-center'>
        <h1 className='text-7xl text-center text-white leading-20'>Seu acesso <br /> <span className='text-blue-300'>Uma Vida Transforma</span></h1>
      </aside>
      <div>
        <h1>Login</h1>
        <p>Cadastre-se no HubFomeZero e faça parte de uma rede de solidariedade que conecta doadores a famílias em situação de vulnerabilidade. Em poucos passos, você pode transformar sua vontade de ajudar em impacto real.</p>
        <form>
          <div>
            <label>Email</label>
            <input type="email" />
          </div>
          <div>
            <label>Senha</label>
            <input type="password" />
          </div>
          <button>fazer login</button>
          <p>Crie sua conta e comece a transformar vidas hoje mesmo!</p>
        </form>
      </div>
    </main>
  )
}
