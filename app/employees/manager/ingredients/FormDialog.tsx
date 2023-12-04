import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ingredients } from '@prisma/client';
import { useState } from 'react';

interface FormDialogProps {
    ingredient: ingredients | undefined,
    handleModalClose(): void,
};

/**
 * Pop-up for modifying/creating a new ingredient
 * 
 * @param ingredient The user selected ingredient
 * @param handleModalClose Callback to clean up the modal sence upon user close 
 * @returns Modal Element
 */
const FormDialog: React.FC<FormDialogProps> = ({ingredient, handleModalClose}) => {
    const [newIngredient, setNewIngredient] = useState<ingredients>();
  
    const handle_ingredient_name = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (newIngredient !== undefined) {
        let tmp = newIngredient;
        tmp.name = e.target.value;
        setNewIngredient(tmp);
      }
    }
    const handle_unit_price = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (newIngredient !== undefined) {
        let tmp = newIngredient;
        tmp.unit_price = e.target.value;
        setNewIngredient(tmp);
      }
    }
    const handle_ingredient_quantity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (newIngredient !== undefined) {
        let tmp = newIngredient;
        tmp.quantity = parseFloat(e.target.value);
        setNewIngredient(tmp);
      }
    }
    const handle_ingredient_min_quantity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (newIngredient !== undefined) {
        let tmp = newIngredient;
        tmp.min_quantity = parseFloat(e.target.value);
        setNewIngredient(tmp);
      }
    }
  
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      
      console.log(newIngredient);
  
      const response = await fetch('/api/setIngredient', {
        method: 'POST',
        body: JSON.stringify(newIngredient),
      })
  
      handleModalClose();
    }
  
    React.useEffect(() => {
      if (ingredient !== newIngredient) {
        setNewIngredient(ingredient);
      }
    }, [ingredient]);
  
    return (
      <React.Fragment>
        <Dialog open={!!ingredient} onClose={handleModalClose}>
          <DialogTitle>Ingredient Information Update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit the ingredient attributes as desired:
            </DialogContentText>
            <TextField
              autoFocus
              id="ingredient_name_field"
              margin="dense"
              label="ingredient Name"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={ingredient?.name}
              onChange={(e) => {handle_ingredient_name(e)}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="category_name"
              label="ingredient unit price"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={ingredient?.unit_price}
              onChange={(e) => {handle_unit_price(e)}}
            />
            <TextField
              autoFocus
              margin="dense"
              id="unit_price"
              label="ingredient quantity"
              type="number"
              fullWidth
              variant="standard"
              defaultValue={ingredient?.quantity}
              onChange={(e) => {handle_ingredient_quantity(e)}}
            />
            <TextField
              autoFocus
              multiline
              margin="dense"
              id="desc"
              label="ingredient minimum quantity"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={ingredient?.min_quantity}
              onChange={(e) => {handle_ingredient_min_quantity(e)}}
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