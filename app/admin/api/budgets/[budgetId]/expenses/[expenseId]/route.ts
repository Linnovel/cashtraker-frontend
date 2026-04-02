import { verifySessionUSer } from "@/src/auth/dal"
import getTokenFromCookies from "@/src/auth/token"

export async function GET(
  request: Request,
  { params }: { params: { budgetId: string; expenseId: string } },
) {
  console.log(params.budgetId)
  console.log(params.expenseId)

  const token = await getTokenFromCookies()

  const url = `${process.env.API_URL}/api/budgets/${params.budgetId}/expenses/${params.expenseId}`

  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const json = await req.json()

  if (!req.ok) {
    return Response.json(json.error, { status: req.status })
  }

  //TODO: verify session user
  await verifySessionUSer()

  return Response.json(json)
}
