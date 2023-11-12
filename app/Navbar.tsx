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
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import WeatherWidget from "./components/WeatherWidget";
import { red } from "@mui/material/colors";

const pages = ["Home", "Menu", "Order"];
const settings = ["Account", "Logout"];
const signedOut = ["Login", "Sign Up"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getlink = (setting: string): string => {
    if (setting === "Login") {
      return "/api/auth/signin";
    } else if (setting === "Sign Up") {
      return "/signup";
    }
    return "/";
  };

  const { data: session } = useSession();

  return (
    <AppBar position="static" style={{ background: "#ce0e2d" }}>
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
              {session ? (
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
            {session ? (
              <Box sx={{ my: 2, mx: 2, color: "white", display: "block" }}>
                <Link href={"/" + "Employees".toLocaleLowerCase()}>
                  Employees
                </Link>
              </Box>
            ) : null}
            <WeatherWidget />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Your Avatar"
                  src={
                    session?.user.image
                      ? session?.user.image
                      : "./anonymous.png"
                  }
                  style={{ backgroundColor: "white" }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {session
                ? settings.map((setting) => (
                    <MenuItem key={setting}>
                      <Typography
                        textAlign="center"
                        onClick={() =>
                          setting === "Logout" ? signOut() : undefined
                        }
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))
                : signedOut.map((setting) => (
                    <Link key={setting} href={getlink(setting)}>
                      <MenuItem>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
