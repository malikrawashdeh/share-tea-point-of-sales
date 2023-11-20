'use client'

import DrinkTable from "./DrinkTable";
import { FormEvent, useEffect, useState } from "react";
import { drinks } from "@prisma/client";
import React from "react";
import Fields from "./Fields";

const DrinksPage = () => {
    const [selectedDrink, setSelectedDrink] = useState<drinks>();
    const [drinks, setDrinks] = useState<drinks[]>();
    const [loading, setLoading] = useState(true);

    const changeDrink = (newDrink: drinks) => {
        setSelectedDrink(newDrink);
        console.log(newDrink);
    }

    const grabDrinks = React.useCallback(async () => {
        setLoading(true);
        const result = await fetch('/api/drinks/', {});
        const data = await result.json();
        console.log(data);
        setDrinks(data.result);
        setLoading(false);
    }, []);

    useEffect(() => {
        grabDrinks();
    }, []);

    return !loading ? (
        <div>
            <Fields selectedDrink={selectedDrink}></Fields>
            <DrinkTable drinks={drinks!} changeDrink={changeDrink}></DrinkTable>
        </div>
    ) : (
        <></>
    )
}

export default DrinksPage;