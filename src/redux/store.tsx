import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter/counterSlice";
import postReducer from "./slices/posts/postSlice";
import commentReducer from "./slices/comments/commentSlice";
import userReducer from "./slices/users/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    comment: commentReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
