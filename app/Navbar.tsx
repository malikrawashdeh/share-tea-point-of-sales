"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { useSession } from "next-auth/react";

import WeatherWidget from "../components/WeatherWidget";
import UserNavHeader from "../components/UserNavHeader";
import WeatherWidgetCS from "@/components/WeatherWidgetCS";
import GoogleTranslate from "@/components/GoogleTranslate";

const pages = ["Home", "Menu", "Order"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { data: session } = useSession();

  return (
    <AppBar
      position="static"
      style={{ background: "#ce0e2d", marginBottom: "1rem" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sharetea
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link
                    href={
                      page === "Home" ? "/" : "/" + page.toLocaleLowerCase()
                    }
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem>
                <Box>
                  <WeatherWidgetCS />
                </Box>
              </MenuItem>
              {session?.user.role == "admin" ||
              session?.user.role === "manager" ||
              session?.user.role == "employee" ? (
                <MenuItem key={"Employees"} onClick={handleCloseNavMenu}>
                  <Link href={"/" + "Employees".toLocaleLowerCase()}>
                    <Typography textAlign="center">Employees</Typography>
                  </Link>
                </MenuItem>
              ) : null}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sharetea
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Box
                key={page}
                sx={{ my: 2, mx: 2, color: "white", display: "block" }}
              >
                <Link
                  href={page === "Home" ? "/" : "/" + page.toLocaleLowerCase()}
                >
                  {page}
                </Link>
              </Box>
            ))}
            {session?.user.role == "admin" ||
            session?.user.role === "manager" ||
            session?.user.role == "employee" ? (
              <Box sx={{ my: 2, mx: 2, color: "white", display: "block" }}>
                <Link href={"/" + "Employees".toLocaleLowerCase()}>
                  Employees
                </Link>
              </Box>
            ) : null}
              <Box sx={{display: "flex" }}>
                <WeatherWidgetCS/>
              </Box>
              <GoogleTranslate/>
          </Box>
          {session != null ? (
            <UserNavHeader />
          ) : (
            <Link href="/signin">Login / SignUp</Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
