'use client'

import { useRegisterForm } from "@/context/RegisterContext"
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { FormEvent, useRef } from "react";

export default function DadosPessoais() {
  const { form, handleForm } = useRegisterForm();
  const toastRef = useRef<Toast>(null);
  const navigate = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputName = event.currentTarget.inputName.value as string;
    const inputCpf = event.currentTarget.inputCpf.value as string;

    if (!inputName.length || !inputCpf.length) {
      return toastRef.current?.show({ severity: 'error', summary: "Não foi possível finalizar o cadastro", detail: "Nome ou cpf não preenchidos corretamente." })
    }

    handleForm({ name: inputName, cpf: inputCpf });
    navigate.push("/login/criar/dados-pessoais");
  }

  return (
    <form className='w-[70%]' onSubmit={event => handleSubmit(event)}>
      <div className='mb-3.5 w-full'>
        <label className='text-lg text-zinc-800 font-normal block mb-1.5'>Nome Completo</label>
        <input name="inputName" type="text" className='bg-zinc-100 p-3.5 w-full outline-none text-base rounded' placeholder='John Doe' />
      </div>
      <div className='mb-3.5'>
        <label className='text-lg text-zinc-800 font-normal block'>CPF</label>
        <input name="inputCpf" type="text" className='bg-zinc-100 p-3.5 w-full outline-none text-base rounded' placeholder='123.456.789-10' />
      </div>
      <button className='bg-blue-400 p-3.5 w-full outline-none text-xl rounded text-white uppercase font-medium hover:bg-blue-500 ease-in-out transition cursor-pointer'>Finalizar meu cadastro</button>
      <Toast ref={toastRef} />
    </form>
  )
}
