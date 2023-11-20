import { getDrinks } from "@/lib/orderQueries";
import prisma from "@/lib/prisma";
import { NextResponse } from "@/node_modules/next/server";

export async function POST(request: Request) {

    const req = await request.formData();

    const updateDrink = await prisma.drinks.update({
        where: {
            id: parseInt(req.get('id') as string),
        },
        data: {
            drink_name: req.get('name') as string,
            category_name: req.get('category') as string,
            unit_price: parseFloat(req.get('price') as string),
            desc: req.get('description') as string
        }
    })

    return NextResponse.json({});
}