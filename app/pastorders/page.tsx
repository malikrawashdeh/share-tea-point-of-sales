"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Order } from "@/types/Order";
import LinearProgress from "@mui/material/LinearProgress";
import AccordianOrder from "@/components/AccordianOrder";
import { Card, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { set } from "react-hook-form";

const Page: React.FC = () => {
  const [page, setPage] = useState<number>(0); // page number for pagination
  const [pageCount, setPageCount] = useState<number>(0); // total number of pages
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "loading") return; // Do nothing while loading
      try {
        setLoading(true);
        const user_id = session?.user.id;
        console.log(status);

        if (!user_id) {
          console.log("User not logged in");
          throw new Error("User not logged in");
        }

        const response = await fetch(
          `/api/order_list?user_id=${user_id}&page=${page}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setOrders(result.orders);
        console.log(result);
        setPageCount(result.pageCount);
      } catch (error: any) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status, page]); // This useEffect runs once when the component mounts

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

      {/* // use material ui pagination */}
      {pageCount > 1 && (
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <Pagination
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => {
              setPage(value - 1);
            }}
            color="secondary"
          />
        </Card>
      )}

      {loading && (
        <div>
          <h2>Loading...</h2>
          <LinearProgress color="inherit" />
        </div>
      )}

      {!loading && orders && (
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

export default Page;
