//Si los datos no han cambiado, no hara la consulta nuevamente

import { notFound } from "next/navigation"
import { cache } from "react"
import getTokenFromCookies from "../auth/token"
import { BudgetAPIResponseSchema } from "../schemas"

//Solo usara lo cacheado, usando el cache aca para evitar la doble consulta
export const getBudgetById = cache(async (budgetId: string) => {
  const token = getTokenFromCookies()
  const url = `${process.env.API_URL}/api/budgets/${budgetId}`

  const request = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const json = await request.json()

  if (!request.ok) {
    notFound()
  }

  const budget = BudgetAPIResponseSchema.parse(json)

  return budget
})
