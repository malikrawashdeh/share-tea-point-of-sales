"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function UserNavHeader() {
  const settings = ["Account", "Logout", "Past Orders"];
  const signedOut = ["Login", "Sign Up"];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const getlink = (setting: string): string => {
    if (setting === "Login") {
      return "/api/auth/signin";
    } else if (setting === "Sign Up") {
      return "/signup";
    } else if (setting === "Past Orders") {
      return "/pastorders";
    }
    return "/";
  };
  const { data: session } = useSession();

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Your Avatar"
            src={session?.user.image ? session?.user.image : "./anonymous.png"}
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
        {settings.map((setting) => (
          <MenuItem key={setting}>
            <Link href={getlink(setting)}>
              <Typography
                textAlign="center"
                onClick={() => (setting === "Logout" ? signOut() : undefined)}
              >
                {setting}
              </Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default UserNavHeader;
