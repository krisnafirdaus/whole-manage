import React from 'react';
import { Box, TextField, Select, MenuItem } from '@mui/material';

interface InvoiceFilterProps {
  search: string;
  status: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const InvoiceFilter: React.FC<InvoiceFilterProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <Box display="flex" gap={2}>
      <TextField
        placeholder="Search invoices..."
        value={search}
        onChange={onSearchChange}
        variant="outlined"
        size="small"
      />
      <Select
        value={status}
        onChange={onStatusChange}
        displayEmpty
        variant="outlined"
        size="small"
      >
        <MenuItem value="">All Status</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="paid">Paid</MenuItem>
      </Select>
    </Box>
  );
};

