import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordianProps } from "@/types/AccordianProps";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";

// create array of month name
const monthMap = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Nov",
  "Dec",
];

function AccordianOrder({ order }: AccordianProps) {
  // 2023-10-03
  // split date using substring
  const orderDate = dayjs(order.created_at);
  const year = orderDate.year();
  const month = orderDate.month();
  const day = orderDate.date();
  return (
    // make accordian take up full width
    <Accordion
      sx={{
        width: "100%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={3}>
            <Typography>{`Order #${order.order_id}`}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{`${
              monthMap[Number(month) - 1]
            } ${day + 1}, ${year}`}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{`Total: $${order.total_price}`}</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {order.drinks.map((item, index) => (
          <Grid
            key={index}
            id={item.id.toString()}
            container
            spacing={2}
            justifyContent="space-between"
            // make every other item grey
            style={{
              backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
              paddingBottom: "2rem",
              alignContent: "center",
            }}
          >
            <Grid item xs={4} container justifyContent="space-between">
              {item.drink_name}
            </Grid>
            <Grid item xs={4}>
              {item.unit_price}
            </Grid>
          </Grid>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordianOrder;
