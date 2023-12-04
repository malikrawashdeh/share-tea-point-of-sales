import { Card, Typography } from "@mui/material";
import React from "react"

interface props {
    text: string;
}

const Subheader: React.FC<props> = ({ text }) => {
    return (
        <Card
            sx={{
            backgroundColor: "#ce0e2d",
            color: "white",
            padding: "1rem",
            marginBottom: "1rem",
            }}
        >
            <Typography variant="h4">{text}</Typography>
        </Card>
    );
}

export default Subheader;