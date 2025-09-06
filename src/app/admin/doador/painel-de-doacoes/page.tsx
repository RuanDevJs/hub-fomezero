"use client"

import Loading from "@/components/Loading";
import api from "@/services/api"
import { IAgregateDonation } from "@/types/Donation";

import { IFamily } from "@/types/Family";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import { Info, MagnifyingGlass } from "phosphor-react"

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";

import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

async function fetchDonations() {
  try {
    return (await api.get("doador/listagem-de-doacoes")).data.data as IAgregateDonation[];
  } catch (error) {
    console.error(error)
  }
}

export default function AdminPanel() {
  const toastRef = useRef<Toast>(null)
  const [isModalActive, setModalActive] = useState(false);
  const [currentDonation, setCurrentDonation] = useState<IAgregateDonation>({} as IAgregateDonation);


  const { data, isLoading } = useQuery({
    queryKey: ["listagem-de-doacoes"],
    queryFn: fetchDonations,
  });

  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  function handleSetCurrentDonation(data: IAgregateDonation) {
    setCurrentDonation(data);
    setModalActive(true);
  }

  function ColumnHeader({ title }: { title: string }) {
    return (
      <p className="text-sm text-zinc-400 font-medium">{title}</p>
    )
  }

  function ColumnBody(props: { value: string }) {
    return (
      <p className="text-base text-zinc-700 font-normal line-clamp-1 w-80">{props.value}</p>
    )
  }

  function ColumnBodyFamily(props: { family: IFamily }) {
    return (
      <div className="flex items-center gap-3">
        <Image src={props.family.picture_url} alt="" width={250} height={250} className="w-[50px] h-[50px] rounded-[100%] object-cover" />
        <p className="text-base text-zinc-700 font-normal">{props.family.name}</p>
      </div>
    )
  }

  function ColumnActions(props: { value: string, data: IAgregateDonation }) {
    return (
      <div className="flex items-center gap-3">
        <p className="text-base text-zinc-700 font-normal line-clamp-1 w-80">{props.value}</p>
        <button className="bg-blue-900 text-white px-5 py-3 outline-none text-base font-normal w-full rounded cursor-pointer hover:bg-blue-950 transition ease-in-out flex items-center gap-2 justify-center" onClick={() => handleSetCurrentDonation(props.data)}>Mais Detalhes <Info size={25} /> </button>
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
        <DataTable value={data} loading={isLoading} style={{ width: "100%" }} >
          <Column
            field="family.name"
            header={<ColumnHeader title="Doação feita para Família" />}
            headerClassName=""
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBodyFamily family={data.family} />}
          />
          <Column
            field="message"
            header={<ColumnHeader title="Mensagem para a família" />}
            headerClassName="text-sm text-red-500"
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBody value={data.message} />}
          />
          <Column
            field="price"
            header={<ColumnHeader title="Valor da doação" />}
            headerClassName="text-sm text-red-500"
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBody value={`R$ ${data.price},00`} />}
            style={{ width: "80px !important" }}
          />
          <Column
            field="created_at"
            header={<ColumnHeader title="Data da doação" />}
            headerStyle={{ width: "33px", background: "#fff" }}
            body={data => <ColumnActions value={new Date(data.created_at).toLocaleDateString('pt-BR')} data={data} />}
          />
        </DataTable>
      </div>
      <Dialog visible={isModalActive} onHide={() => setModalActive(oldValue => !oldValue)}>
        <Modal currentDonation={currentDonation} />
      </Dialog >
      <Toast ref={toastRef} />
    </main >
  )
}

interface IModalProps {
  currentDonation: IAgregateDonation;
}

function Modal({ currentDonation }: IModalProps) {
  return (
    <div>
      <form className="grid grid-cols-2 gap-3.5">
        <div style={{ gridColumn: "span 2" }} className="flex items-center justify-center">
          <Image width={280} height={280} src={currentDonation.family.picture_url} quality={75} draggable={false} className="w-[280px] h-[280px] object-cover rounded-full" alt="" />
        </div>
        <div>
          <label className="block text-lg font-medium text-blue-950">Valor da Doação: </label>
          <input
            type="text"
            className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1"
            value={`R$ ${currentDonation.price},00`}
            disabled
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-blue-950">Data da Doação: </label>
          <input
            type="text"
            className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1"
            value={new Date(currentDonation.created_at).toLocaleDateString("pt-BR")}
            disabled
          />
        </div>
        <div style={{ gridColumn: "span 2" }}>
          <label className="block text-lg font-medium text-blue-950">Mensagem de Doação: </label>
          <textarea
            className="w-full min-h-[120px] h-[120px] max-h-[120px] px-5 py-3 bg-zinc-100 outline-none text-sm text-blue-950 font-normal mt-1"
            value={currentDonation.message}
            disabled
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-blue-950">Status da Doação: </label>
          <input
            type="text"
            className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1"
            value={currentDonation.status}
            disabled
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-blue-950">Nome da Família: </label>
          <input
            type="text"
            className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1"
            value={currentDonation.family.name}
            disabled
          />
        </div>
      </form>
    </div>
  )
}

