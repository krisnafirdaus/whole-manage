"use client";

import { Box, Typography } from "@mui/material";
import { useInvoices } from "@/hooks/use-invoices";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

export default function HomePage() {
  const { loading, error } = useInvoices();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">My Dashboard</Typography>
    </Box>
  );
}
