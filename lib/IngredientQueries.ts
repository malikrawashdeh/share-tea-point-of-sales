'use server'

import { ingredients } from "@prisma/client";
import prisma from "./prisma";

export const getIngredients = async () => {
    const ingredients = await prisma.ingredients.findMany({
        orderBy: [
            {id: 'asc',}
        ]
    });

    return ingredients;
}



