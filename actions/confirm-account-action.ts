"use server"

import { ErrorSchema, SuccessSchema, TokenSchema } from "@/src/schemas"
import { success } from "zod"

type ActionState = {
  errors: string[]
  success: string
}

export async function confirmAccountAction(
  token: string,
  prevState: ActionState
) {
  const confirmtoken = TokenSchema.safeParse(token)

  if (!confirmtoken.success) {
    return {
      errors: confirmtoken.error.issues.map((e) => e.message),
      success: "",
    }
  }

  const url = `${process.env.API_URL}/api/auth/confirm-account`

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "origin": "http://localhost:3000",
    },
    //Recuerda que registerPayload.data tiene los datos validados
    //Y solo debes mandarle lo que pide el body del endpoint, por eso se le manda el objeto con las propiedades necesarias
    //Y no el registerData completo que tiene tambien el password_confirmation
    body: JSON.stringify({
      token: confirmtoken.data,
    }),
  })

  //pasamos el request a json para leer la respuesta
  const json = await request.json()

  if (!request.ok) {
    const { error } = ErrorSchema.parse(json)
    return {
      errors: [error],
      success: "",
    }
  }

  const success = SuccessSchema.parse(json)

  return {
    errors: [],
    success,
  }
}
