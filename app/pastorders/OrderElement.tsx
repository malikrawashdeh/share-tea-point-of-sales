import * as React from "react";
import { Box, CardHeader, Typography } from "@mui/material";
import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircleIcon from "@mui/icons-material/Circle";

interface OrderProps {
  orderNumber: string;
  items: number;
  totalPrice: number;
}

const Order: React.FC<OrderProps> = ({ orderNumber, items, totalPrice }) => {
  return (
    <Box>
      <Card>
        <Typography
          sx={
            items === 29
              ? {
                  my: 1,
                  mx: 2,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }
              : {
                  my: 1,
                  mx: 2,
                  color: "#bfff00",
                  display: "flex",
                  alignItems: "center",
                }
          }
        >
          <CircleIcon sx={{ fontSize: "0.625rem" }} />⠀
          {items === 29 ? "Pending" : "Delivered"}
        </Typography>
        <Typography sx={{ color: "#ff9100" }}>
          <CircleIcon sx={{ fontSize: "0.625rem" }} /> Dispatched
        </Typography>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              justifyContent: "space-between",
              backgroundColor: "#647176",
              color: "white",
            }}
          >
            <Box sx={{ mx: 1, my: -1, justifyContent: "flex-start" }}>
              <CardHeader
                title={`Order Number: #${orderNumber}`}
                sx={{ p: 0 }}
              />
              <Typography>{items} Items</Typography>
            </Box>
            <Box>
              <Typography sx={{ whiteSpace: "nowrap" }} fontWeight="bold">
                $ {totalPrice}.00
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <CardActions sx={{ justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              m: 0.5,
              width: "100%",
            }}
          >
            <Button
              fullWidth
              sx={{
                p: 1,
                backgroundColor: "#ff9100",
                color: "#434343",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              {items === 29 ? "Proceed To Pay" : "Track Order"}
            </Button>
            <Button>View Order Details</Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Order;
