import prisma from "@/lib/prisma";
import { NextResponse } from "@/node_modules/next/server";

/**
 * @swagger
 * /api/excessReport:
 *   get:
 *     description: Get all ingredients that are in excess
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET(request: Request) {
  const beginDate = new Date("2023-09-10");
  const endDate = new Date();

  const result =
    await prisma.$queryRaw`SELECT ingredients.id, ingredients.name, ingredients.quantity, ingredients.unit_price
    FROM item_ingredients
    INNER JOIN ingredients ON item_ingredients.ingredient_id = ingredients.id
    INNER JOIN order_items ON item_ingredients.item_id = order_items.id
    INNER JOIN orders ON order_items.order_id = orders.id
    WHERE orders.created_at BETWEEN ${beginDate} AND ${endDate}
    GROUP BY item_ingredients.ingredient_id, ingredients.id
    HAVING (COUNT(item_ingredients.id) / ingredients.quantity) < 0.1`;

  return NextResponse.json({ result: result });
}
