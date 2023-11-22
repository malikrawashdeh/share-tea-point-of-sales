import { NextResponse, NextRequest } from "next/server";

import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import { drinks, orders, order_items } from "@prisma/client";

type Order = {
  order_id: number;
  total_price: number;
  name: string;
  user_id: number;
  created_at: Date;
  created_time: string;
  drinks: drinks[];
};

export async function GET(req: NextRequest) {
  const pageSize = 20;
  try {
    console.log(req.url);
    // parse query params
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");
    const page = url.searchParams.get("page");

    // check if these are instances of number
    if (user_id && isNaN(Number(user_id))) {
      return NextResponse.json(
        { orders: null, message: "User id must be a number" },
        { status: 400 }
      );
    }
    if (page && isNaN(Number(page))) {
      return NextResponse.json(
        { orders: null, message: "Page must be a number" },
        { status: 400 }
      );
    }

    if (!user_id) {
      return NextResponse.json(
        { orders: null, message: "User id not provided" },
        { status: 400 }
      );
    }
    const user_orders: orders[] = await prisma.orders.findMany({
      where: { employee_id: Number(user_id) },
      orderBy: { created_at: "desc" },
      skip: page ? Number(page) * pageSize : 0,
      take: pageSize,
    });

    if (!user_orders || user_orders.length === 0) {
      return NextResponse.json(
        { orders: null, message: "No orders found" },
        { status: 404 }
      );
    }
    const response_orders: Order[] = [];

    for (const order of user_orders) {
      const { id: order_id, total_price, created_at, created_time } = order;
      const items: order_items[] = await prisma.order_items.findMany({
        where: { order_id },
      });

      const order_drinks: drinks[] = (
        await Promise.all(
          items
            .filter((item) => item !== null) // Filter out null values
            .map(async (item) => {
              const { drink_id } = item!;
              const drink = await prisma.drinks.findFirst({
                where: { id: drink_id || undefined }, // Provide fallback value of undefined
              });
              return drink || null; // Return null if drink is not found
            })
        )
      ).filter((drink): drink is drinks => drink !== null); // Filter out null values
      response_orders.push({
        order_id,
        total_price: total_price || 0,
        name: order.name || "",
        user_id: order.employee_id || 0,
        created_at: created_at || new Date(),
        created_time: created_time?.toLocaleString() || "",
        drinks: order_drinks,
      });
    }

    return NextResponse.json(
      { orders: response_orders, message: "Orders found" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { orders: null, message: error.message },
      { status: 500 }
    );
  }
}
