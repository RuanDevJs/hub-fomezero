"use client";

import { Toast, ToastMessage, ToastProps } from "primereact/toast";
import { createContext, useContext, useRef, useState } from "react";

interface IForm {
  email: string;
  password: string;
}

interface IRegisterFormContext {
  form: IForm;
  handleForm: (payload: IForm) => void;
  showToast: (options: ToastMessage) => void;
}

const registerFormContext = createContext({} as IRegisterFormContext);

export function RegisterFormProvider({ children }: React.PropsWithChildren) {
  const toastRef = useRef<Toast>(null);
  const [form, setForm] = useState<IForm>({} as IForm);

  // toastRef.current?.show({ severity: "error", summary: "Deu ruim" })

  function handleForm(payload: IForm) {
    setForm((oldValue) => ({ ...oldValue, ...payload }))
  }

  function showToast(options: ToastMessage) {
    toastRef.current?.show(options)
  }

  return (
    <registerFormContext.Provider value={{ form, handleForm, showToast }}>
      {children}
      <Toast ref={toastRef} />
    </registerFormContext.Provider>
  )
}

export function useRegisterForm() {
  const { form, handleForm, showToast } = useContext(registerFormContext);
  return { form, handleForm, showToast }
}
