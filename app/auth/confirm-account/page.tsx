import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm"
import React from "react"

function ConfirmAccountPage() {
  return (
    <React.Fragment>
      <h1 className="font-black text-xl text-purple-950">Confirma tu cuenta</h1>
      <p className="text-3xl font-bold">Ingresa el codigo que recibiste</p>
      <ConfirmAccountForm />
    </React.Fragment>
  )
}

export default ConfirmAccountPage
