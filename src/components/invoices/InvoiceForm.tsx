"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { invoiceSchema, type InvoiceSchema } from "@/lib/schemas/invoice";
import { generateInvoiceNumber } from "@/utils/format";
import { Add } from "@mui/icons-material";

interface InvoiceFormProps {
  onSubmit: (data: InvoiceSchema) => void;
}

export function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: "",
      dueDate: "",
      amount: "",
      status: "pending",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box sx={{ display: "grid", gap: 6 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Invoice Name"
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                placeholder="Enter your invoice number"
              />
            )}
          />

          <TextField
            label="Invoice Number"
            fullWidth
          />
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Due Date"
                value={field.value ? new Date(field.value) : null}
                onChange={(date) => field.onChange(date?.toISOString())}
                slotProps={{
                  textField: {
                    error: !!errors.dueDate,
                    helperText: errors.dueDate?.message,
                    fullWidth: true,
                    placeholder: "Select due date",
                    required: true,
                  },
                }}
              />
            )}
          />

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                required
                type="number"
                
                error={!!errors.amount}
                helperText={errors.amount?.message}
                fullWidth
                placeholder="Enter amount"
                InputProps={{
                  startAdornment: (
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary", mr: 1 }}
                    >
                      Rp
                    </Typography>
                  ),
                }}
              />
            )}
          />
        </Box>

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.status} fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select {...field} label="Status">
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
              {errors.status && (
                <FormHelperText>{errors.status.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Add />}
            sx={{
              width: "25%",
              mt: 2,
              bgcolor: "#1976D2"
            }}
          >
            Add Invoice
          </Button>
        </Box>
      </Box>
    </form>
  );
}
