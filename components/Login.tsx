"use client";
// components/Login.tsx
import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const cardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  maxWidth: "400px",
  margin: "0 auto",
  minHeight: "100vh",
};

const Login: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <div style={cardStyle}>
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Log in or Sign up
            </Typography>
            <form>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  margin: "8px 0",
                }}
                fullWidth
              >
                Log In
              </Button>
              <Button variant="outlined" color="primary" fullWidth>
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
