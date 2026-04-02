"use client"

import { useRouter } from "next/navigation"

function AddExpenseButton() {
  //primer paso agregar el presupuesto ID a la url, esto se hace con el hook useRouter de next
  const router = useRouter()

  return (
    <button
      type="button"
      className="bg-amber-500 px-10 py-2 rounded-lg text-black font-bold cursor-pointer"
      //Agregar el query param addExpense a la url, esto es para saber que se tiene que mostrar el modal de agregar gasto
      //    onClick={() => router.push(location.pathname + "?addExpense=true&showModal=true")}
      //Esta opcion es mejor
      onClick={() => router.push("?addExpense=true&showModal=true")}
    >
      Agregar Gasto
    </button>
  )
}

export default AddExpenseButton
