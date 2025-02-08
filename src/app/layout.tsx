"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Link from "next/link";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { createTheme } from "@mui/material/styles";
import {
  DarkMode,
  LightMode,
  NotificationsOutlined,
  EmailOutlined,
  PostAdd as PlusCircle,
  List as FileText
} from "@mui/icons-material";
import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6C47FF",
    },
    background: {
      default: "#F8F9FC",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1D1E2C",
          color: "white",
        },
      },
    },
  },
});

const drawerWidth = 240;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: "flex" }} />
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{ cursor: "pointer"}} onClick={() => router.push("/")}>
                  InvoiceHub Icon
                </Typography>
              </Toolbar>

              <List>
                <Toolbar sx={{ mx: '-4px', mb: '2[x'}}>
                  <Typography variant="h6" noWrap component="div">
                    Menu
                  </Typography>
                </Toolbar>
                <ListItem component={Link} href="/invoices/add">
                  <ListItemIcon>
                    <PlusCircle sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "white"}} primary="Add Invoice" />
                </ListItem>
                <ListItem component={Link} href="/invoices/list">
                  <ListItemIcon>
                    <FileText sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "white"}} primary="My Invoices" />
                </ListItem>
              </List>
            </Drawer>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: "background.default",
                marginLeft: `${drawerWidth}px`,
                width: `calc(100% - ${drawerWidth}px)`,
              }}
            >
              <Box
                component="nav"
                sx={{
                  height: 64,
                  bgcolor: "white",
                  borderBottom: 1,
                  borderColor: "divider",
                  px: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box />
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? <LightMode /> : <DarkMode />}
                  </IconButton>
                  <IconButton size="small">
                    <Badge badgeContent={3} color="error">
                      <NotificationsOutlined />
                    </Badge>
                  </IconButton>
                  <IconButton size="small">
                    <Badge badgeContent={2} color="error">
                      <EmailOutlined />
                    </Badge>
                  </IconButton>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                        John Doe
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Admin
                      </Typography>
                    </Box>
                    <Box sx={{}}>
                      <Avatar
                        src="/placeholder-user.jpg"
                        alt="User"
                        sx={{
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ p: 3 }}>{children}</Box>
            </Box>
          </LocalizationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
