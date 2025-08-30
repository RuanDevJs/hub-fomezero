import Footer from '@/components/Footer'

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <div>{children}</div>
      <Footer />
    </div>
  )
}
