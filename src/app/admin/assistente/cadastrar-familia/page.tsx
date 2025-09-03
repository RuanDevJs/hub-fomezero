"use client"

export default function CadastrarFamilia() {
  return (
    <main className='p-10'>
      <h1 className='text-6xl'>Cadastrar Família</h1>
      <form className='flex flex-col gap-3 mt-5'>
        <div>
          <label htmlFor="" className='block text-lg font-medium text-zinc-700 py-1'>Nome da família</label>
          <input
            type="text"
            placeholder='Familia Silva'
            className='w-[560px] bg-zinc-100 py-3 px-5 text-base font-normal text-zinc-900 outline-none'
          />
        </div>
        <div>
          <label htmlFor="" className='block text-lg font-medium text-zinc-700 py-1'>Descrição da família</label>
          <textarea placeholder='Lorem Ipsum is simply dummy text of the printing and typesetting industry...' className='bg-zinc-100 py-3 px-5 text-base font-normal text-zinc-900 outline-none w-[560px] min-h-[120px] h-[120px] max-h-[120px]' />
        </div>
        <div>
          <label htmlFor="" className='block text-lg font-medium text-zinc-700 py-1'>CEP</label>
          <input type="text" placeholder='55560-970' max={8} maxLength={8} className='w-[560px] bg-zinc-100 py-3 px-5 text-base font-normal text-zinc-900 outline-none' />
        </div>
        <div>
          <label htmlFor="" className='block text-lg font-medium text-zinc-700 py-1'>Complemento</label>
          <input type="text" placeholder='Apartamento 302' className='w-[560px] bg-zinc-100 py-3 px-5 text-base font-normal text-zinc-900 outline-none' />
        </div>
        <button className='w-[560px] bg-blue-400 mt-3 py-3 px-5 text-base font-normal text-white outline-none'>
          Cadastrar família
        </button>
      </form>
    </main>
  )
}
