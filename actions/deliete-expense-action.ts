"use server"

import getTokenFromCookies from "@/src/auth/token"
import { Budget, ErrorSchema, Expense, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type DeleteExpenseAction = {
  budgetId: Budget["id"]
  expenseId: Expense["id"]
}

type ActionStore = {
  error: string[]
  success: string
}

export async function deleteActionExpense(
  { budgetId, expenseId }: DeleteExpenseAction,
  prevState: ActionStore,
) {
  //Primero, sacamos el token para autenticar la peticion
  const token = getTokenFromCookies()

  //Luego, hacemos la peticion al backend para eliminar el gasto
  const url = `${process.env.API_URL}/api/budgets/${budgetId}/expenses/${expenseId}`

  //Hacemos la peticion al backend para eliminar el gasto
  const request = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  //Pasamos la peticion a json para poder manejar la respuesta del backend
  const json = await request.json()

  //Validamos la peticion
  //Si la peticion no es ok, mostramos el error y ya tenemos en el state el error para mostrarlo en el frontend
  if (!request.ok) {
    const { error } = ErrorSchema.parse(json)
    return {
      error: [error],
      success: "",
    }
  }

  //Si la peticion es ok, mostramos el mensaje de exito y ya tenemos en el state el mensaje de exito para mostrarlo en el frontend
  const success = SuccessSchema.parse(json)

  revalidatePath(`/admin/budgets/${budgetId}`)

  return {
    error: [],
    success: success,
  }
}
