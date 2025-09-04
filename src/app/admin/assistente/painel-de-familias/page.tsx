"use client"

import Loading from "@/components/Loading";
import api from "@/services/api"

import { IAddress, IFamily, TypeFamilyPayload } from "@/types/Family";
import { useMutation, useQuery } from "@tanstack/react-query";

import Image from "next/image";
import { Camera, CheckCircle, MagnifyingGlass, Plus } from "phosphor-react"

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { pinata } from "@/services/pinata";

import { Dialog } from "primereact/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Toast } from "primereact/toast";


interface IResponseCep {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  estado: string;
  regiao: string;
}

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeForm = searchParams.get("form");

  const isModalActive = typeForm === "cadastrar-familia" ? true : false;
  const isModalAddPictureActive = typeForm === "adicionar-foto-da-familia" ? true : false;

  function handleClick() {
    router.push("/admin/assistente/painel-de-familias?form=cadastrar-familia")
  }

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

  function ColumnBodyFamilyName(props: { value: IFamily }) {
    return (
      <div className="flex items-center gap-3">
        <Image src={props.value.picture_url} alt="" width={250} height={250} className="w-[50px] h-[50px] rounded-[100%] object-cover" />
        <p className="text-base text-zinc-700 font-normal">{props.value.name}</p>
      </div>
    )
  }

  return (
    <main className='p-10 relative'>
      <header>
        <ul className="grid grid-cols-3">
          <li className="text-center border-r-2 border-zinc-300">
            <h1 className="text-8xl font-medium text-blue-400">12</h1>
            <p className="text-base font-normal text-zinc-500">Famĺias Cadastradas</p>
          </li>
          <li className="text-center border-r-2 border-zinc-300">
            <h1 className="text-8xl font-medium text-blue-400">3</h1>
            <p className="text-base font-normal text-zinc-500">Doadores Cadastrados</p>
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
        <DataTable value={data} loading={isLoading} header={() => <div className="flex justify-center">
          <button className="cursor-pointer flex gap-2 items-center justify-center px-5 py-3 bg-blue-500 rounded hover:scale-125 transition ease-in-out" onClick={handleClick}>
            <Plus size={23} color="#fff" />
            <span className="text-sm text-white font-medium">Adicionar família</span>
          </button>
        </div>}
        >
          <Column
            field="name"
            header={<ColumnHeader title="Família" />}
            headerClassName=""
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBodyFamilyName value={data} />}
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
            headerClassName="text-sm text-red-500 text-center"
            headerStyle={{ background: "#fff" }}
            body={data => <ColumnBody value={data.total_donations} />}
          />
        </DataTable>
      </div>

      <Dialog
        style={{ minWidth: 520 }}
        visible={isModalActive}
        onHide={() => router.push("/admin/assistente/painel-de-familias")}
        header={<ModalHeader />}
      >
        <ModalRegisterNewFamily />
      </Dialog>
      <Dialog
        style={{ minWidth: 520 }}
        visible={isModalAddPictureActive}
        onHide={() => router.push("/admin/assistente/painel-de-familias")}
        header={<ModalHeader />}
      >
        <ModalAddPicture />
      </Dialog>
    </main>
  )
}

function ModalHeader() {
  return (
    <h1 className="text-5xl font-normal text-blue-950 mr-7">Cadastrar Família</h1>
  )
}

async function registerFamily(payload: TypeFamilyPayload) {
  return await (await api.post("assistente-social/cadastrar-familia", payload)).data;
}

