import prisma from "@/lib/prisma";
import { NextResponse } from "@/node_modules/next/server";

/**
 * @swagger
 * /api/restockReport:
 *   get:
 *     description: Get all ingredients that need to be restocked
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET(request: Request) {
  const result =
    await prisma.$queryRaw`SELECT * FROM ingredients WHERE quantity < min_quantity`;
  return NextResponse.json({ result: result });
}
