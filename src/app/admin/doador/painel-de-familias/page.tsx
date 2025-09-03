"use client"

import Loading from "@/components/Loading";
import api from "@/services/api"

import { IFamily } from "@/types/Family";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import { MagnifyingGlass } from "phosphor-react"

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import Pobres from "@/assets/pobres.jpg";

async function fetchFamily() {
  try {
    return (await api.get("assistente-social/listagem-familia")).data.data as IFamily[];
  } catch (error) {
    console.error(error)
  }
}

export default function AdminPanel() {
  const { data, isLoading } = useQuery({
    queryKey: ["listagem-de-familia"],
    queryFn: fetchFamily,
  });

  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  function ColumnHeader({ title }: { title: string }) {
    return (
      <p className="text-sm text-zinc-400 font-medium">{title}</p>
    )
  }

  function ColumnBody(props: { value: string }) {
    return (
      <p className="text-base text-zinc-700 font-normal">{props.value}</p>
    )
  }

  function ColumnBodyFamilyName(props: { value: string }) {
    return (
      <div className="flex items-center gap-3">
        <Image src={Pobres} alt="" className="w-[50px] h-[50px] rounded-[100%] object-cover" />
        <p className="text-base text-zinc-700 font-normal">{props.value}</p>
      </div>
    )
  }

  return (
    <main className='p-10'>
      <header>
        <ul className="grid grid-cols-2">
          <li className="text-center border-r-2 border-zinc-300">
            <h1 className="text-8xl font-medium text-blue-400">R$ 100</h1>
            <p className="text-base font-normal text-zinc-500">Em doações</p>
          </li>
          <li className="text-center">
            <h1 className="text-8xl font-medium text-blue-400">5</h1>
            <p className="text-base font-normal text-zinc-500">Doações Concluídas</p>
          </li>
        </ul>
        <div className='rounded-lg w-[100%] my-7 mx-auto grid grid-cols-[1fr_minmax(auto,_52px)] items-center justify-center bg-white border border-zinc-300 h-14 gap-3'>
          <input type="text" className='text-base font-normal text-zinc-700 w-full h-full px-5 outline-none' placeholder='CEP - Encontre famílias perto de você' />
          <button className='w-full h-full flex items-center justify-start cursor-pointer'>
            <MagnifyingGlass size={32} color='#333' />
          </button>
        </div>
      </header>

      <div className="w-[100%] mx-auto">
        <DataTable value={data} loading={isLoading}>
          <Column
            field="name"
            header={<ColumnHeader title="Família" />}
            headerClassName=""
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBodyFamilyName value={data.name} />}
          />
          <Column
            field="description"
            header={<ColumnHeader title="Descrição" />}
            headerClassName="text-sm text-red-500"
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBody value={data.description} />}
          />
          <Column
            field="address.region"
            header={<ColumnHeader title="Região" />}
            headerClassName="text-sm text-red-500"
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBody value={data.address.region} />}
          />
          <Column
            field="total_donations"
            header={<ColumnHeader title="Total de Doações" />}
            headerClassName="text-sm text-red-500"
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBody value={data.total_donations} />}
          />
          <Column
            field=""
            header=""
            headerClassName="text-sm text-red-500"
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBody value={data.total_donations} />}
          />
        </DataTable>
      </div>
    </main>
  )
}
