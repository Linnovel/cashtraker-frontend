import { DialogTitle } from "@headlessui/react"
import ExpenseForm from "./ExpenseForm"
import { createExpenseAction } from "@/actions/create-expense-action"
import { useFormState } from "react-dom"
import { useParams } from "next/navigation"
import ErrorMessage from "../ui/ErrorMessage"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function AddExpenseForm({
  closeModal,
}: {
  closeModal: () => void
}) {
  // useParams es un hook de next que nos permite obtener los params de la url, esto es para saber a que presupuesto se le va a agregar el gasto
  const { id } = useParams()
  // createExpense es una funcion que se encarga de llamar a la accion de crear gasto, bind es para pre-cargar el id del presupuesto al que se le va a agregar el gasto
  const createExpense = createExpenseAction.bind(null, +id)

  const [state, dispatch] = useFormState(createExpense, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state])

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Agregar Gasto
      </DialogTitle>

      <p className="text-xl font-bold text-gray-950">
        Llena el formulario y crea un {""}
        <span className="text-amber-500">gasto</span>
      </p>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
      <form
        action={dispatch}
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >
        <ExpenseForm />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Registrar Gasto"
        />
      </form>
    </>
  )
}
