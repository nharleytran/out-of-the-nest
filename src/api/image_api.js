import { axiosInstance } from './index'
async function uploadImage(fd) {
    axiosInstance.post(`/image/upload`, fd);
}
export { uploadImage }