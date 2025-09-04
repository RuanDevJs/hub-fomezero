"use client";

import { IParsedUser } from "@/types/User";
import { createContext, ReactNode, useContext } from "react";

interface IContext {
  user: IParsedUser;
  isUserAuthenticated: boolean;
}

interface IContextProvider {
  user: IParsedUser;
  isUserAuthenticated: boolean;
  children: ReactNode;
}

const sessionContext = createContext({} as IContext);

export function SessionProvider({ user, isUserAuthenticated, children }: IContextProvider) {
  return (
    <sessionContext.Provider value={{ user, isUserAuthenticated }}>
      {children}
    </sessionContext.Provider>
  )
}

export function useSession() {
  const { user, isUserAuthenticated } = useContext(sessionContext);
  return { user, isUserAuthenticated }
}
