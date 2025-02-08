"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Box, Menu, MenuItem, Typography } from "@mui/material"
import { useInvoices } from "@/hooks/use-invoices"
import { InvoiceList } from "@/components/invoices/InvoiceList"
import { InvoiceFilter } from "@/components/invoices/InvoiceFilter"
import { LoadingState } from "@/components/LoadingState"
import { ErrorState } from "@/components/ErrorState"
import type { Invoice } from "@/lib/types/invoice"

function InvoiceListContent() {
  const { invoices, loading, error, deleteInvoice } = useInvoices()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    if (event.target.value) {
      params.set("search", event.target.value)
    } else {
      params.delete("search")
    }
    router.push(`?${params.toString()}`)
  }

  const handleStatusChange = (event: any) => {
    const params = new URLSearchParams(searchParams)
    if (event.target.value) {
      params.set("status", event.target.value)
    } else {
      params.delete("status")
    }
    router.push(`?${params.toString()}`)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, invoice: Invoice) => {
    setAnchorEl(event.currentTarget)
    setSelectedInvoice(invoice)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedInvoice(null)
  }

  const handleDelete = () => {
    if (selectedInvoice) {
      deleteInvoice(selectedInvoice.id)
      handleMenuClose()
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      search === "" ||
      invoice.name.toLowerCase().includes(search.toLowerCase()) ||
      invoice.number.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = status === "" || invoice.status === status
    return matchesSearch && matchesStatus
  })

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h4">
          My Invoice
        </Typography>
        <InvoiceFilter
          search={search}
          status={status}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
        />
      </Box>

      <InvoiceList invoices={filteredInvoices} onMenuOpen={handleMenuOpen} />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  )
}

export default function InvoiceListPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <InvoiceListContent />
    </Suspense>
  )
}

