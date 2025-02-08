"use client"

import { Box, Typography, Alert } from "@mui/material"

interface ErrorStateProps {
  message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
      }}
    >
      <Alert severity="error" sx={{ maxWidth: 400 }}>
        {message}
      </Alert>
    </Box>
  )
}