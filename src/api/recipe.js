import { axiosInstance } from './index'

async function getSuggestion(inputString) {
    try {
        const response = await axiosInstance.post(`/recipe`, {query:inputString});
        return response.data;
    } catch (err) {
        throw err;
    }
}

export {getSuggestion}