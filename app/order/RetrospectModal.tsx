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
      <Subheader text={"Your order for " + orderState.length + " drinks at a total of $" + total.toFixed(2) + " is confirmed"}/>
          <Link href="/pastorders">
          <button onClick={() => {clearOrder();}} style={{ textDecoration: 'none', color: 'white', backgroundColor: '#ce0e2d', padding: '15px 30px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '20px'}}>
            View Orders
          </button>
          </Link>
      </Box>
    </Modal>
  );
}

export default RetrospectModel;