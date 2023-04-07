import { axiosInstance } from './index'
async function updateUserProfile(userId, updatedFields) {
    try {
        const response = await axiosInstance.put(`/user/update/${userId}`, updatedFields);
        return response.data.data;
    } catch (err) {
        throw err;
    }
}
async function getUser(userId) {
    try {
        const response = await axiosInstance.get(`/user/profile/${userId}`);
        return response.data.data;
    } catch (err) {
        throw err;
    }
}

export { updateUserProfile, getUser }