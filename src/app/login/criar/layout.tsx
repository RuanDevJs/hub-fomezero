'use client'
import { RegisterFormProvider } from "@/context/RegisterContext";
import { Toast } from "primereact/toast";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <RegisterFormProvider>
      <main className='grid grid-cols-2 items-center gap-10'>
        <aside id='page-login-background' className='flex items-center justify-center'>
          <h1 className='text-7xl font-medium text-center text-white leading-20'>Seu acesso <br /> <span className='text-blue-300'>Uma Vida Transforma</span></h1>
        </aside>
        <div className="animate-from-up">
          <div className='mb-4'>
            <h1 className='text-5xl text-zinc-800 font-normal'>Cadastro</h1>
            <p className='text-sm text-zinc-500 mt-3.5 w-[70%]'>Cadastre-se no HubFomeZero e faça parte de uma rede de solidariedade que conecta doadores a famílias em situação de vulnerabilidade. Em poucos passos, você pode transformar sua vontade de ajudar em impacto real.</p>
          </div>
          {children}
        </div>
      </main>
    </RegisterFormProvider>
  )
}
