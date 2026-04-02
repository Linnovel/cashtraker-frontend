"use server"

import getTokenFromCookies from "@/src/auth/token"
import { DraftExpenseSchema, ErrorSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
  errors: string[]
  success: string
}

export async function createExpenseAction(
  budgetId: number,
  prevState: ActionStateType,
  formData: FormData,
) {
  console.log("Creando gasto...")
  const expenseData = {
    name: formData.get("name"),
    amount: formData.get("amount"),
  }

  //Safeparse para validar los datos del gasto, si no son validos se retornan los errores, si son validos se crea el gasto y se retorna un mensaje de exito
  const expense = DraftExpenseSchema.safeParse(expenseData)

  if (!expense.success) {
    return {
      errors: expense.error.issues.map((issue) => issue.message),
      success: "",
    }
  }

  //Generar gasto
  const token = getTokenFromCookies()

  const url = `${process.env.API_URL}/api/budgets/${budgetId}/expenses`

  //hacemos la peticion
  const budgetRequest = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: expense.data?.name,
      amount: expense.data?.amount,
    }),
  })

  const contentType = budgetRequest.headers.get("content-type") || ""
  const isJson = contentType.includes("application/json")
  const responseBody = isJson
    ? await budgetRequest.json()
    : await budgetRequest.text()

  //si la peticion no fue exitosa, retornamos los errores
  if (!budgetRequest.ok) {
    if (isJson) {
      const { error } = ErrorSchema.parse(responseBody)
      return {
        errors: [error],
        success: "",
      }
    }

    return {
      errors: [
        "No se pudo crear el gasto. Verifica API_URL y el endpoint del backend.",
      ],
      success: "",
    }
  }

  const success = SuccessSchema.parse(responseBody)

  revalidatePath(`/admin/budgets/${budgetId}`)

  return {
    errors: [],
    success: success,
  }
}
