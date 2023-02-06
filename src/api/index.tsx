import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// For posts
export const fetchPosts = () => API.get(`/posts`);
export const createPosts = (data: object) => API.post("/posts", data);
export const updatePosts = (id: string, data: object) =>
  API.put(`/posts/${id}`, data);
export const deletePosts = (id: string) => API.delete(`/posts/${id}`);

// For comments
export const fetchComments = () => API.get(`/comments`);
export const createComments = (
  name: string,
  message: string,
  post_id: string
) => API.post("/comments", { name: name, message: message, post_id: post_id });

// For users
export const signUp = (name: string, email: string, password: string) =>
  API.post("/signup", { name: name, email: email, password: password });
export const signIn = (name: string, email: string, password: string) =>
  API.post("/login", { name: name, email: email, password: password });
export const signOut = () =>
  API.delete("/logout");