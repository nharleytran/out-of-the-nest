import { axiosInstance } from './index'

async function getSuggestion({gpa, testscore, extracurriculars, experience, comment}) {
    try {
        const response = await axiosInstance.post(`/recipe`, {gpa, testscore, extracurriculars, experience, comment});
        return response.data;
    } catch (err) {
        throw err;
    }
}

export {getSuggestion}