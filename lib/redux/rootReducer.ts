/* Instruments */
import { cartSlice } from "./slices";
import { weatherSlice } from "./slices";

export const reducer = {
  cart: cartSlice.reducer,
  weather: weatherSlice.reducer,
};
