import { BudgetApiResponseSchema } from "@/src/schemas"
import { Metadata } from "next"
import { cookies } from "next/headers"
import Link from "next/link"
import React from "react"

export const metadata: Metadata = {
  title: "Admin - Mis Presupuestos",
  description: "Administra tus presupuestos",
}

async function getUserBudget() {
  const token = cookies().get("CASHTRACKR_TOKEN")?.value

  const url = `${process.env.API_URL}/api/budgets`

  const request = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const json = await request.json()

  const budgets = BudgetApiResponseSchema.parse(json)

  return budgets
}

export async function AdminPage() {
  await getUserBudget()

  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
      <div className="w-full md:w-auto">
        <h1 className="font-black text-4xl text-purple-950 my-5">
          Mis Presupuestos
        </h1>
        <p className="text-xl font-bold">
          Maneja y administra tus {""}
          <span className="text-amber-500">presupuestos</span>
        </p>
      </div>
      <Link
        href={"/admin/budget/new"}
        className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
      >
        Crear Presupuesto
      </Link>
    </div>
  )
}

export default AdminPage
