"use client"

import Loading from "@/components/Loading";
import { useSession } from "@/context/SessionContext";
import api from "@/services/api"
import { TypeDonationPayload } from "@/types/Donation";

import { IFamily } from "@/types/Family";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQRCode } from "next-qrcode";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Heart, MagnifyingGlass } from "phosphor-react"

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast, ToastMessage } from "primereact/toast";
import { FormEvent, useRef, useState } from "react";

async function fetchFamily() {
  try {
    return (await api.get("assistente-social/listagem-familia")).data.data as IFamily[];
  } catch (error) {
    console.error(error)
  }
}

export default function AdminPanel() {
  const router = useRouter();
  const toastRef = useRef<Toast>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["doador-listagem-de-familia"],
    queryFn: fetchFamily,
  });

  const searchParams = useSearchParams();
  const isModalDonationActive = searchParams.get("modal");


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

  function ColumnBodyFamilyName(props: { data: IFamily }) {
    return (
      <div className="flex items-center gap-3">
        <Image src={props.data.picture_url} alt="" width={250} height={250} className="w-[50px] h-[50px] rounded-[100%] object-cover" />
        <p className="text-base text-zinc-700 font-normal">{props.data.name}</p>
      </div>
    )
  }

  function ActionsColumnBody({ data }: { data: IFamily }) {
    function handleDonation() {
      router.push(`/admin/doador/painel-de-familias?modal=fazer_doacao&family_id=${data._id}`);
    }
    return (
      <ul>
        <li>
          <button className="min-w-48 bg-blue-400 py-2 px-5 flex items-center justify-center gap-1.5 text-sm font-medium text-white rounded cursor-pointer hover:bg-blue-500 transition ease-in-out" onClick={handleDonation}>
            <Heart size={25} />
            Fazer doação
          </button>
        </li>
      </ul>
    )
  }

  function showToast(message: ToastMessage) {
    if (toastRef && toastRef.current) return toastRef.current.show(message)
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
            body={data => <ColumnBodyFamilyName data={data} />}
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
            header={<ColumnHeader title="Doações" />}
            headerClassName="text-sm text-red-500"
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBody value={data.total_donations} />}
            style={{ width: "5%", textAlign: "center" }}
          />
          <Column
            field=""
            header=""
            headerClassName="text-sm text-red-500"
            headerStyle={{ background: "#fff" }}
            body={(data) => <ActionsColumnBody data={data} />}
            bodyStyle={{ width: '10%' }}
          />
        </DataTable>
      </div>
      <Dialog visible={!!isModalDonationActive} onHide={() => router.push("/admin/doador/painel-de-familias")} header={<ModalHeader />}>
        <ModalDonation showToast={showToast} />
      </Dialog>

      <Toast ref={toastRef} />
    </main>
  )
}

function ModalHeader() {
  return (
    <h1 className="text-5xl font-normal text-blue-950 mr-7">Fazer minha Doação</h1>
  )
}

async function createDonation(payload: TypeDonationPayload) {
  return (await api.post("doador/fazer-doacao", payload)).data;
}

function ModalDonation({ showToast }: { showToast: (props: ToastMessage) => void }) {
  const { user } = useSession();
  const [activeQrCode, setActiveQrCode] = useState(false);
  const [form, setForm] = useState<{ message: string, price: number } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const { Canvas } = useQRCode();

  const searchParams = useSearchParams();
  const router = useRouter();

  const createDonationMutation = useMutation({
    mutationFn: (payload: TypeDonationPayload) => createDonation(payload),
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formRef && formRef.current) {
      const inputMessage = event.currentTarget.inputMessage.value as string;
      const inputPrice = Number(event.currentTarget.inputPrice.value) as number;

      if (inputMessage.length && inputPrice >= 5) {
        setForm({ message: inputMessage, price: inputPrice })
        return setActiveQrCode(true);
      }

      return showToast({
        severity: "error", summary: "Não foi possível fazer doação", detail: "Preencha corretamente os daados dos formulários!"
      });
    }
  }

  async function handleFinishDonation() {
    try {
      if (form !== null) {
        await createDonationMutation.mutateAsync({
          ...form,
          created_at: new Date(),
          family_id: searchParams.get("family_id")!,
          user_id: user._id,
          status: "INICIADA"
        })
      }

      showToast({ severity: "success", summary: "Doação feita com sucesso!", detail: "Sua solidariedade alimenta esperança e transforma vidas." });
      router.push("/admin/doador/painel-de-familias")
    } catch (error) {
      console.error(error)
      return showToast({
        severity: "error", summary: "Não foi possível fazer doação", detail: "Erro ao registrar a doação no sistema!"
      });
    }
  }

  if (activeQrCode) {
    return (
      <div>
        <h2 className="text-sm font-normal text-zinc-500">Escaneie o Qrcode para completar a doação: </h2>
        <div className="flex items-center justify-center">
          <Canvas
            text={`http://192.168.0.13:3030/donation?user_id=${user._id}&family_id=${searchParams.get("family_id")}`}
            options={{
              width: 350,
            }}
          />
        </div>
        <button className="bg-blue-900 text-white px-5 py-3 outline-none text-base font-normal w-full rounded cursor-pointer hover:bg-blue-950 transition ease-in-out flex items-center gap-2 justify-center" onClick={handleFinishDonation}>Concluir Doação <CheckCircle size={25} /> </button>
      </div>
    )
  } else {
    return (
      <div>
        <h2 className="text-sm font-normal text-zinc-500">Será gerado um QRCode para fazer o pagamento: </h2>
        <form className="mt-3" ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputMessage" className="block text-lg font-medium text-blue-950">Mensagem para a família: </label>
            <textarea
              name="inputMessage"
              className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1 min-h-36 h-36 max-h-36"
              placeholder="Deixe uma mensagem de apoio: "
              maxLength={220}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="inputPrice" className="block text-lg font-medium text-blue-950">Valor da doação: </label>
            <input
              name="inputPrice"
              type="number"
              className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1"
              placeholder="R$ 5,00"
              step={5}
              min={5}
            />
          </div>
          <button className="bg-blue-900 text-white px-5 py-3 outline-none text-base font-normal w-full rounded cursor-pointer hover:bg-blue-950 transition ease-in-out flex items-center gap-2 justify-center">Concluir Doação <CheckCircle size={25} /> </button>
        </form>
      </div>
    )
  }
}
