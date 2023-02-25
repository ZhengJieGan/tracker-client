import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import * as API from "../../../api/index";

export interface ItemState {
  data: Array<any>;
}

const initialState: ItemState = {
  data: [],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,

  reducers: {
    updateItem: (state, action: PayloadAction<Array<any>>) => {
      state.data = action.payload;
    },
  },
});

export async function fetchItem(dispatch: any): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.fetchItems();
    console.log(response);
    // Insert the data into the store
    dispatch(updateItem(response?.data?.items));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const { updateItem } = itemSlice.actions;

export const itemDetails = (state: RootState) => state.item.data;

export default itemSlice.reducer;
