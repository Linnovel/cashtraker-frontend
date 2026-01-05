import React from "react"
import { Metadata } from "next"
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login - CashTraker",
  description:
    "Login a tu cuenta en CashTraker para llevar el control de tus finanzas personales",
  keywords: ["crear cuenta", "registro", "finanzas personales", "cashtraker"],
}

function ForgotPasswordPage() {
  return (
    <>
      <div className="mx-8 py-4">
        <h1 className="font-black text-xl text-purple-950">
          Olvidaste tu contraseña?
        </h1>
        <p className="text-3xl font-bold">Restablecer contraseña</p>
      </div>
      <ForgotPasswordForm />
      <nav>
        <Link
          href="/auth/login"
          className="block text-center my-4 text-white font-semibold"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          href="/auth/register"
          className="block text-center my-4 text-white font-semibold"
        >
          ¿No tienes cuenta? Crea una, es gratis
        </Link>
      </nav>
    </>
  )
}

export default ForgotPasswordPage
