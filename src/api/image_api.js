import { axiosInstance } from './index'
async function uploadImage(fd) {
    return axiosInstance.post(`/image/upload`, fd);
}
function getImagePathById(id) {
    return `${process.env.REACT_APP_API}/image/${id}`;
}
export { uploadImage, getImagePathById }