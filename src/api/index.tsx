import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const fetchPosts = () => API.get(`/posts`);
export const createPosts = (data: object) => API.post("/posts", data);
export const updatePosts = (id: string, data: object) => API.put(`/posts/${id}`, data);
export const deletePosts = (id: string) => API.delete(`/posts/${id}`);
