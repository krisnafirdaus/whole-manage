"use client"

import { useState, useEffect } from "react"
import type { Invoice } from "@/lib/types/invoice"

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const storedInvoices = JSON.parse(localStorage.getItem("invoices") || JSON.stringify([
        {
          id: "1",
          name: "Website Development",
          number: "INV-2024-001",
          amount: 15000000,
          status: "paid",
          dueDate: "2024-02-15T00:00:00.000Z",
          createdAt: "2024-01-15T00:00:00.000Z"
        },
        {
          id: "2",
          name: "UI/UX Design Services",
          number: "INV-2024-002",
          amount: 8500000,
          status: "pending",
          dueDate: "2024-02-28T00:00:00.000Z",
          createdAt: "2024-01-20T00:00:00.000Z"
        },
        {
          id: "3",
          name: "Server Maintenance",
          number: "INV-2024-003",
          amount: 5000000,
          status: "unpaid",
          dueDate: "2024-02-10T00:00:00.000Z",
          createdAt: "2024-01-25T00:00:00.000Z"
        },
        {
          id: "4",
          name: "Mobile App Development",
          number: "INV-2024-004",
          amount: 25000000,
          status: "paid",
          dueDate: "2024-03-15T00:00:00.000Z",
          createdAt: "2024-01-30T00:00:00.000Z"
        },
        {
          id: "5",
          name: "SEO Optimization",
          number: "INV-2024-005",
          amount: 7500000,
          status: "pending",
          dueDate: "2024-03-01T00:00:00.000Z",
          createdAt: "2024-02-01T00:00:00.000Z"
        }
      ]))
      setInvoices(storedInvoices)
    } catch (err) {
      setError("Failed to load invoices")
    } finally {
      setLoading(false)
    }
  }, [])

  const addInvoice = (invoice: Invoice) => {
    try {
      const updatedInvoices = [...invoices, invoice]
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices))
      setInvoices(updatedInvoices)
      return true
    } catch (err) {
      setError("Failed to add invoice")
      return false
    }
  }

  const updateInvoice = (id: string, updatedInvoice: Partial<Invoice>) => {
    try {
      const updatedInvoices = invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice,
      )
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices))
      setInvoices(updatedInvoices)
      return true
    } catch (err) {
      setError("Failed to update invoice")
      return false
    }
  }

  const deleteInvoice = (id: string) => {
    try {
      const updatedInvoices = invoices.filter((invoice) => invoice.id !== id)
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices))
      setInvoices(updatedInvoices)
      return true
    } catch (err) {
      setError("Failed to delete invoice")
      return false
    }
  }

  return {
    invoices,
    loading,
    error,
    addInvoice,
    updateInvoice,
    deleteInvoice,
  }
}

