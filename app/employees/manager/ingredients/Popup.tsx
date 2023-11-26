import { Modal, Box, Typography } from "@mui/material";
import { ingredients } from "@prisma/client";
import React from "react";
import Fields from "./Fields";
import FormDialog from "./FormDialog";

interface PopupProps {
    ingredient: ingredients | undefined,
    handleModalClose(): void,
};

const Popup: React.FC<PopupProps> = ({ingredient, handleModalClose}) => {
    return (
        <Modal
        open={!!ingredient}
        onClose={handleModalClose}
        aria-labelledby="ingredient-description-modal"
        aria-describedby="ingredient-description"
        >
        <Box
          sx={{
            color: 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400, // Set the width to your desired size
            height: 400, // Set the height to your desired size
            bgcolor: 'background.paper',
            border: '2px solid red', // Set border color to red
            borderRadius: 8, // Optional: Add border radius for a rounded appearance
            p: 2,
          }}
        >
        
        </Box>
      </Modal>
    );
}

export default Popup;