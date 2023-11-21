'use-client'

import DrinkTable from "./DrinkTable";
import prisma from "@/lib/prisma";

const getDrinks = async () => {
    const drinks = await prisma.drinks.findMany({
        orderBy: [{id:'asc'}]
    });
}

const Page = () => {
    return {
        
    }
}

export default Page;