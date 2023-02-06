import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import * as API from "../../../api/index";

export interface UserState {
  name: null;
  email: null;
}

const initialState: UserState = {
  name: null,
  email: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
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
    console.log(data?.message);

    const payload = { name: data?.message?.name, email: data?.message?.email };
    console.log(payload);

    // Insert the data into the store
    dispatch(updateUser(payload));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginUser(dispatch: any, user: user): Promise<any> {
  try {
    // Retrieve the data from the API
    const { data } = await API.signIn(user.name, user.email, user.password);
    console.log(data?.message);

    const payload = { name: data?.message?.name, email: data?.message?.email };
    console.log(payload);

    // Insert the data into the store
    dispatch(updateUser(payload));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logoutUser(dispatch: any): Promise<any> {
  try {
    // Retrieve the data from the API
    const data = await API.signOut();
    console.log(data);

    const payload = { name: null, email: null };
    // Insert the data into the store
    dispatch(updateUser(data?.data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const { updateUser } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.name;
export const selectUserEmail = (state: RootState) => state.user.email;

export default userSlice.reducer;
