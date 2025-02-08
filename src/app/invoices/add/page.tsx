"use client"

import { useState } from "react"
import { Box, Typography, Alert, Snackbar, Paper } from "@mui/material"
import { InvoiceForm } from "@/components/invoices/InvoiceForm"
import { useInvoices } from "@/hooks/use-invoices"
import type { InvoiceSchema } from "@/lib/schemas/invoice"
import { generateInvoiceNumber } from "@/utils/format"

export default function AddInvoicePage() {
  const [showSuccess, setShowSuccess] = useState(false)
  const { addInvoice } = useInvoices()

  const handleSubmit = (data: InvoiceSchema) => {
    const invoice = {
      ...data,
      id: crypto.randomUUID(),
      number: generateInvoiceNumber(),
      amount: Number.parseFloat(data.amount),
      createdAt: new Date().toISOString(),
    }

    if (addInvoice(invoice)) {
      setShowSuccess(true)
    }
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
          Add Invoice
        </Typography>

        <InvoiceForm onSubmit={handleSubmit} />
      </Paper>

      <Snackbar open={showSuccess} autoHideDuration={6000} onClose={() => setShowSuccess(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Invoice added successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}

