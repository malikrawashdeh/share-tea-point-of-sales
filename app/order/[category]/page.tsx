import prisma from "@/lib/prisma";
import DrinkCardGrid from "./DrinkCardGrid";
import { drinks } from "@prisma/client";

const getAllDrinkCategories = async () => {
    const categories = await prisma.drinks.findMany({
        select: {
            category_name: true
        },
        distinct: ['category_name']
    })

    return categories.map((value) => (value.category_name));
}

const getDrinksWithinCategories = async () => {
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

export default async function Page() {
    const drinkCategoryMap = await getDrinksWithinCategories();

    return (
        <main>
            <DrinkCardGrid drinkCategoryMap={drinkCategoryMap}></DrinkCardGrid>
        </main>
    )
}