import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { drinks } from '@prisma/client';
import { useState } from 'react';

interface FormDialogProps {
    drink: drinks | undefined,
    handleModalClose(): void,
};

/**
 * Pop-up for modifying/creating a new drink
 * 
 * @param drink The user selected drink
 * @param handleModalClose Callback to clean up the modal sence upon user close 
 * @returns Modal Element
 */
const FormDialog: React.FC<FormDialogProps> = ({drink, handleModalClose}) => {
  const [newDrink, setNewDrink] = useState<drinks>();

  const handle_drink_name = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newDrink !== undefined) {
      let tmp = newDrink;
      tmp.drink_name = e.target.value;
      setNewDrink(tmp);
    }
  }
  const handle_drink_category = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newDrink !== undefined) {
      let tmp = newDrink;
      tmp.category_name = e.target.value;
      setNewDrink(tmp);
    }
  }
  const handle_unit_price = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newDrink !== undefined) {
      let tmp = newDrink;
      tmp.unit_price = parseFloat(e.target.value);
      setNewDrink(tmp);
    }
  }
  const handle_drink_desc = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newDrink !== undefined) {
      let tmp = newDrink;
      tmp.desc = e.target.value;
      setNewDrink(tmp);
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    
    console.log(newDrink);

    const response = await fetch('/api/setDrink', {
      method: 'POST',
      body: JSON.stringify(newDrink),
    })

    handleModalClose();
  }

  React.useEffect(() => {
    if (drink !== newDrink) {
      setNewDrink(drink);
    }
  }, [drink]);

  return (
    <React.Fragment>
      <Dialog open={!!drink} onClose={handleModalClose}>
        <DialogTitle>Drink Information Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the drink attributes as desired:
          </DialogContentText>
          <TextField
            autoFocus
            id="drink_name_field"
            margin="dense"
            label="Drink Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={drink?.drink_name}
            onChange={(e) => {handle_drink_name(e)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="category_name"
            label="Drink Category"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={drink?.category_name}
            onChange={(e) => {handle_drink_category(e)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="unit_price"
            label="Drink Price"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={drink?.unit_price}
            onChange={(e) => {handle_unit_price(e)}}
          />
          <TextField
            autoFocus
            multiline
            margin="dense"
            id="desc"
            label="Drink Description"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={drink?.desc}
            onChange={(e) => {handle_drink_desc(e)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={(e) => handleSubmit(e)}>Submit Changes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormDialog;