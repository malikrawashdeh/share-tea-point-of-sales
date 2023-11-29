import { getIngredients } from "@/lib/IngredientQueries";
import prisma from "@/lib/prisma";
import { NextResponse } from "@/node_modules/next/server";

export async function POST(request: Request) {

    const data = await request.json();

    console.log(data);

    if (data.unit_price < 0.0) {
        return NextResponse.json({});
    }

    if (data.id == -1) {
        const insertIngredient = await prisma.ingredients.create({
            data: {
                name: data.name,
                unit_price: data.unit_price,
                quantity: data.quantity,
                min_quantity: data.min_quantity
            }
        });

        return NextResponse.json({});
    }

    const updateIngredient = await prisma.ingredients.update({
        where: {
            id: data.id,
        },
        data: {
            name: data.name,
            unit_price: data.unit_price,
            quantity: data.quantity,
            min_quantity: data.min_quantity
        }
    })

    return NextResponse.json({});
}