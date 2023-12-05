import Subheader from "@/components/Subheader";
import { Modal, Box, Typography } from "@mui/material";
import { drinks } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface props {
    modalOpen: boolean;
    setModalOpen(arg0: boolean): void;
    clearOrder(): void;
    order: drinks[];
};

const RetrospectModel: React.FC<props> = ({modalOpen, setModalOpen, clearOrder, order}) => {
  const [orderState, setOrderState] = useState(new Array<drinks>());

  const total = orderState.length !== 0 && orderState !== null ? orderState.map((item) => item.unit_price).reduce((acc, curr) => acc! + curr!)! : 0.00;

  useEffect(() => {
    if (order !== orderState && order.length !== 0) {
      setOrderState(order);
    }
  }, [order]);

  return (
<Modal
        open={!!modalOpen}
        onClose={() => {setModalOpen(false); clearOrder();}}
        aria-labelledby="drink-description-modal"
        aria-describedby="drink-description"
        aria-label={"Order comfirmation with childern text"}
      >
        <Box
          aria-label={"Order comfirmation with childern text"}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '25%',
            height: '50%',
            bgcolor: 'background.paper',
            border: '2px solid red',
            borderRadius: 8,
            p: 2,
            overflow: 'hidden',
          }}
        >
          <Typography variant="h5" color="black">
           Thank You for your order!
          </Typography>
          <Typography variant="h4" color="black" sx={{mt: '30px'}}>
            {order.length + " drinks ordered"}
          </Typography>
          <Typography variant="h4" color="black" sx={{mt: '30px'}}>
            {"$ " + total}
          </Typography>
        </Box>
      </Modal>
  );
}

export default RetrospectModel;