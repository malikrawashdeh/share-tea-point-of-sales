"use client";

import Categories from "./Categories";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { getDrinksWithinCategories, submitOrder } from "@/lib/orderQueries";
import { drinks } from "@prisma/client";
import { useEffect, useState } from "react";
import React from "react";
import OrderBar from "./OrderBar";
import DrinksDisplay from "./DrinksDisplay";
import { useSelector, useDispatch, selectCart, cartSlice } from "@/lib/redux";
import Image from "next/image";
import { useSession } from "next-auth/react";

/**
 * Page level component for the Customer Order View
 * @returns Main Order Page
 */
export default function Page() {
  // Processing/Load tracking
  const [loading, setLoading] = useState(true);
  // Stores the drink menu mapped to each drink's category
  const [menu, setMenu] = useState(new Map<string, drinks[]>());
  // Page State tracking for current order step. "categories", "drinks"
  const [table, setTable] = useState("categories");
  // Previous page State tracking for current order step. "categories", "drinks"
  const [prevtable, setPrevTable] = useState("categories");
  // The current user selected drink
  const [drink, setDrink] = useState<drinks>();
  // use redux for order
  const order = useSelector(selectCart);
  const dispatch = useDispatch();
  // Grab user session info
  const { data: session, status } = useSession();

  /**
   * Retierves the store's drink menu using the proper server action
   */
  const getMenu = React.useCallback(async () => {
    setLoading(true);
    const menu = await getDrinksWithinCategories();
    setMenu(menu);
    setLoading(false);
  }, []);

  const submitOrderCustomer = React.useCallback(
    async (id: number, name: string, orderItems: drinks[]) => {
      await submitOrder(id, name, orderItems);
    },
    []
  );

  const changeDrinkState = (drink: drinks) => {
    setDrink(drink);
  };

  const changeTableState = (newtable: string) => {
    setPrevTable(table);
    setTable(newtable);
  };

  const addDrinkToOrder = (drink: drinks) => {
    dispatch(cartSlice.actions.addToCart(drink));
  };

  const removeItem = (index: number) => {
    dispatch(cartSlice.actions.removeFromCart(index));
  };

  const clearOrder = () => {
    dispatch(cartSlice.actions.clearCart());
  };

  const finishOrder = () => {
    if (order.length > 0) {
      console.log("submitting order");
      console.log(session);
      submitOrderCustomer(Number(session?.user.id), session?.user.name!, order);
      clearOrder();
    }
  };

  const back = () => {
    const tmp = table;
    setTable(prevtable);
    setPrevTable(tmp);
  };

  useEffect(() => {
    if (menu.size === 0) {
      getMenu();
    }
  }, []);

  if (loading) {
    return (
      <main>
        <Box
          sx={{ display: "flex" }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress sx={{ color: "red" }} />
        </Box>
      </main>
    );
  } else if (table === "categories") {
    return (
      <main>
        <Container style={{ alignItems: "center", justifyContent: "center" }}>
          <OrderBar
            order={order}
            clearOrder={clearOrder}
            finishOrder={finishOrder}
            back={back}
            removeItem={removeItem}
          ></OrderBar>
        </Container>

        <Container style={{ alignItems: "center", justifyContent: "center" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            style={{ padding: "1rem" }}
          >
            <Categories
              categories={Array.from(menu.keys())}
              setTableState={changeTableState}
            ></Categories>
          </Grid>
        </Container>
      </main>
    );
  } else if (table === "payment") {
    return <main></main>;
  } else {
    return (
      <main>
        <Container style={{ alignItems: "center", justifyContent: "center" }}>
          <OrderBar
            order={order}
            clearOrder={clearOrder}
            finishOrder={finishOrder}
            back={back}
            removeItem={removeItem}
          ></OrderBar>
        </Container>

        <Container style={{ alignItems: "center", justifyContent: "center" }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            style={{ padding: "1rem" }}
          >
            <DrinksDisplay
              drinkCategoryMap={menu}
              category={table}
              setDrink={changeDrinkState}
              addDrinkToOrder={addDrinkToOrder}
            ></DrinksDisplay>
          </Grid>
        </Container>
      </main>
    );
  }
}
