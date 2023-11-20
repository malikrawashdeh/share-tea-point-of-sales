import { Paper } from "@mui/material";
import { drinks } from "@prisma/client";
import React, { FormEvent, useState } from "react";

interface FieldsProps {
    selectedDrink: drinks | undefined,
}

const Fields: React.FC<FieldsProps> = ({selectedDrink}) => {
    const [drink, setDrink] = useState(selectedDrink);

    const onChange = () => {
        
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
        <Paper sx={{marginBottom: '2rem'}}>
            {selectedDrink !== undefined ? 
                <form onSubmit={onSubmit}>
                    <label>
                        ID:
                        <input type="text" name="id" value={selectedDrink.id!}/>
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name" value={selectedDrink.drink_name!} />
                    </label>
                    <label>
                        Category:
                        <input type="text" name="category" value={selectedDrink.category_name!} />
                    </label>
                    <label>
                        Price:
                        <input type="text" name="price" value={selectedDrink.unit_price!} />
                    </label>
                    <label>
                        Desc:
                        <input type="text" name="description" value={selectedDrink.desc!} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            : "nothing"
            }

        </Paper>
    )
}

export default Fields;