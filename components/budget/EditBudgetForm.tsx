"use client"

import React, { useEffect } from "react"
import BudgetForm from "./BudgetForm"
import { Budget } from "@/src/schemas"
import { useFormState } from "react-dom"

import { editBudgetAction } from "@/actions/edit-budget-actions"
import ErrorMessage from "../ui/ErrorMessage"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

interface EditBudgetFormProps {
  budget: Budget
}

function EditBudgetForm({ budget }: EditBudgetFormProps) {
  const router = useRouter()
  const editBudgetWithId = editBudgetAction.bind(null, budget.id)
  const [state, dispatch] = useFormState(editBudgetWithId, {
    errors: [],
    success: "",
  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      router.push("/admin")
    }
  }, [state])

  return (
    <form action={dispatch} className="mt-10 space-y-3" noValidate>
      {state.errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
      <BudgetForm budget={budget} />
      <input
        type="submit"
        className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
        value="Guardar cambios"
      />
    </form>
  )
}

export default EditBudgetForm
