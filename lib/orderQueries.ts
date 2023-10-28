'use server'

import { drinks } from "@prisma/client";
import prisma from "./prisma";

export const getDrinks = async () => {
    const drinks = await prisma.drinks.findMany({
        orderBy: [
            {id: 'asc',}
        ]
    });

    return drinks;
}

export const getAllDrinkCategories = async () => {
    const categories = await prisma.drinks.findMany({
        select: {
            category_name: true
        },
        distinct: ['category_name']
    })

    return categories.map((value) => (value.category_name));
}

export const getDrinksWithinCategories = async () => {
    const categories = await getAllDrinkCategories();
    let categoryDrinkMap = new Map<string, drinks[]>();

    categories.forEach((cat) => {
        cat = cat !== null ? (cat) : "N/A";
        categoryDrinkMap.set(cat, []);
    });

    for (const cat of categoryDrinkMap.keys()) {
        let drinks = await prisma.drinks.findMany({
            where: {
                category_name: cat
            }
        });

        categoryDrinkMap.set(cat, drinks);
    }

    return categoryDrinkMap;
}