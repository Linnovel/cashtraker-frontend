"use server"

import getTokenFromCookies from "@/src/auth/token"
import {
  Budget,
  DraftBudgetSchema,
  ErrorSchema,
  SuccessSchema,
} from "@/src/schemas"
import { revalidatePath, revalidateTag } from "next/cache"
type EditActionState = {
  errors: string[]
  success: string
}

export async function editBudgetAction(
  budgetId: Budget["id"],
  prevState: EditActionState,
  formData: FormData,
) {
  //parsing y validacion de los datos del formulario
  const editBudget = DraftBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  })

  //validation de los datos
  if (!editBudget.success) {
    return {
      errors: editBudget.error.issues.map((err) => err.message),
      success: "",
    }
  }

  //obtener token de las cookies
  const token = getTokenFromCookies()

  //fetching
  const url = `${process.env.API_URL}/api/budgets/${budgetId}`
  const request = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(editBudget.data),
    //Mandarlo asi para evitar que el backend tenga que lidiar con los campos vacíos, ya que el schema no los acepta como opcionales
    //Mejor mandarlo de forma explícita, para que el backend no tenga que lidiar con los campos vacíos, ya que el schema no los acepta como opcionales / explicita es mas segura y mas legible
    //body: JSON.stringify(editBudget.data).
    // Razón: en ese punto ya validaste y limpiaste los datos con DraftBudgetSchema, así que enviar el objeto completo es más simple y no repites campos manualmente. Solo cambiaría a propiedades explícitas si el objeto pudiera traer más cosas de las que quieres mandar al backend.
    body: JSON.stringify({
      name: editBudget.data.name,
      amount: editBudget.data.amount,
    }),
  })

  //validacion del request
  const json = await request.json()
  if (!request.ok) {
    const { error } = ErrorSchema.parse(json)
    return {
      errors: [error],
      success: "",
    }
  }

  //validacion de la respuesta
  const success = SuccessSchema.parse(json)
  //Revalida toda la url, en este caso admin y todas las peticiones que se hagan a esa url, para mostrar los cambios en la pagina. Esto es necesario porque la pagina de admin no tiene un tag específico para los presupuestos, por lo que no se puede revalidar solo esa parte de la pagina.
  revalidatePath("/admin")
  //Y revalidateTag se usa cuando se tiene un tag específico para los presupuestos, y se quiere revalidar solo esa parte de la pagina para mejorar el rendimiento. Pero en este caso, como la pagina de admin no tiene un tag específico para los presupuestos, revalidar toda la pagina es suficiente para mostrar los cambios.
  //  revalidateTag(`budget-${budgetId}`)

  return {
    errors: [],
    success: success,
  }
}
