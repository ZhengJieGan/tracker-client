import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import * as API from "../../../api/index";

export interface PostState {
  data: object;
}

const initialState: PostState = {
  data: {},
};

export const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    updateData: (state, action: PayloadAction<object>) => {
      state.data = action.payload;
    },
  },
});

export const { updateData } = postSlice.actions;

export const selectData = (state: RootState) => state.post.data;

export default postSlice.reducer;
