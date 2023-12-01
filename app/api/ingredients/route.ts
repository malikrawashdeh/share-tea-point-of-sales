import { getIngredients } from "@/lib/IngredientQueries";
import prisma from "@/lib/prisma";
import { NextResponse } from "@/node_modules/next/server";

export async function GET(request: Request) {
    const result = await getIngredients();
    return NextResponse.json({result: result});
}