'use server'

import { drinks, ingredients } from "@prisma/client";
import prisma from "./prisma";
import dayjs from "dayjs";

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

export const submitOrder = async (id: number, name: string, orderItems: drinks[]) => {
    const price = orderItems.map((item) => item.unit_price).reduce((acc, curr) => acc! + curr!);   

    const now = new Date();

    const order = await prisma.orders.create({
        data: {
            total_price: price,
            name: name,
            created_at: now,
            created_time: now,
            employee_id: id,
        }
    });

    const order_id = order.id;

    for (const drink of orderItems) {
        await prisma.order_items.create({
            data: {
                order_id: order_id,
                drink_id: drink.id
            }
        })
    }
}

type salesResponseItem = {
    drink_id: Number;
    drink_name: String;
    sales: Number;
};

export const getSalesData = async (beginDate: Date, endDate: Date) => {
    let result = new Array<salesResponseItem>();

    result = await prisma.$queryRaw`SELECT order_items.drink_id, drinks.drink_name, SUM(drinks.unit_price) AS sales
    FROM order_items
    INNER JOIN orders ON order_items.order_id = orders.id
    INNER JOIN drinks ON order_items.drink_id = drinks.id
    WHERE orders.created_at BETWEEN ${beginDate} AND ${endDate}
    GROUP BY order_items.drink_id, drinks.id`;

    return result;
}

export const getExcess = async (beginDate: Date) => {
    let result = new Array<ingredients>();

    const endDate = new Date();

    result = await prisma.$queryRaw`SELECT ingredients.id, ingredients.name, ingredients.quantity, ingredients.unit_price
    FROM item_ingredients
    INNER JOIN ingredients ON item_ingredients.ingredient_id = ingredients.id
    INNER JOIN order_items ON item_ingredients.item_id = order_items.id
    INNER JOIN orders ON order_items.order_id = orders.id
    WHERE orders.created_at BETWEEN ${beginDate} AND ${endDate}
    GROUP BY item_ingredients.ingredient_id, ingredients.id
    HAVING (COUNT(item_ingredients.id) / ingredients.quantity) < 0.1`;

    return result;
}
