"use server"

import { ErrorSchema, LoginSchema, SuccessSchema } from "@/src/schemas"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type ActionStateType = {
  errors: string[]
}

export async function authenticateUser(
  prevState: ActionStateType,
  formData: FormData
) {
  const loginCredentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const loginPayload = LoginSchema.safeParse(loginCredentials)

  if (!loginPayload.success) {
    const errors = loginPayload.error.issues.map((issue) => issue.message)
    return {
      errors,
    }
  }

  const url = `${process.env.API_URL}/api/auth/login`

  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: loginPayload.data.password,
      email: loginPayload.data.email,
    }),
  })

  const json = await request.json()

  if (!request.ok) {
    const { error } = ErrorSchema.parse(json)
    return {
      errors: [error],
    }
  }

  //setear coockies
  cookies().set({
    name: "CASHTRACKR_TOKEN",
    value: json,
    httpOnly: true,
    // el path asegura que la cookie este disponible en toda la aplicacion
    //si pongo /admin sera valido en la url y sus subrutas
    path: "/",
  })

  redirect("/admin")

  //no hace falta devolver nada porque redirige
  // const success = SuccessSchema.parse(json)

  // return {
  //   errors: [],
  //   success: success,
  // }
}
