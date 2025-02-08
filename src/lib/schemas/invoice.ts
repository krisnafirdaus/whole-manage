import { z } from "zod"

export const invoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z.string().min(1, "Amount is required"),
  status: z.enum(["paid", "unpaid", "pending"]),
})

export type InvoiceSchema = z.infer<typeof invoiceSchema>

