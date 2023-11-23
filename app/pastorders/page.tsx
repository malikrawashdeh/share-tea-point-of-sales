"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Order } from "@/types/Order";
import LinearProgress from "@mui/material/LinearProgress";
import AccordianOrder from "@/components/AccordianOrder";
import { Card, Typography } from "@mui/material";

const page: React.FC<{}> = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "loading") return; // Do nothing while loading
      try {
        const user_id = session?.user.id;
        console.log(status);

        if (!user_id) {
          console.log("User not logged in");
          throw new Error("User not logged in");
        }

        const page = 0;

        const response = await fetch(
          `/api/order_list?user_id=${user_id}&page=${page}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setOrders(result.orders);
        console.log(result);
      } catch (error: any) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]); // This useEffect runs once when the component mounts

  // material ui loading spinner if loading
  return (
    <div style={{ width: "75%" }}>
      <Card
        sx={{
          backgroundColor: "#ce0e2d",
          color: "white",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Typography variant="h4">Past Orders</Typography>
      </Card>
      {loading && (
        <div>
          <h2>Loading...</h2>
          <LinearProgress color="inherit" />
        </div>
      )}
      {orders && (
        <div style={{ width: "%100" }}>
          {orders.map((order) => (
            <AccordianOrder key={order.order_id} order={order} />
          ))}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default page;
