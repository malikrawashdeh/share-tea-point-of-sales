// OrderContext.tsx
import { drinks } from '@prisma/client';
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

type OrderItem = {
  // Define your order item structure here
  id: number;
  name: string;
  price: number;
};

type ShippingInfo = {
  // Define your shipping information structure here
  // ...
};

type PaymentInfo = {
  // Define your payment information structure here
  // ...
};

type OrderState = {
  items: drinks[];
};

type OrderAction = { type: string; payload: any }; // Define your action types

const OrderContext = createContext<{ order: OrderState; dispatch: Dispatch<OrderAction> } | undefined>(undefined);

const initialState: OrderState = {
  items: [],
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

// type OrderProviderProps = {
//   children: ReactNode;
// };

// export function OrderProvider({ children }: OrderProviderProps) {
//   const [order, dispatch] = useReducer(orderReducer, initialState);

//   return (
//     <OrderContext.Provider value={{ order, dispatch }}>
//       {children}
//     </OrderContext.Provider>
//   );
// }

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}