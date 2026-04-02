"use server"

import SuccessMessage from "@/components/ui/SuccessMessage"
import getTokenFromCookies from "@/src/auth/token"
import { ErrorSchema, SuccessSchema, UpdatePAsswordSchema } from "@/src/schemas"

type ActionState = {
  errors: string[]
  success: string
}

export async function updatePassword(prevState: ActionState, data: FormData) {
  const passwordValues = {
    current_password: data.get("current_password"),
    password: data.get("password"),
    password_confirmation: data.get("password_confirmation"),
  }

  const resetPaword = UpdatePAsswordSchema.safeParse(passwordValues)

  if (!resetPaword.success) {
    return {
      errors: resetPaword.error.issues.map((issue) => issue.message),
      success: "",
    }
    {
    }
  }

  const token = getTokenFromCookies()

  const url = `${process.env.API_URL}/api/auth/update-password`
  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      current_password: resetPaword.data.current_password,
      password: resetPaword.data.password,
    }),
  })

  const response = await request.json()

  if (!request.ok) {
    const { error } = ErrorSchema.parse(response)
    return {
      errors: [error],
      success: "",
    }
  }

  const success = SuccessSchema.parse(response)

  return {
    errors: [],
    success: success,
  }
}
