import Subheader from "@/components/Subheader";
import { Modal, Box, Typography } from "@mui/material";
import { drinks } from "@prisma/client";
import React from "react";

interface props {
    modalOpen: boolean;
    setModalOpen(arg0: boolean): void;
    order: drinks[],
};

const RetrospectModel: React.FC<props> = ({modalOpen, setModalOpen, order}) => {
    const total = order.length !== 0 && order !== null ? order.map((item) => item.unit_price).reduce((acc, curr) => acc! + curr!)! : 0.00;

    return (
        <Modal
        open={!!modalOpen}
        onClose={() => (setModalOpen(false))}
        aria-labelledby="drink-description-modal"
        aria-describedby="drink-description"
      >
        <Box
          sx={{
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
        <Subheader text={"Thank you!"}/>
        </Box>
      </Modal>
    );
}

export default RetrospectModel;