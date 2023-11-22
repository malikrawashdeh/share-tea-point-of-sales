import { getDrinks } from "@/lib/orderQueries";
import prisma from "@/lib/prisma";
import { NextResponse } from "@/node_modules/next/server";

export async function GET(request: Request) {
    const result = await getDrinks();
    return NextResponse.json({result: result});
}