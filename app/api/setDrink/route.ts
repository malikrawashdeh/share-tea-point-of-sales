import { getDrinks } from "@/lib/orderQueries";
import prisma from "@/lib/prisma";
import { NextResponse } from "@/node_modules/next/server";

export async function POST(request: Request) {

    const data = await request.json();

    console.log(data);

    const updateDrink = await prisma.drinks.update({
        where: {
            id: data.id,
        },
        data: {
            drink_name: data.drink_name,
            category_name: data.category_name,
            unit_price: data.unit_price,
            desc: data.desc
        }
    })

    return NextResponse.json({});
}