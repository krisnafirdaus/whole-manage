export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const generateInvoiceNumber = () => {
  const random = Math.floor(Math.random() * 100000)
  return `INV-${random.toString().padStart(5, "0")}`
}

