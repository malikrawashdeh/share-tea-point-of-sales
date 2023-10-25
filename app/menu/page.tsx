import prisma from "@/lib/prisma";
import DrinkTable from "./DrinkTable";

const getDrinks = async () => {
    const drinks = await prisma.drinks.findMany({
        orderBy: [
            {id: 'asc',}
        ]
    });

    return drinks;
}

const DrinksPage = async () => {
    const drinks = await getDrinks();

    return (
        <div>
            <h1>Drinks Page</h1>
            <DrinkTable drinks={drinks}></DrinkTable>
        </div>
    )
}

export default DrinksPage;