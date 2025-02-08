"use client"
import type React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
} from "@mui/material"
import { Menu } from "@mui/icons-material"
import type { Invoice, InvoiceStatus } from "@/lib/types/invoice"
import { formatCurrency } from "@/utils/format"

const statusColors: Record<InvoiceStatus, string> = {
  paid: "success",
  unpaid: "error",
  pending: "warning",
}

interface InvoiceListProps {
  invoices: Invoice[]
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, invoice: Invoice) => void
}

export function InvoiceList({ invoices, onMenuOpen }: InvoiceListProps) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Invoice</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>{invoice.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {invoice.number}
                </Typography>
              </TableCell>
              <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Chip
                  label={invoice.status}
                  color={statusColors[invoice.status] as "success" | "error" | "warning"}
                  size="small"
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    minWidth: 80,
                    justifyContent: 'center'
                  }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>
                <IconButton
                  onClick={(e) => onMenuOpen(e, invoice)}
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <Menu />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

