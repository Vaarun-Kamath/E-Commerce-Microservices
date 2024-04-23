import { isAxiosError } from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import Cookies from 'js-cookie';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get(
      `${BACKEND_URL}/api/store/getOrders`);
    const { data } = response;
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, errorCode, errorMessage } = error.response.data;
      return { status, errorCode, errorMessage };
    } else {
      console.error(error);
      return {
        status: 500,
        errorCode: 'PRODUCTS_GET_API_CALL_ERROR',
        errorMessage: 'Please try again later.',
      };
    }
  }
};
