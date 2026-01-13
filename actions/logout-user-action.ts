"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

//server actrion que se usara dentro de un boton
export async function logOut() {
  //   console.log("cerrar sessuib")

  //eliminar la cookie del token y los cookies solo estan disponibles en el server components o en las server actions
  cookies().delete("CASHTRACKR_TOKEN")

  //redireccionar al login
  redirect("/auth/login")
}
