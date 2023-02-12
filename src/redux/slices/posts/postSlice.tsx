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
    updatePost: (state, action: PayloadAction<Array<any>>) => {
      state.data = action.payload;
    },
  },
});

export async function fetchPost(dispatch: any): Promise<any> {
  try {
    // Retrieve the data from the API
    const data = await API.fetchPosts();

    // Insert the data into the store
    dispatch(updatePost(data?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createPost(dispatch: any, data: object): Promise<any> {
  try {

    console.log(data)
    // Retrieve the data from the API
    const response = await API.createPosts(data);
    console.log(response)

    // Insert the data into the store
    dispatch(updatePost(response?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editPost(
  dispatch: any,
  id: string,
  data: object
): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.updatePosts(id, data);

    // Insert the data into the store
    dispatch(updatePost(response?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletePost(dispatch: any, id: string): Promise<any> {
  try {
    // Retrieve the data from the API
    const response = await API.deletePosts(id);

    // Insert the data into the store
    dispatch(updatePost(response?.data));
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
    // console.log(data.name)
    // Retrieve the data from the API
    const response = await API.createComments("name", "test", data.id);
    console.log(response.data);

    // Insert the data into the store
    dispatch(updatePost(response?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const { updatePost } = postSlice.actions;

export const selectPost = (state: RootState) => state.post.data;

export default postSlice.reducer;
