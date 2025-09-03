'use client'

import { useRegisterForm } from "@/context/RegisterContext"
import { IUserDonorPayload } from "@/types/User";

import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";

import { FormEvent, useRef } from "react";
import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ProgressSpinner } from "primereact/progressspinner";

async function createNewDonor(payload: IUserDonorPayload) {
  return (await api.post("doador/criar", payload)).data;
}

export default function DadosPessoais() {
  const { form, showToast } = useRegisterForm();
  const navigate = useRouter();

  const registerDonorMutation = useMutation({
    mutationFn: async (payload: IUserDonorPayload) => createNewDonor(payload),
    onSuccess: () => navigate.push("/admin/doador")
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputName = event.currentTarget.inputName.value as string;
    const inputCpf = event.currentTarget.inputCpf.value as string;

    if (!inputName.length || !inputCpf.length) {
      return showToast({ severity: 'error', summary: "Não foi possível finalizar o cadastro", detail: "Nome ou cpf não preenchidos corretamente." })
    }

    const payload: IUserDonorPayload = {
      name: inputName,
      cpf: inputCpf,
      email: form.email,
      password: form.password,
      created_at: new Date(),
      role: 1
    }

    try {
      await registerDonorMutation.mutateAsync(payload);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error);
        const errorMessage = error.response?.data.error;
        showToast({ severity: 'error', summary: "Erro ao cadastrar usuário", detail: errorMessage })
      }
    }
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
      <button disabled={registerDonorMutation.isPending} className='bg-blue-400 h-16 w-full outline-none text-xl rounded text-white uppercase font-medium hover:bg-blue-500 ease-in-out transition cursor-pointer disabled:bg-zinc-300! disabled:cursor-not-allowed'>{registerDonorMutation.isPending ? <ProgressSpinner style={{ width: "32px", height: "32px" }} /> : "Finalizar meu cadastro"}</button>
    </form>
  )
}
