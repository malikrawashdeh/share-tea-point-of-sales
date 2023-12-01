import { Paper } from "@mui/material";
import { drinks } from "@prisma/client";
import React, { FormEvent, useState } from "react";

interface FieldsProps {
    selectedDrink: drinks | undefined,
}

const Fields: React.FC<FieldsProps> = ({selectedDrink}) => {
    const [drink, setDrink] = useState(selectedDrink);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newDrink = drink;
        switch (e.target.name) {
            case "drink_name":
                newDrink!.drink_name = e.target.textContent;
                break;
            case "category_name":
                newDrink!.category_name = e.target.textContent;
                break;
            case "unit_price":
                // TODO: ACCOUNT FOR NULL
                newDrink!.unit_price = parseFloat(e.target.textContent!);
                break;
            case "desc":
                newDrink!.desc = e.target.textContent;
                break;
            default:
                break;
        }
        setDrink(newDrink);
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
     
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/setDrink', {
          method: 'POST',
          body: formData,
        })
    }

    return (
        <>
            {drink !== undefined ? 
                <form onSubmit={onSubmit}>
                    <label>
                        ID:
                        <input type="text" name="id" value={drink.id!} />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="drink_name" value={drink.drink_name!} onChange={(e) => onChange(e)}/>
                    </label>
                    <label>
                        Category:
                        <input type="text" name="category_name" value={drink.category_name!} onChange={(e) => onChange(e)}/>
                    </label>
                    <label>
                        Price:
                        <input type="text" name="unit_price" value={drink.unit_price!} onChange={(e) => onChange(e)}/>
                    </label>
                    <label>
                        Desc:
                        <input type="text" name="desc" value={drink.desc!} onChange={(e) => onChange(e)}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            : "nothing"
            }
        </>
    )
}

export default Fields;