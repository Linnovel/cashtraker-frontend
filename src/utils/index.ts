// Format a number as currency in USD
export function formatCurrency(quantity: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(quantity)
}

// Format a date string (ISO format) to a more readable format
export function formatDate(isoString: string) {
  const date = new Date(isoString)
  const formatter = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  return formatter.format(date)
}
