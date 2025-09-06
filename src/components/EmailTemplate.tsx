import { IFamily } from '@/types/Family';
import Image from 'next/image';
import Familia from "@/assets/pobres.jpg"

interface IProps {
  name?: string;
  family?: IFamily;
}

export default function EmailTemplate({ name }: IProps) {
  return (
    <main className='h-dvh flex items-center justify-center px-5'>
      <div className='text-center flex flex-col items-center'>
        <img src={""} alt="" className='w-64 h-64 rounded-full object-cover mb-3.5' />
        <h1 className='text-7xl text-blue-400 font-medium'>Olá, Ruan Vitor 👋</h1>
        <p className='text-lg text-zinc-500 font-normal'>Nossa família agradece de coração pela sua generosidade. Essa doação chegou em um momento muito importante e trouxe não apenas alimentos para nossa mesa, mas também esperança e força para seguirmos em frente. Que Deus abençoe sua vida e retribua em dobro todo o bem que você fez por nós.
        </p>
      </div>
    </main>
  )
}

// interface EmailTemplateProps {
//   firstName: string;
// }

// export default function EmailTemplate({ firstName }: EmailTemplateProps) {
//   return (
//     <div>
//       <h1>Welcome, {firstName}!</h1>
//     </div>
//   );
// }
