"use server"

import { registerSchema } from "@/src/schemas"

type ActionStateType = {
  errors: string[]
}

export async function register(prevState: ActionStateType, formData: FormData) {
  console.log("datos del formulario", formData)

  // Extraer los datos del formulario para el crear el objeto de registro //Payload de registro
  const registerData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  }

  //Validar con el esquema de zod
  const registerPayload = registerSchema.safeParse(registerData)

  //Lee los errores, recuerda leer que es un map y un objeto para traerlos y usarlos
  //si no pasa la validacion me da los errores

  if (!registerPayload.success) {
    const errors = registerPayload.error?.issues.map((error) => error.message)
    return {
      errors,
    }
  }

  //Registar el usuario en la base de datos
  // SE puede usar axios? Si, pero tambien se puede usar fetch, express y nodejs lo soportan nativamente
  //Recuerda que nextjs es una combinacion de frontend y backend con nodejs detras del escenario

  const url = `${process.env.API_URL}/api/auth/create-account`

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
      name: registerPayload.data?.name,
      email: registerPayload.data?.email,
      password: registerPayload.data?.password,
    }),
  })

  const json = await request.json()
  console.log("respuesta del backend", json)
  return {
    errors: [],
  }
}
