"use client"

import { ChangeEvent, useRef, useState } from "react";

import { useSession } from "@/context/SessionContext"
import Image from "next/image"
import { Camera, CheckCircle } from "phosphor-react";
import api from "@/services/api";
import { Toast, ToastMessage } from "primereact/toast";

export default function MyAccount() {
  const { user } = useSession();
  const parsedDate = new Date(user.created_at).toLocaleDateString('pt-BR');
  const toastRef = useRef<Toast>(null);

  function activeToast(props: ToastMessage) {
    if (toastRef && toastRef.current) {
      toastRef.current.show(props);
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-7xl text-blue-950 font-medium">Minha Conta</h1>
      {user.picture_url ? <Image src={user.picture_url} draggable={false} alt="" width={280} height={280} className="mt-7 w-[280px] h-[280px] rounded object-cover border-[10px] border-zinc-200" /> : <FormAddPictureUrl activeToast={activeToast} userId={user._id} />}
      <div className="mt-10 grid grid-cols-2 gap-5">
        <div>
          <label className="text-lg font-medium text-blue-950">CPF</label>
          <input type="text" disabled className="w-full px-5 py-3.5 bg-zinc-100 rounded mt-1 text-base font-normal text-blue-950" value={user.cpf} />
        </div>
        <div>
          <label className="text-lg font-medium text-blue-950">Nome Completo</label>
          <input type="text" disabled className="w-full px-5 py-3.5 bg-zinc-100 rounded mt-1 text-base font-normal text-blue-950" value={user.name} />
        </div>
        <div>
          <label className="text-lg font-medium text-blue-950">Email</label>
          <input type="text" disabled className="w-full px-5 py-3.5 bg-zinc-100 rounded mt-1 text-base font-normal text-blue-950" value={user.email} />
        </div>
        <div>
          <label className="text-lg font-medium text-blue-950">Data de cadastro</label>
          <input type="text" disabled className="w-full px-5 py-3.5 bg-zinc-100 rounded mt-1 text-base font-normal text-blue-950" value={parsedDate} />
        </div>
      </div>
      <Toast ref={toastRef} />
    </div>
  )
}

interface IFormAddPictureUrlProps {
  userId: string;
  activeToast: (props: ToastMessage) => void;
}

function FormAddPictureUrl({ userId, activeToast }: IFormAddPictureUrlProps) {
  const [pictureUrl, setPictureUrl] = useState<string | null>();
  const [file, setFile] = useState<File | null>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target && event.target.files) {
      setFile(event.target.files[0]);
      setPictureUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  async function handleClick() {
    try {
      if (file && pictureUrl !== null) {
        const formData = new FormData();
        formData.set("file", file);

        await api.post(`doador/upload-foto-de-perfil?user_id=${userId}`, formData);
        activeToast({ severity: "success", summary: "Upload concluído", detail: "Foto de perfil enviada com sucesso!" });
      }
    } catch (error) {
      console.error(error)
      activeToast({ severity: "error", summary: "Erro ao enviar foto de perfil", detail: "Erro - Não foi possível enviar a foto de perfil!" })
    }
  }

  return (
    <div className="flex items-center gap-5 mt-7">
      {pictureUrl && <Image src={pictureUrl!} draggable={false} alt="" width={280} height={280} className="w-[280px] h-[280px] rounded object-cover border-[10px] border-zinc-200" />}
      <div className="flex flex-col gap-3">
        <label htmlFor="inputFile" className="bg-blue-900 px-5 py-2.5 min-w-56 text-white font-medium rounded text-base hover:bg-blue-950 transition ease-in-out cursor-pointer flex items-center justify-center gap-2">
          Adicionar foto de perfil <Camera size={25} color="#fff" />
        </label>
        {pictureUrl && pictureUrl.length ? <button className="border-2 border-blue-900 px-5 py-2.5 min-w-56 text-blue-950 font-medium rounded text-base cursor-pointer hover:bg-blue-900 hover:text-white transition ease-in-out flex items-center justify-center gap-2" onClick={handleClick}>
          Enviar foto de perfil
          <CheckCircle size={25} />
        </button> : null}
        <input type="file" id="inputFile" className="hidden" onChange={handleChange} />
      </div>
    </div>
  )
}
