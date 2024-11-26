import api from "../libs/AxiosClient.ts";
import axios, { AxiosResponse } from "axios";
import { IProduct } from "../../interfaces/Product.ts";
import { IResponse } from "../../interfaces/response.ts";

const fetchProductsFromServer = async () => {
  try {
    const response: AxiosResponse<IResponse<IProduct[]>> = await api.get('/showcases/products/sync'); // замените URL на нужный
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);

    return { success: false, message: error?.toString() };
  }
};

const postLogin = async (login: string, password: string) => {
  try {
    const response = await api.post('/mobile-login', {
      login, password
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && 0) {
      console.error('Axios error message:', error.message);

      // Full response data
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }

      // Request details if no response was received
      if (error.request) {
        console.error('Request:', error.request);
      }

      // Config details
      console.error('Config:', error.config);
    }
    throw error;
  }
};


export {
  fetchProductsFromServer,
  postLogin
}
