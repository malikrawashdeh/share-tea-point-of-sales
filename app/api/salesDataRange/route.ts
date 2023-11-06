import prisma from "@/lib/prisma";
import { NextResponse } from "@/node_modules/next/server";

export async function GET(request: Request) {
    const beginDate = new Date("2023-09-10");
    const endDate = new Date();

    const result = await prisma.$queryRaw`SELECT order_items.drink_id, drinks.drink_name, SUM(drinks.unit_price) AS sales
    FROM order_items
    INNER JOIN orders ON order_items.order_id = orders.id
    INNER JOIN drinks ON order_items.drink_id = drinks.id
    WHERE orders.created_at BETWEEN ${beginDate} AND ${endDate}
    GROUP BY order_items.drink_id, drinks.id`;

    return NextResponse.json({result: result});
}