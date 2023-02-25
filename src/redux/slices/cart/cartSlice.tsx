import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import * as API from "../../../api/index";

export interface CartState {
  data: Array<any>;
}

const initialState: CartState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    updateCartData: (state, action: PayloadAction<Array<any>>) => {
      state.data = action.payload;
    },
  },
});

interface data {
  itemId: string;
  quantity: number;
  userId: string | null;
}

export async function fetchCart(dispatch: any): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.fetchCart();
    console.log(response);
    // Insert the data into the store
    dispatch(updateCartData(response?.data?.cart));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateCart(dispatch: any, data: data): Promise<any> {
  try {
    console.log(data);
    // Retrieve the data from the API
    const response = await API.insertCart(
      data.itemId,
      data.quantity,
      data.userId
    );

    // Insert the data into the store
    dispatch(updateCartData(response?.data?.cart));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteFromCart(dispatch: any, id: string): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.deleteFromCart(id);
    console.log(response);
    // Insert the data into the store
    dispatch(updateCartData(response?.data?.cart));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const { updateCartData } = cartSlice.actions;

export const cartDetails = (state: RootState) => state.cart.data;

export default cartSlice.reducer;
