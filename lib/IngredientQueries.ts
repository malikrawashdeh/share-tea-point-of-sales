'use server'

import { ingredients } from "@prisma/client";
import prisma from "./prisma";

export const getIngredients = async () => {
    const drinks = await prisma.ingredients.findMany({
        orderBy: [
            {id: 'asc',}
        ]
    });

    return drinks;
}



