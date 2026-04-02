"use server"

import getTokenFromCookies from "@/src/auth/token"
import {
  Budget,
  ErrorSchema,
  PasswordValidationSchema,
  SuccessSchema,
} from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionState = {
  errors: string[]
  success: string
}

export async function deleteBudgetAction(
  budgetId: Budget["id"],
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = formData.get("password")

  //VALIDAR Y CON EL SAFEPARSE DE ZOD VALIDAMOS EL PASSWORD, SI NO ES VALIDO SE LAN Y RETORNAMOS EL ERRROR
  const currentPassword = PasswordValidationSchema.safeParse(password)
  //se mapean los errores de zod para retornar solo los mensajes de error al cliente
  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: "",
    }
  }

  const url = `${process.env.API_URL}/api/auth/check-password`
  const token = getTokenFromCookies()
  //peticion para el password
  const checkPasswordResponse = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      //el content type es json porque estamos enviando un objeto con el password en el body, y el backend espera un json
      //Si no tiene un formulario o algo que enviarlo, no se le envia el content type, pero como estamos enviando un json con el password, si es necesario el content type para que el backend lo pueda parsear correctamente
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: currentPassword.data }),
  })

  const checkPasswordJson = await checkPasswordResponse.json()

  if (!checkPasswordResponse.ok) {
    const errorResponse = ErrorSchema.parse(checkPasswordJson)
    return {
      errors: [errorResponse.error],
      success: "",
    }
  }

  //Eliminar Presupuesto
  const deleteBudgetUrl = `${process.env.API_URL}/api/budgets/${budgetId}`

  const deleteBudgetResponse = await fetch(deleteBudgetUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const json = await deleteBudgetResponse.json()

  if (!deleteBudgetResponse.ok) {
    const errorResponse = ErrorSchema.parse(json)
    return {
      errors: [errorResponse.error],
      success: "",
    }
  }

  //Para revalidar cada mutation hay que hacerlo en cada action
  //siempre antes
  revalidatePath("/admin")

  const success = await SuccessSchema.parse(json)

  return {
    errors: [],
    success: success,
  }
}
