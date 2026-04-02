"use client"
import { Fragment } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"

import AddExpenseForm from "../expenses/AddExpenseForm"
import DeleteExpenseForm from "../expenses/DeleteExpenseForm"
import EditExpenseForm from "../expenses/EditExpenseForm"

// Mapa de componentes: cada clave representa un "estado" del modal
// y su valor es el formulario React que se debe renderizar.
const componentsMap = {
  AddExpense: AddExpenseForm,
  DeleteExpense: DeleteExpenseForm,
  EditExpense: EditExpenseForm,
}

export default function ModalContainer() {
  // Hook de Next para navegar programaticamente (push, replace, back).
  const router = useRouter()
  // Hook de Next que devuelve la ruta actual sin query params.
  const pathname = usePathname()
  // Hook de Next para leer los query params actuales de la URL.
  const searchParams = useSearchParams()

  // Leemos el flag showModal desde la URL, por ejemplo: ?showModal=true
  const showModal = searchParams.get("showModal")

  // Headless UI necesita un booleano para abrir/cerrar el modal.
  const show = showModal ? true : false

  // Leemos que accion viene en la URL para decidir que formulario mostrar.
  const addExpense = searchParams.get("addExpense")
  const editExpense = searchParams.get("editExpenseId")
  const deleteExpense = searchParams.get("deleteExpenseId")
  // Esta funcion traduce query params -> nombre de componente.
  // Si la URL contiene addExpense, devolvemos la clave "AddExpense".
  const getComponentName = () => {
    if (addExpense) return "AddExpense"
    if (editExpense) return "EditExpense"
    if (deleteExpense) return "DeleteExpense"
  }

  // Nombre del componente a renderizar segun la URL actual.
  const componenteName = getComponentName()

  // Buscamos el componente real en el mapa.
  // Si no hay coincidencia, queda null para no renderizar nada.
  const ComponentToRender = componenteName
    ? componentsMap[componenteName]
    : null

  const closeModal = () => {
    // 1) Clonamos los query params porque searchParams es de solo lectura.
    const hideModal = new URLSearchParams(searchParams.toString())

    // 2) Eliminamos todos los params para "cerrar" el estado modal en la URL.
    Array.from(hideModal.entries()).forEach(([key]) => {
      hideModal.delete(key)
    })

    // 3) Reemplazamos la URL actual sin recargar la pagina.
    // Usamos replace para no agregar una entrada extra al historial del navegador.
    router.replace(`${pathname}?${hideModal}`)
  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  {/* Renderizado dinamico: solo monta el formulario si existe componente seleccionado. */}
                  {ComponentToRender ? (
                    <ComponentToRender closeModal={closeModal} />
                  ) : null}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
