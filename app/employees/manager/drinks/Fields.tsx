import { Paper } from "@mui/material";
import { drinks } from "@prisma/client";
import React, { useState } from "react";

interface FieldsProps {
    selectedDrink: drinks | undefined,
}

const Fields: React.FC<FieldsProps> = ({selectedDrink}) => {
    const [drink, setDrink] = useState(selectedDrink);

    const onChange = () => {
        
    }

    return (
        <Paper sx={{marginBottom: '2rem'}}>
            {selectedDrink !== undefined ? 
                <form>
                <label>
                    Name:
                    <input type="text" name="name" value={selectedDrink.drink_name!} />
                </label>
                <label>
                    Category:
                    <input type="text" name="name" value={selectedDrink.drink_name!} />
                </label>
                <label>
                    Price:
                    <input type="text" name="name" value={selectedDrink.drink_name!} />
                </label>
                <label>
                    Desc:
                    <input type="text" name="name" value={selectedDrink.drink_name!} />
                </label>
                <input type="submit" value="Submit" />
                </form>
            : "nothing"
            }

        </Paper>
    )
}

export default Fields;