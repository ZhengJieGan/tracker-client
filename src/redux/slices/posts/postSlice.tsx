import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import * as API from "../../../api/index";

export interface PostState {
  data: Array<any>;
  total: number;
}

const initialState: PostState = {
  data: [],
  total: 0,
};

export const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    updatePost: (state, action: PayloadAction<Array<any>>) => {
      state.data = action.payload;
    },
    updateTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

export async function fetchPost(dispatch: any, page: number): Promise<any> {
  try {
    // Retrieve the data from the API
    const data = await API.fetchPosts(page);
    // console.log(data)

    // Insert the data into the store
    dispatch(updatePost(data?.data?.posts));
    dispatch(updateTotal(data?.data?.total_posts));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createPost(dispatch: any, data: object): Promise<any> {
  try {
    console.log(data);
    // Retrieve the data from the API
    const response = await API.createPosts(data);
    // console.log(response);

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

export const { updatePost, updateTotal } = postSlice.actions;

export const selectPost = (state: RootState) => state.post.data;
export const selectTotal = (state: RootState) => state.post.total;

export default postSlice.reducer;
