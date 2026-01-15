import { validateTokenAction } from "@/actions/validate-token-action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import React from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"

type ValidateTokenFormProps = {
  setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export default function ValidateTokenForm({
  setIsValidToken,
  token,
  setToken,
}: ValidateTokenFormProps) {
  const [isComplete, setIsComplete] = React.useState<boolean>(false)

  //Como pasar parametros a la action desde aqui?
  //con esta variable intermedia funciona
  const validateTokenInput = validateTokenAction.bind(null, token)

  //Se cambia por la variable de arrina
  const [state, dispatch] = useFormState(validateTokenInput, {
    errors: [],
    success: "",
  })

  //recuerda que el state contiene errors y success y sus mensajes
  //console.log(state)

  React.useEffect(() => {
    if (isComplete) {
      dispatch()
    }
  }, [isComplete])

  React.useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach((error) => {
        toast.error(error)
      })
    }
    if (state.success) {
      toast.success(state.success)
      setIsValidToken(true)
    }
  }, [state])

  const handleChange = (token: string) => {
    setIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}
