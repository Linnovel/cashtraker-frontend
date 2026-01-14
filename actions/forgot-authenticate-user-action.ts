"use server"

import { ErrorSchema, ForgotPasswordSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[]
  success: string
}

//prevState sirve para mantener el estado anterior si es necesario
//formData es el objeto que contiene los datos del formulario
export async function forgotAuthenticateUserAction(
  _prevState: ActionStateType,
  formData: FormData
) {
  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  })

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.issues.map((issue) => issue.message),
      success: "",
    }
  }

  const url = `${process.env.API_URL}/api/auth/forgot-password`

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: forgotPassword.data.email,
    }),
  })

  const json = await request.json()

  console.log("Response from forgot password:", json)
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
    success: success,
  }
}
