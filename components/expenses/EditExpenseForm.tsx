import { DialogTitle } from "@headlessui/react"
import ExpenseForm from "./ExpenseForm"
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { DraftExpense, Expense } from "@/src/schemas"
import { useFormState } from "react-dom"
import { editActionExpense } from "@/actions/edit-expense-action"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"

export default function EditExpenseForm({
  closeModal,
}: {
  closeModal: () => void
}) {
  const [expense, setExpense] = useState<DraftExpense>()
  //TODO: sacar el budgetId y el expenseId de la url
  //useParams es un hook de next/navigation que nos permite sacar los parametros de la url
  const { id: budgetId } = useParams()

  //useSearchParams es un hook de next/navigation que nos permite sacar los parametros de la url,
  const searchParams = useSearchParams()
  //extraemos de la url el expenseId, que es el id del gasto que queremos editar
  const expenseId = searchParams.get("editExpenseId")!

  const editExpenseWithBudgetId = editActionExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId,
  })

  const [state, dispatch] = useFormState(editExpenseWithBudgetId, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //la respuesta no viene desde la rest api de express, sino que viene desde la ruta de next, que a su vez hace la llamada a la rest api de express, por lo que la respuesta ya viene parseada, no hace falta hacer res.json()
        //Y nos permite acceder al cookie que es donde se guarda el token de autenticacion, y asi podemos verificar que el usuario que esta haciendo la peticion es el mismo que el que esta logueado
        //POr que hace falta hacer eso? Porque el cookie se almacena solamente en el lado
        setExpense(data)
      })
  }, [])

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }
  }, [state])

  return (
    <>
      <DialogTitle as="h3" className="font-black text-4xl text-purple-950 my-5">
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold text-gray-950">
        Edita los detalles de un {""}
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
        {/* Poner el componente de ExpenseForm, ya cuando podemos sacar 
        de la url los datos hay que poner el expenseForm
        */}
        <ExpenseForm expense={expense} />
        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value="Guardar Cambios"
        />
      </form>
    </>
  )
}
