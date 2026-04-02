"use client"

import { Fragment, useState } from "react"
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import ConfirmPasswordForm from "../budget/ConfirmPasswordForm"

export default function DeleteBudgetModal() {
  //Todo esto para que cierre el modal, se hace con los search params de la url, si el search param deleteBudgetId existe, entonces se muestra el modl, saber cual presupuesto se va a eliminar, y para cerrar el modal se elimina el search param deleteBudgetId de la url, esto se hace con el replace para no agregar una nueva entrada en el historial del navegador
  //Hook para obtener los search params de la url, esto es para saber si se debe mostrar el modal o no, si el search param deleteBudgetId existe, entonces se muestra el modal
  const searchParams = useSearchParams()
  //Variable con la valor del search param deleteBudgetId, esto es para saber que presupuesto se va a eliminar
  const deleteBudgetId = searchParams.get("deleteBudgetId")
  const show = deleteBudgetId ? true : false
  //Funcion para cerrar el modal, esto se hace quitando el search param deleteBudgetId de la url
  const hideModal = new URLSearchParams(searchParams.toString())
  //Elimina el search param deleteBudgetId de la url
  hideModal.delete("deleteBudgetId")
  //Para cerrar el modal con el replace
  const router = useRouter()
  //Nos da la ubicacion actual de la url
  const pathName = usePathname()
  // Quedaria lo siguiente : router.replace(pathName que es igual a admin mas el delete del deletebudgetId)
  //  onClose={() => router.replace(`${pathName}?${hideModal.toString()}`)}

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => router.replace(`${pathName}?${hideModal.toString()}`)}
        >
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
                {/* Aca se agrega el formulario para confirmar password */}
                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <ConfirmPasswordForm />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
