import BudgetMenu from "@/components/budget/BudgetMenu"
import DeleteBudgetModal from "@/components/ui/DeleteBudgetModal"
import getTokenFromCookies from "@/src/auth/token"
import { BudgetApiResponseSchema } from "@/src/schemas"
import { formatCurrency, formatDate } from "@/src/utils"
import { Metadata } from "next"
import { cookies } from "next/headers"
import Link from "next/link"
import React from "react"

export const metadata: Metadata = {
  title: "Admin - Mis Presupuestos",
  description: "Administra tus presupuestos",
}

async function getUserBudget() {
  const token = getTokenFromCookies()

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
  const budgets = await getUserBudget()

  return (
    <div className="md:justify-between items-center my-4 py-4 px-2 ">
      <div className="w-full md:w-auto text-center md:text-left">
        <h1 className="font-black text-4xl text-purple-950 my-5">
          Mis Presupuestos
        </h1>
        <p className="text-xl font-bold my-4">
          Maneja y administra tus {""}
          <span className="text-amber-500">presupuestos</span>
        </p>
      </div>
      <Link
        href={"/admin/budgets/new"}
        className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
      >
        Crear Presupuesto
      </Link>
      {budgets.length ? (
        <>
          <ul
            role="list"
            className="divide-y divide-gray-300 border shadow-lg mt-10 "
          >
            {budgets.map((budget) => (
              <li key={budget.id} className="flex justify-between gap-x-6 p-5 ">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      <Link
                        className="cursor-pointer  font-bold text-2xl text-white"
                        href={`/admin/budgets/${budget.id}`}
                      >
                        {budget.name}
                      </Link>
                    </p>
                    <p className="text-xl font-bold text-amber-500">
                      {formatCurrency(Number(budget.amount))}
                    </p>
                    <p className="text-gray-500  text-sm">
                      Ultima Actualización:{" "}
                      <span className="font-bold">
                        {formatDate(budget.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <BudgetMenu budgetId={budget.id} />
                </div>
              </li>
            ))}
          </ul>
          <DeleteBudgetModal />
        </>
      ) : (
        <p className="text-center py-20">
          No tienes presupuesto, crea uno
          <Link className="text-purple-950" href={"/admin/budget/new"}>
            Crea uno aca
          </Link>
        </p>
      )}
    </div>
  )
}

export default AdminPage
