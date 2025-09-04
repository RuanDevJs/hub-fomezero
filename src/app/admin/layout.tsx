import { SessionProvider } from '@/context/SessionContext'
import authenticateUser from '@/services/auth';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: React.PropsWithChildren) {
  try {
    const user = await authenticateUser();

    return (
      <SessionProvider user={user} isUserAuthenticated={!!user._id}>
        <div>
          {children}
        </div>
      </SessionProvider>
    )
  } catch (error) {
    console.error(error);
    redirect("/login?error=token-expirado")
  }
}
