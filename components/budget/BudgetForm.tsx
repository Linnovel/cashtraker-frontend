import { Budget } from "@/src/schemas"
import React from "react"

type BudgetFormProps = {
  budget?: Budget
}

function BudgetForm({ budget }: BudgetFormProps) {
  return (
    <>
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Nombre Presupuesto
        </label>
        <input
          id="name"
          className="w-full p-3 text-black font-bold text-lg  border border-gray-100 bg-slate-100 rounded-xl"
          type="text"
          placeholder="Nombre del Presupuesto"
          name="name"
          //En react se usa value y onChange para controlar el estado del input, pero en este caso como estamos usando un formulario tradicional, usamos defaultValue para establecer el valor inicial del input sin controlarlo completamente con React. Esto permite que el formulario funcione de manera más tradicional, donde el valor del input se envía al servidor al hacer submit, en lugar de ser controlado por el estado de React.
          //   value={budget?.name || ""}
          defaultValue={budget?.name || ""}
        />
      </div>
      <div className="space-y-3">
        <label htmlFor="amount" className="text-sm uppercase font-bold">
          Cantidad Presupuesto
        </label>
        <input
          type="number"
          id="amount"
          className="w-full p-3  border  text-black font-bold text-lg  border-gray-100 bg-slate-100 rounded-xl"
          placeholder="Cantidad Presupuesto"
          name="amount"
          defaultValue={budget?.amount || ""}
        />
      </div>
    </>
  )
}

export default BudgetForm
