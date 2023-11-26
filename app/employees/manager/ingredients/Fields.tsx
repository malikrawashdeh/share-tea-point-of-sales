import { Paper } from "@mui/material";
import { ingredients } from "@prisma/client";
import React, { FormEvent, useState } from "react";

interface FieldsProps {
    selectedIngredient: ingredients | undefined,
}

const Fields: React.FC<FieldsProps> = ({selectedIngredient}) => {
    const [ingredient, setIngredient] = useState(selectedIngredient);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newIngredient = ingredient;
        switch (e.target.name) {
            case "name":
                newIngredient!.name = e.target.textContent;
                break;
            case "unit_price":
                newIngredient!.unit_price = e.target.textContent;
                break;
            case "quantity":
                // TODO: ACCOUNT FOR NULL
                newIngredient!.quantity = parseFloat(e.target.textContent!);
                break;
            case "min_quantity":
                newIngredient!.min_quantity = parseFloat(e.target.textContent!);
                break;
            default:
                break;
        }
        setIngredient(newIngredient);
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/setIngredient', {
          method: 'POST',
          body: formData,
        })
    }

    return (
        <>
            {ingredient !== undefined ? 
                <form onSubmit={onSubmit}>
                    <label>
                        ID:
                        <input type="text" name="id" value={ingredient.id!} />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name" value={ingredient.name!} onChange={(e) => onChange(e)}/>
                    </label>
                    <label>
                        Quantity:
                        <input type="text" name="category_name" value={ingredient.quantity!} onChange={(e) => onChange(e)}/>
                    </label>
                    <label>
                        Unit Price:
                        <input type="text" name="unit_price" value={ingredient.unit_price!} onChange={(e) => onChange(e)}/>
                    </label>
                    <label>
                        Minimum Quantity:
                        <input type="text" name="desc" value={ingredient.min_quantity!} onChange={(e) => onChange(e)}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            : "nothing"
            }
        </>
    )
}