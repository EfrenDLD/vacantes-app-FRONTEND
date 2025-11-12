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

const update = async (id, vacante) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, vacante);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

/**
 * Obtener todas las vacantes
 */
const getAll = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response;
  } catch (error) {
    throw error.response?.data || 'Error al obtener vacantes';
  }
};

/**
 * Obtener vacante por ID
 */
const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || 'Error al obtener la vacante';
  }
};

/**
 * Buscar vacantes por palabra clave
 */
const buscar = async (keyword) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/buscar`, {
      params: { keyword }
    });
    return response;
  } catch (error) {
    throw error.response?.data || 'Error al buscar vacantes';
  }
};

/**
 * Obtener vacantes activas
 */
const getActivas = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/activas`);
    return response;
  } catch (error) {
    throw error.response?.data || 'Error al obtener vacantes activas';
  }
};

/**
 * Eliminar vacante por ID
 */
const deleteById = async (id) => {
  try {
    const response = await axiosInstance.delete(API_URL, {
      params: { id }
    });
    return response;
  } catch (error) {
    throw error.response?.data || 'Error al eliminar la vacante';
  }
};

export default {
  create,
  update,
  getAll,
  getById,
  buscar,
  getActivas,
  deleteById
}