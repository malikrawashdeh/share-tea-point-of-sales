/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { drinks } from "@prisma/client";

const initialState: CartSliceState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToCart: (state, action: PayloadAction<drinks>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    // clear cart
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

/* Types */
export interface CartSliceState {
  cart: drinks[];
}
