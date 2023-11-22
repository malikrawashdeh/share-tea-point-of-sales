import { Modal, Box, Typography } from "@mui/material";
import { drinks } from "@prisma/client";
import React from "react";
import Fields from "./Fields";
import FormDialog from "./FormDialog";

interface PopupProps {
    drink: drinks | undefined,
    handleModalClose(): void,
};

const Popup: React.FC<PopupProps> = ({drink, handleModalClose}) => {
    return (
        <Modal
        open={!!drink}
        onClose={handleModalClose}
        aria-labelledby="drink-description-modal"
        aria-describedby="drink-description"
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