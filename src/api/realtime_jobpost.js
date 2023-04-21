import { axiosInstance } from './index'

export async function getJobs({ location, search, sort_by }) {
  try {
    const response = await axiosInstance.get('/jobs', {
      params: {
        location,
        search,
        sort_by
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}
