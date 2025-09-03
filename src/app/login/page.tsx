"use client"

import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation"

import { Toast } from "primereact/toast";
import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";
import { IUser } from "@/types/User";
import { AxiosError } from "axios";

interface IAuthenticatePayload {
  email: string;
  password: string;
}

async function authenticateUser(payload: IAuthenticatePayload) {
  return api.post("doador/login", payload)
}

export default function Login() {
  const toastRef = useRef<Toast>(null);
  const router = useRouter();
  const authenticateMutation = useMutation({
    mutationFn: async (payload: IAuthenticatePayload) => await authenticateUser(payload),
    onSuccess: ({ data }) => {
      const user = data.user as IUser;

      switch (user.role) {
        case 1:
          router.push("/admin/doador")
          break;
        case 2:
          router.push("/admin/assistente/painel-de-familias")
          break;
        default:
          break;
      }
    }
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const inputEmail = event.currentTarget.inputEmail.value as string;
    const inputPassword = event.currentTarget.inputPassword.value as string;

    if (!inputEmail.length || !inputPassword.length) {
      return toastRef.current?.show({ severity: 'error', summary: "Não foi possível fazer o login", detail: "E-mail ou senha não preenchidos corretamente." })
    }

    try {
      await authenticateMutation.mutateAsync({ email: inputEmail, password: inputPassword });
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.error;
        return toastRef.current?.show({ severity: 'error', summary: "Não foi possível fazer login", detail: errorMessage })
      }
    }
  }

  return (
    <main className='grid grid-cols-2 items-center gap-10'>
      <aside id='page-login-background' className='flex items-center justify-center'>
        <h1 className='text-7xl font-medium text-center text-white leading-20'>Seu acesso <br /> <span className='text-blue-300'>Uma Vida Transforma</span></h1>
      </aside>
      <div className="animate-from-up">
        <div className='mb-4'>
          <h1 className='text-5xl text-zinc-800 font-normal'>Login</h1>
          <p className='text-sm text-zinc-500 mt-3.5 w-[70%]'>Cadastre-se no HubFomeZero e faça parte de uma rede de solidariedade que conecta doadores a famílias em situação de vulnerabilidade. Em poucos passos, você pode transformar sua vontade de ajudar em impacto real.</p>
        </div>
        <form className='w-[70%]' onSubmit={(event) => handleSubmit(event)}>
          <div className='mb-3.5 w-full'>
            <label className='text-lg text-zinc-800 font-normal block mb-1.5'>Email</label>
            <input name="inputEmail" type="email" className='bg-zinc-100 p-3.5 w-full outline-none text-base rounded' placeholder='john.doe@example.com' />
          </div>
          <div className='mb-3.5'>
            <label className='text-lg text-zinc-800 font-normal block'>Senha</label>
            <input name="inputPassword" type="password" className='bg-zinc-100 p-3.5 w-full outline-none text-base rounded' placeholder='*******' />
          </div>
          <button className='bg-blue-400 p-3.5 w-full outline-none text-xl rounded text-white uppercase font-medium hover:bg-blue-500 ease-in-out transition cursor-pointer'>fazer login</button>
        </form>
        <div className='mt-8'>
          <h2 className='text-xl text-zinc-800 font-normal'>Cadastre-se</h2>
          <p className='text-sm text-zinc-500 w-[70%] mb-3 mt-0.5'>Crie sua conta e comece a transformar vidas hoje mesmo!</p>
          <button className='bg-blue-400 px-3 py-2 outline-none text-base rounded text-white font-normal hover:bg-blue-500 ease-in-out transition cursor-pointer' onClick={() => router.push("/login/criar")}>Me cadastrar</button>
        </div>
      </div>
      <Toast ref={toastRef} />
    </main>
  )
}
