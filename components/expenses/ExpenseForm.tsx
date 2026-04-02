import { DraftExpense } from "@/src/schemas"

type ExpenseFormProps = {
  expense?: DraftExpense
}

export default function ExpenseForm({ expense }: ExpenseFormProps) {
  return (
    <>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-sm uppercase font-bold text-gray-950"
        >
          Nombre Gasto
        </label>
        <input
          defaultValue={expense?.name}
          id="name"
          className="w-full p-3  border border-gray-100  bg-white text-black"
          type="text"
          placeholder="Nombre del Gasto"
          name="name"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="amount"
          className="text-sm uppercase font-bold text-gray-950"
        >
          Cantidad Gasto
        </label>
        <input
          id="amount"
          className="w-full p-3  border border-gray-100 bg-white text-black"
          type="number"
          placeholder="Cantidad Gasto"
          name="amount"
          defaultValue={expense?.amount}
        />
      </div>
    </>
  )
}
