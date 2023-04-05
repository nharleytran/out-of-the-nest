import { axiosInstance } from './index'
async function uploadImage(fd) {
    return axiosInstance.post(`/image/upload`, fd);
}
export { uploadImage }