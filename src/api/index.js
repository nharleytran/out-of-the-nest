import axios from "axios";

const baseURL = process.env.REACT_APP_API;
if (!baseURL) {
  throw new Error("REACT_APP_API is not defined");
}
export const axiosInstance = axios.create({
  baseURL: baseURL, // replace with your server's URL
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
};

export async function getAllCategories() {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data.data;
  } catch (err) {
    // window.location = "/login";
    throw err;
  }
}

export async function getAllCategoriesAuth() {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data.data;
  } catch (err) {
    console.log("error", err);
    // window.location = "/login";
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

export async function getPostsByCategory(categoryId) {
  try {
    const response = await axiosInstance.get(`/posts/category/${categoryId}`);
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

export async function createUser(postData) {
  try {
    const response = await axiosInstance.post("/user/create", postData);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function login(postData) {
  try {
    const response = await axiosInstance.post("/login", postData);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getAuth() {
  try {
    const response = await axiosInstance.get("/isAuthorized");
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function testAuthorize(postData) {
  try {
    console.log("axios", axiosInstance.defaults.headers["Authorization"]);
    const response = await axiosInstance.post("/testAuthorize", postData);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getPostsByFilters(
  categoryId,
  startDate,
  endDate,
  minGPA,
  maxGPA,
  testname,
  outcome
) {
  try {
    const response = await axiosInstance.get(
      `/filters/category/${categoryId}`,
      { startDate, endDate, minGPA, maxGPA, testname, outcome }
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
}
