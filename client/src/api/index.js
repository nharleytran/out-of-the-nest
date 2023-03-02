import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:6660", // replace with your server's URL
});

export async function getAllCategories() {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function createPost(postData) {
  try {
    const response = await axiosInstance.post("/posts", postData);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function deletePost(postId) {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function getPost(postId) {
  try {
    const response = await axiosInstance.get(`/posts/${postId}`);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function updatePost(postId, updatedFields) {
  try {
    const response = await axiosInstance.put(`/posts/${postId}`, updatedFields);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}
