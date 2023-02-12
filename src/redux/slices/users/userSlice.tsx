import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import * as API from "../../../api/index";
import { updatePost } from "../posts/postSlice";

export interface UserState {
  id: null;
  name: null;
  email: null;
  valid: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  valid: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    updateUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    updateValidation: (state, action) => {
      state.valid = action.payload;
    },
  },
});

interface user {
  name: string;
  email: string;
  password: string;
}

export async function createUser(dispatch: any, user: user): Promise<any> {
  try {
    // Retrieve the data from the API
    const { data } = await API.signUp(user.name, user.email, user.password);

    const payload = {
      id: data?._id?.$oid,
      name: data?.name,
      email: data?.email,
    };

    // Insert the data into the store
    dispatch(updateUser(payload));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface login {
  email: string;
  password: string;
}

export async function loginUser(dispatch: any, user: login): Promise<any> {
  try {
    // Retrieve the data from the API
    const { data } = await API.signIn(user.email, user.password);

    const payload = {
      id: data?.user?._id?.$oid,
      name: data?.user?.name,
      email: data?.user?.email,
    };

    // Insert the data into the store
    dispatch(updateUser(payload));
    dispatch(updatePost(data?.data));
    dispatch(updateValidation(true));
    localStorage.setItem("profile", JSON.stringify(data?.user?._id?.$oid));
  } catch (error) {
    dispatch(updateValidation(false));
    console.error(error);
    throw error;
  }
}

export async function logoutUser(dispatch: any): Promise<any> {
  try {
    // Retrieve the data from the API
    await API.signOut();

    const payload = {
      id: null,
      name: null,
      email: null,
    };
    // Insert the data into the store
    dispatch(updateUser(payload));
    localStorage.setItem("profile", JSON.stringify(null));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser(dispatch: any): Promise<any> {
  try {
    // Retrieve the data from the API
    const { data } = await API.getUser();

    const payload = {
      id: data?.user?._id?.$oid,
      name: data?.user?.name,
      email: data?.user?.email,
    };

    // Insert the data into the store
    dispatch(updateUser(payload));
    // localStorage.setItem("profile", JSON.stringify(null));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const { updateUser, updateValidation } = userSlice.actions;

export const selectUserId = (state: RootState) => state.user.id;
export const selectUserName = (state: RootState) => state.user.name;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectValidation = (state: RootState) => state.user.valid;

export default userSlice.reducer;
