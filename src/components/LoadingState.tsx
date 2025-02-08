"use client"

import { Box, CircularProgress, Typography } from "@mui/material"

export function LoadingState() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography color="text.secondary">Loading...</Typography>
    </Box>
  )
}