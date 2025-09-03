import Aside from "@/components/Assistent/Aside"
import Footer from "@/components/Footer"

export default async function AdminPanel({ children }: React.PropsWithChildren) {
  return (
    <div>
      <div className='bg-white grid grid-cols-[minmax(280px,_auto)_1fr] h-dvh'>
        <Aside />
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}
