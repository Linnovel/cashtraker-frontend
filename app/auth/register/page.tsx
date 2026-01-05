import RegisterForm from "@/components/auth/RegisterForm"
import React from "react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Crear Cuenta - CashTraker",
  description:
    "Crea una cuenta en CashTraker para llevar el control de tus finanzas personales",
  keywords: ["crear cuenta", "registro", "finanzas personales", "cashtraker"],
}

function RegisterPage() {
  return (
    <>
      <div className="mx-8 py-4">
        <h1 className="font-black text-xl text-purple-950">Crea una Cuenta</h1>
        <p className="text-3xl font-bold">Y controla tus finanzas</p>
      </div>

      <RegisterForm />
      <nav>
        <Link
          href="/auth/login"
          className="block text-center my-4 text-white font-semibold"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          href="/auth/forgot-password"
          className="block text-center my-4 text-white font-semibold"
        >
          ¿Olvidaste tu contraseña? Recuperala
        </Link>
      </nav>
    </>
  )
}

export default RegisterPage
