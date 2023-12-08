import { Typography, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";

// tsdoc
/*
 * @returns {JSX.Element}
 */
export default function Page() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: "5xl" }}>
        Access Denied
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: "3xl", maxWidth: "2xl", textAlign: "center" }}
      >
        You are logged in, but you do not have the required access level to view
        this page.
      </Typography>
      <NextLink href="/" passHref>
        <MuiLink
          variant="body1"
          sx={{ fontSize: "3xl", textDecoration: "underline" }}
        >
          Return to Home Page
        </MuiLink>
      </NextLink>
    </section>
  );
}
