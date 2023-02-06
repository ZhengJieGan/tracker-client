import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import * as API from "../../../api/index";

export interface CommentState {
  data: Array<any>;
}

const initialState: CommentState = {
  data: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,

  reducers: {
    updateComment: (state, action: PayloadAction<Array<any>>) => {
      state.data = action.payload;
    },
  },
});

export async function fetchComment(dispatch: any): Promise<any> {
  try {
    // Retrieve the data from the API
    const data = await API.fetchComments();

    // Insert the data into the store
    dispatch(updateComment(data?.data?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface data { 
    name: string;
    message: string;
    id: string;
}

export async function createComment(dispatch: any, data: data): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.createComments("name", "test", data.id);
    console.log(response.data);

    // Insert the data into the store
    dispatch(updateComment(response?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editComment(
  dispatch: any,
  id: string,
  data: object
): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.updatePosts(id, data);

    // Insert the data into the store
    dispatch(updateComment(response?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteComment(dispatch: any, id: string): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.deletePosts(id);

    // Insert the data into the store
    dispatch(updateComment(response?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const { updateComment } = commentSlice.actions;

export const selectComment = (state: RootState) => state.comment.data;

export default commentSlice.reducer;
