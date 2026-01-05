import Image from "next/image"
import React from "react"

function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Logo de Cashtraker"
      width={400}
      height={123}
      priority
      className="w-full"
    />
  )
}

export default Logo
