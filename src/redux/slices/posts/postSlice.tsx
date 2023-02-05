import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import * as API from "../../../api/index";

export interface PostState {
  data: Array<any>;
}

const initialState: PostState = {
  data: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    updateData: (state, action: PayloadAction<Array<any>>) => {
      state.data = action.payload;
    },
  },
});

export async function fetchData(dispatch: any): Promise<any> {
  try {
    // Retrieve the data from the API
    const data = await API.fetchPosts();

    // Insert the data into the store
    dispatch(updateData(data?.data?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createData(dispatch: any, data: object): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.createPosts(data);

    // Insert the data into the store
    dispatch(updateData(response?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editData(
  dispatch: any,
  id: string,
  data: object
): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.updatePosts(id, data);

    // Insert the data into the store
    dispatch(updateData(response?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteData(dispatch: any, id: string): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.deletePosts(id);

    // Insert the data into the store
    dispatch(updateData(response?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const { updateData } = postSlice.actions;

export const selectData = (state: RootState) => state.post.data;

export default postSlice.reducer;
