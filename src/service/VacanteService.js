import axiosInstance from '../api/axiosConfig';

const API_URL = '/vacantes';

const create = async (params) => {
  try {
    const response = await axiosInstance.post(API_URL, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  create
}