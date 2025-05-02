import axios from 'axios';

const API_URL = 'http://localhost:8082/api/productos';

export const getProductos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
