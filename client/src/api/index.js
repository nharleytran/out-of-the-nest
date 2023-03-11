import axios from "axios";

export const axiosInstance = axios.create({
  //baseURL: "https://outofthenest.fly.dev/", // replace with your server's URL
    baseURL: "http://localhost:8080/", // replace with your server's URL
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});
const getInstance = () => {
    const axiosInstance = axios.create({
      //baseURL: "https://outofthenest.fly.dev/", // replace with your server's URL
        baseURL: "http://localhost:8080/", // replace with your server's URL
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    return axiosInstance;
}
 
export const setAuthToken = token => {
   if (token) {
       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   }
   else
       delete axios.defaults.headers.common["Authorization"];
}

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

export async function testAuthorize(postData) {
  try {
      console.log('axios', axiosInstance.defaults.headers['Authorization']);
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
