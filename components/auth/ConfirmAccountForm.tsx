"use client"
import { confirmAccountAction } from "@/actions/confirm-account-action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useRouter } from "next/navigation"
import React from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

//EXCELENTE EJEMPLO DE COMO USAR UN STATE, SERVER ACTION EN UN COMPONENTE SIN FORM
//Y ENVIAR PARAMETROS A LA SERVER ACTION DESDE EL COMPONENTE CLIENT
function ConfirmAccountForm() {
  const router = useRouter()
  const [isComplete, setIsComplete] = React.useState(false)
  const [token, setToken] = React.useState("")
  //Bindear el token al confirmAccountAction para enviarlo como parametro
  const confirmAccountWithToken = confirmAccountAction.bind(null, token)
  //Recuerda, para usar useFormState, el componente debe ser client component y debe estar dentro de un form con action que llame a una action server
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
    errors: [],
    success: "",
  })

  //Cuando el pin input este completo, llamar a la dispatch para ejecutar la action server
  React.useEffect(() => {
    if (isComplete) {
      dispatch()
    }
  }, [isComplete])

  // Manejar el cambio en el PinInput, no hace falta el event, la libreria lo maneja
  const handleChange = (token: string) => {
    //se pone primero como false para reiniciar el estado y permitir reenviar el formulario si es necesario
    setIsComplete(false)
    setToken(token)
  }

  //cambiar el state a true y asi disparar la useEffect que llama a la dispatch
  const handleComplete = () => {
    setIsComplete(true)
  }

  //Mostrar notificaciones de error usando react-toastify
  React.useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(error)
      })
    }
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          //redireccionar al login despues de cerrar la notificacion
          router.push("/auth/login")
          //ejemplos de otras formas de redireccionar
          // router.back("/auth/login")
          // router.replace("/auth/login")
        },
      })
    }
  }, [state])

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 border border-gray-300 rounded-lg placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 rounded-lg placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 rounded-lg placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 rounded-lg placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 rounded-lg placeholder-white shadow text-center" />
        <PinInputField className="h-10 w-10 border border-gray-300 rounded-lg placeholder-white shadow text-center" />
      </PinInput>
    </div>
  )
}

export default ConfirmAccountForm
