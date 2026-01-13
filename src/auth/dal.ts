//Data Access Layer for Authentication

//Este server-only module handles user session verification by checking authentication tokens stored in cookies and fetching user data from the backend API.
import "server-only"
import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { UserSchema } from "../schemas"

// Verifies the session user by checking the token in cookies and fetching user data from the API
//cache to memoize the function and avoid redundant calls
export const verifySessionUSer = cache(async () => {
  const token = cookies().get("CASHTRACKR_TOKEN")?.value
  if (!token) {
    redirect("/auth/login")
  }

  const url = `${process.env.API_URL}/api/auth/user`

  //headers de autorizacion
  const request = await fetch(url, {
    method: "GET",
    headers: {
      //   "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const session = await request.json()

  const result = UserSchema.safeParse(session)

  //Lo redirecciona si el token no es valido, expiro, etc.
  if (!result.success) {
    redirect("/auth/login")
  }

  return {
    user: result.data,
    isAuth: true,
  }
})
