export type InvoiceStatus = "paid" | "unpaid" | "pending"

export interface Invoice {
  id: string
  name: string
  number: string
  dueDate: string
  amount: number
  status: InvoiceStatus
  createdAt: string
}

export interface InvoiceFormData {
  name: string
  dueDate: string
  amount: string
  status: InvoiceStatus
}

