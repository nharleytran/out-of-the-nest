import { axiosInstance } from './index'

async function getSuggestion({gpa, testscore, extracurriculars, comment}) {
    try {
        console.log(gpa, testscore, extracurriculars, comment)
        const response = await axiosInstance.post(`/recipe`, {gpa, testscore, extracurriculars, comment});
        return response.data;
    } catch (err) {
        throw err;
    }
}

export {getSuggestion}