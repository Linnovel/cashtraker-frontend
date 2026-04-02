import { cookies } from "next/headers"

export default function getTokenFromCookies() {
  const token = cookies().get("CASHTRACKR_TOKEN")?.value
  return token
}
