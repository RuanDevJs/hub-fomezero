import Aside from '@/components/Donor/Aside'
import React from 'react'

export default function layout({ children }: React.PropsWithChildren) {
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
