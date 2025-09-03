"use client";

import { createContext, useContext, useState } from "react";

interface IForm {
  email: string;
  password: string;
  name: string;
  cpf: string;
}

interface IRegisterFormContext {
  form: IForm;
  handleForm: (payload: Partial<IForm>) => void;
}

const registerFormContext = createContext({} as IRegisterFormContext);

export function RegisterFormProvider({ children }: React.PropsWithChildren) {
  const [form, serForm] = useState<IForm>({} as IForm);

  function handleForm(payload: Partial<IForm>) {
    serForm((oldValue) => ({ ...oldValue, payload }))
  }

  return (
    <registerFormContext.Provider value={{ form, handleForm }}>
      {children}
    </registerFormContext.Provider>
  )
}

export function useRegisterForm() {
  const { form, handleForm } = useContext(registerFormContext);
  return { form, handleForm }
}
