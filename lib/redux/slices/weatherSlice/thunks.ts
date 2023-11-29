/* Instruments */
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { fetchTempCall } from "./fetchTempCall";
import { selectTemp } from "./selectors";
import type { ReduxThunkAction } from "@/lib/redux";

type Payload = {
  lat: number;
  long: number;
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getWeatherAsync = createAppAsyncThunk(
  "weather/fetchTempCall",
  async (payload: Payload) => {
    const { lat, long } = payload;
    const response = await fetchTempCall(lat, long);
    console.log(response);
    // The value we return becomes the `fulfilled` action payload
    return {
      temp: response?.main?.temp ?? undefined,
      icon: response?.weather[0]?.icon ?? undefined,
    };
  }
);

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOddAsync =
//   (amount: number): ReduxThunkAction =>
//   (dispatch, getState) => {
//     const currentValue = selectTemp(getState());

//     if (currentValue.temp % 2 === 1) {
//       dispatch(getWeatherAsync(amount));
//     }
//   };
