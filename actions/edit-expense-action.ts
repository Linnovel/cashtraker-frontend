"use server"

import getTokenFromCookies from "@/src/auth/token"
import {
  Budget,
  DraftExpenseSchema,
  ErrorSchema,
  Expense,
  SuccessSchema,
} from "@/src/schemas"
import { revalidatePath } from "next/cache"

type BudgetAndExpenseIds = {
  budgetId: Budget["id"]
  expenseId: Expense["id"]
}

type ActionStateType = {
  errors: string[]
  success: string
}

export async function editActionExpense(
  { budgetId, expenseId }: BudgetAndExpenseIds,
  prevState: ActionStateType,
  formData: FormData,
): Promise<ActionStateType> {
  const expense = DraftExpenseSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  })

  if (!expense.success) {
    return {
      errors: expense.error.issues.map((err) => err.message),
      success: "",
    }
  }

  const token = await getTokenFromCookies()
  const url = `${process.env.API_URL}/api/budgets/${budgetId}/expenses/${expenseId}`

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: expense.data.name,
      amount: expense.data.amount,
    }),
  })

  const json = await req.json()

  if (!req.ok) {
    const { error } = ErrorSchema.parse(json)
    return {
      errors: [error],
      success: "",
    }
  }

  const success = SuccessSchema.parse(json)

  revalidatePath(`/admin/budgets/${budgetId}`)

  return {
    errors: [],
    success: success,
  }
}
