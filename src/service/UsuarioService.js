import axiosInstance from '../api/axiosConfig';

const API_URL = '/usuarios';

const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al obtener usuarios';
  }
};

const create = async (params) => {
  try {
    const response = await axiosInstance.post(API_URL, params);
    return response;
  } catch (error) {
    throw error.response?.data || 'Error al crear usuario';
  }
};

const update = async (id, usuario) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, usuario);
    return response.data;
  } catch (error) {
    throw error.response?.data || 'Error al actualizar usuario';
  }
};

const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || 'Error al obtener el usuario';
  }
};

const deleteById = async (id) => {
  try {
    const response = await axiosInstance.delete(API_URL, {
      params: { id }
    });
    return response;
  } catch (error) {
    throw error.response?.data || 'Error al eliminar el usuario';
  }
};

export default {
  create,
  update,
  getAll,
  getById,
  deleteById
};
