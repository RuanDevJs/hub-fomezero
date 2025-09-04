"use client"

import Profile from "@/assets/picture.png"
import { useSession } from "@/context/SessionContext"
import Image from "next/image"

export default function MyAccount() {
  const { user } = useSession();
  const parsedDate = new Date(user.created_at).toLocaleDateString('pt-BR');

  return (
    <div className="p-10">
      <h1 className="text-7xl text-blue-950 font-medium">Minha Conta</h1>
      <div className="flex items-center gap-5 mt-7">
        <Image src={Profile} draggable={false} alt="" width={280} height={280} className="w-[280px] h-[280px] rounded object-cover border-[10px] border-zinc-200" />
        <div className="flex flex-col gap-3">
          <button className="bg-blue-900 px-5 py-2.5 w-56 text-white font-medium rounded text-base hover:bg-blue-950 transition ease-in-out cursor-pointer">Alterar foto de perfil</button>
          <button className="border-2 border-blue-900 px-5 py-2.5 w-56 text-blue-950 font-medium rounded text-base cursor-pointer">Remover foto</button>
        </div>
      </div>
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
    </div>
  )
}
