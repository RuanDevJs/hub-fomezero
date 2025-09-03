"use client";

import { FormEvent } from "react";
import { useRegisterForm } from "@/context/RegisterContext";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const { handleForm, showToast } = useRegisterForm();
  const navigate = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputEmail = event.currentTarget.inputEmail.value as string;
    const inputPassword = event.currentTarget.inputPassword.value as string;

    if (!inputEmail.length || !inputPassword.length) {
      return showToast({ severity: 'error', summary: "Não foi possível fazer o cadastro", detail: "E-mail ou senha não preenchidos corretamente." })
    }

    handleForm({ email: inputEmail, password: inputPassword });
    navigate.push("/login/criar/dados-pessoais");
  }

  return (
    <form className='w-[70%]' onSubmit={event => handleSubmit(event)}>
      <div className='mb-3.5 w-full'>
        <label className='text-lg text-zinc-800 font-normal block mb-1.5'>Email</label>
        <input name="inputEmail" type="email" className='bg-zinc-100 p-3.5 w-full outline-none text-base rounded' placeholder='john.doe@example.com' />
      </div>
      <div className='mb-3.5'>
        <label className='text-lg text-zinc-800 font-normal block'>Senha</label>
        <input name="inputPassword" type="password" className='bg-zinc-100 p-3.5 w-full outline-none text-base rounded' placeholder='*******' />
      </div>
      <button className='bg-blue-400 p-3.5 w-full outline-none text-xl rounded text-white uppercase font-medium hover:bg-blue-500 ease-in-out transition cursor-pointer'>me cadastrar</button>
    </form>
  )
}