function ModalRegisterNewFamily() {
  const [addres, setAddress] = useState<IAddress>({} as IAddress);
  const inputAddressRef = useRef<HTMLInputElement>(null);

  const toasRef = useRef<Toast>(null);
  const router = useRouter();

  const registerNewFamilyMutate = useMutation({
    mutationFn: async (payload: TypeFamilyPayload) => await registerFamily(payload),
    onSuccess: async (data) => {
      const groupId = await (await pinata.groups.public.create({
        name: data.insertedId,
        isPublic: true
      })).id

      router.push(`/admin/assistente/painel-de-familias?form=adicionar-foto-da-familia&familia_id=${data.insertedId}&group_id=${groupId}`)
    }
  })

  async function fetchAddress() {
    if (inputAddressRef && inputAddressRef.current) {
      const inputValue = inputAddressRef.current.value;
      if (inputValue.length < 8) return;

      try {
        const response = await (await fetch(`https://viacep.com.br/ws/${inputValue}/json/`)).json() as IResponseCep;

        setAddress({
          cep: response.cep,
          city: response.localidade,
          neighborhood: response.bairro,
          region: response.regiao,
          complement: '',
          state: response.estado,
          street: response.logradouro,
        })

      } catch (error) {
        toasRef.current?.show({ severity: "error", summary: "Não foi possível localizar a família", detail: "Erro ao encontrar a família pelo CEP" });
        console.error(error);
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputName = event.currentTarget.inputName.value as string;
    const inputDescription = event.currentTarget.inputDescription.value as string;
    const inputComplement = event.currentTarget.inputComplement.value as string;

    if (!inputName.length || !inputDescription.length || !addres.cep) {
      return toasRef.current?.show({ severity: "error", summary: "Não foi possível cadastrar a família!", detail: "Por favor, preencha os dados corretamente!" });
    }

    await registerNewFamilyMutate.mutateAsync({
      name: inputName,
      description: inputDescription,
      total_donations: 0,
      address: {
        ...addres,
        complement: inputComplement
      },
      created_at: new Date(),
      picture_url: ''
    });

    toasRef.current?.show({ severity: "success", summary: "Família cadastrada com sucesso" });
  }

  return (
    <div>
      <h2 className="text-sm font-normal text-zinc-500">Preencha o formulário com os dados da família: </h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputName" className="block text-lg font-medium text-blue-950">Nome completo</label>
          <input name="inputName" type="text" className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1" placeholder="Família Silvasauro" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputDescription" className="block text-lg font-medium text-blue-950">Descrição</label>
          <input name="inputDescription" type="text" className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1" placeholder="A familia Silvasauro passa por dificuldades financeiras..." />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="mb-1.5">
            <label htmlFor="inputCep" className="block text-lg font-medium text-blue-950">Cep</label>
            <input
              type="text"
              className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1"
              placeholder="38440-246"
              maxLength={9}
              onBlur={fetchAddress}
              ref={inputAddressRef}
              name="inputCep"
            />
          </div>
          <div className="mb-1.5">
            <label className="block text-lg font-medium text-blue-950">Rua</label>
            <input type="text" className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1 cursor-not-allowed" disabled value={addres.street} />
          </div>
          <div className="mb-1.5">
            <label className="block text-lg font-medium text-blue-950">Bairro</label>
            <input type="text" className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1 cursor-not-allowed" disabled value={addres.neighborhood} />
          </div>
          <div className="mb-1.5">
            <label className="block text-lg font-medium text-blue-950">Cidade</label>
            <input type="text" className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1 cursor-not-allowed" disabled value={addres.city} />
          </div>
          <div className="mb-1.5">
            <label className="block text-lg font-medium text-blue-950">Região</label>
            <input type="text" className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1 cursor-not-allowed" disabled value={addres.region} />
          </div>
          <div className="mb-3.5">
            <label className="block text-lg font-medium text-blue-950">Complemento</label>
            <input name="inputComplement" type="text" className="w-full px-5 py-3 bg-zinc-100 outline-none text-base text-blue-950 font-normal mt-1" placeholder="Área do complemento..." />
          </div>
        </div>
        <button className="bg-blue-900 text-white px-5 py-3 outline-none text-base font-normal min-w-52 rounded cursor-pointer hover:bg-blue-950 transition ease-in-out flex items-center gap-2">Concluir Cadastro <CheckCircle size={25} /> </button>
      </form>
      <Toast ref={toasRef} />
    </div>
  )

}

function ModalAddPicture() {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const group_id = searchParams.get("group_id");
  const family_id = searchParams.get("familia_id");
  const router = useRouter();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setInputFile(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  async function handleClick() {
    if (inputFile && imageUrl) {
      const data = new FormData();
      data.set("file", inputFile);

      await api.post(`/assistente-social/upload-foto-familia?group_id=${group_id}&family_id=${family_id}`, data);
      router.push(`/assistente-social/painel-de-familias`);
    }
  }

  return (
    <div>
      <h2 className="text-sm font-normal text-zinc-500">Escolha uma foto para a família criada: </h2>
      <div className="mt-5">
        <div className="my-3 flex justify-center">
          {inputFile !== null && imageUrl
            ? <Image src={imageUrl} width={288} height={288} className="w-72 h-72 rounded-full object-cover" draggable={false} alt="" />
            : null
          }
        </div>
        <div>
          <label htmlFor="inputFile" className="border border-blue-900 text-blue-900 px-5 py-3 outline-none text-base font-medium min-w-52 rounded cursor-pointer hover:bg-blue-100 transition ease-in-out flex items-center justify-center gap-2">
            Escolher Foto da Família <Camera size={25} color="#1c398e" />
          </label>
          <input type="file" id="inputFile" className="hidden" onChange={handleChange} />
        </div>
        {
          inputFile !== null && imageUrl
            ? <div className="mt-3.5">
              <button className="w-full bg-blue-900 text-white px-5 py-3 outline-none text-base font-normal min-w-52 rounded cursor-pointer hover:bg-blue-950 transition ease-in-out flex items-center justify-center gap-2" onClick={handleClick}>
                Finalizar <CheckCircle size={25} />
              </button>
            </div>
            : null
        }
      </div>
    </div>
  )

}
