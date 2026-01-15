"use server"

import { ErrorSchema, SuccessSchema, TokenSchema } from "@/src/schemas"

type ValidateTokenActionResult = {
  errors: string[]
  success: string
}

//Y se le pasa el token como parametro
export async function validateTokenAction(
  token: string,
  prevState: ValidateTokenActionResult
) {
  console.log("Validando token...")
  console.log("Token recibido en la action:", token)

  //safeParse devuelve un objeto con success y data o error
  const resetPasswordToken = TokenSchema.safeParse(token)

  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.issues.map((issue) => issue.message),
      success: "",
    }
  }

  const url = `${process.env.API_URL}/api/auth/validate-token`

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: resetPasswordToken.data,
    }),
  })

  const json = await req.json()

  console.log("Respuesta del servidor:", json)
  if (!req.ok) {
    const errors = ErrorSchema.parse(json)

    return {
      errors: [errors.error],
      success: "",
    }
  }

  //Lo montamos en el state
  const success = SuccessSchema.parse(json)

  return {
    errors: [],
    // lo mandamos que el state tenga el mensaje de exito
    success: success,
  }
}
