"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Order } from "@/types/Order";
import CircularProgress from "@mui/material/CircularProgress";

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
    <div>
      <h1>Orders</h1>
      {loading && (
        <div>
          <h2>Loading...</h2>
          <CircularProgress color="inherit" />
        </div>
      )}
      {orders && orders[0].order_id}
      {orders && (
        <div>
          {orders.map((order) => (
            <div key={order.order_id}>
              <h2>Order #{order.order_id}</h2>
              <p>Order placed on {String(order.created_at)}</p>
              <p>Order total: ${order.total_price}</p>
              <p>Order items:</p>
              <ul>
                {order.drinks.map((item) => (
                  <li key={item.id}>
                    {item.drink_name} - ${item.unit_price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default page;
