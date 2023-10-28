import prisma from "@/lib/prisma"
import { drinks } from "@prisma/client";
import Categories from "./Categories";
import { Container, Grid } from "@mui/material";

const getDrinks = async () => {
    const drinks = await prisma.drinks.findMany({
        orderBy: [
            {id: 'asc',}
        ]
    });

    return drinks;
}

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

export default async function Employees() {
    const categoryDrinkMap = await getDrinksWithinCategories();

    return (
        <main>
            <Container style={{alignItems:'center', justifyContent:'center'}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{padding: '1rem',}}>
                    <Categories categories={Array.from(categoryDrinkMap.keys())}></Categories>
                </Grid>
            </Container>
        </main>
    )
}