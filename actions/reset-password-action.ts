"use server"

import { ErrorSchema, ResetPasswordSchema, SuccessSchema } from "@/src/schemas"

type ResetPasswordActionResult = {
  errors: string[]
  success: string
}

export async function resetPasswordAction(
  token: string,
  prevState: ResetPasswordActionResult,
  formData: FormData
) {
  const resetPasswordInput = {
    password: formData.get("password"),
    confirmPassword: formData.get("password_confirmation"),
  }

  const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)

  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.issues.map((issue) => issue.message),
      success: "",
    }
    {
    }
  }

  const url = `${process.env.API_URL}/api/auth/reset-password/${token}`

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: resetPassword.data.password,
    }),
  })

  const json = await req.json()

  //Primero validamos si hay error
  if (!req.ok) {
    const errors = ErrorSchema.parse(json)

    return {
      errors: [errors.error],
      success: "",
    }
  }

  //por ultimo validamos que todo salga bien

  const success = SuccessSchema.parse(json)

  return {
    errors: [],
    success: success,
    token: token,
  }
}
