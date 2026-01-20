"use server"

import { DraftBudgetSchema, SuccessSchema } from "@/src/schemas"
import { cookies } from "next/headers"

type ActionState = {
  errors: string[]
  success: string
}

export async function createBudgetAction(
  prevState: ActionState,
  formData: FormData
) {
  // Lógica para crear un nuevo presupuesto

  const budget = DraftBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  })

  if (!budget.success) {
    return {
      errors: budget.error.issues.map((error) => error.message),
      success: "",
    }
  }

  // Aquí iría la lógica para guardar el presupuesto en la base de datos mas el token de autenticacion

  //primero obtener el token de autenticacion
  const token = cookies().get("CASHTRACKR_TOKEN")?.value

  const url = `${process.env.API_URL}/api/budgets`

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: budget.data.name,
      amount: budget.data.amount,
    }),
  })

  const json = await request.json()

  const success = SuccessSchema.parse(json)

  return {
    errors: [],
    success: "Presupuesto creado exitosamente",
  }
}
