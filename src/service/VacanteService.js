import axiosInstance from '../api/axiosConfig';

const API_URL = '/vacantes';

const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

const create = async (params) => {
  try {
    const response = await axiosInstance.post(API_URL, params);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const cambiarEstado = async (id, activo) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}/estado`, { activo });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default {
    create,
    getAll,
    cambiarEstado
}