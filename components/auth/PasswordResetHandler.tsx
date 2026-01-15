"use client"

import React from "react"
import ValidateTokenForm from "./ValidateTokenForm"
import ResetPasswordForm from "./ResetPasswordForm"

function PasswordResetHandler() {
  const [isValidToken, setIsValidToken] = React.useState<boolean>(true)
  const [token, setToken] = React.useState<string>("")

  return (
    <div>
      {isValidToken ? (
        <ResetPasswordForm token={token} />
      ) : (
        <ValidateTokenForm
          setIsValidToken={setIsValidToken}
          token={token}
          setToken={setToken}
        />
      )}
    </div>
  )
}

export default PasswordResetHandler
