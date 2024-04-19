import { isAxiosError } from 'axios';
import axiosInstance from '@/utils/axiosInstance';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addProductToCart = async (productId: string, quantity: number) => {
  try {
    const res = await axiosInstance.post(
      `${BACKEND_URL}/api/products/addToCart`,
      {
        productId,
        quantity,
      }
    );
    const { data } = res;
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

export const removeProductFromCart = async (productId: string) => {
  try {
    const res = await axiosInstance.delete(
      `${BACKEND_URL}/api/products/removeFromCart`,
      {
        params: {
          productId,
        },
      }
    );
    const { data } = res;
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

export const getCartItems = async () => {
  try {
    const res = await axiosInstance.get(
      `${BACKEND_URL}/api/products/getCartItems`
    );
    const { data } = res;
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, errorCode, errorMessage } = error.response.data;
      return { status, errorCode, errorMessage };
    } else {
      console.error(error);
      return {
        status: 500,
        errorCode: 'PRODUCTS_GET_CART_ITEMS_API_CALL_ERROR',
        errorMessage: 'Please try again later.',
      };
    }
  }
};

export const sendNewQuantity = async (itemId: string, quantity: number) => {
  try {
    const res = await axiosInstance.patch(
      `${BACKEND_URL}/api/products/setItemQuantity`,
      {
        productId: itemId,
        quantity,
      }
    );
    const { data } = res;
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, errorCode, errorMessage } = error.response.data;
      return { status, errorCode, errorMessage };
    } else {
      console.error(error);
      return {
        status: 500,
        errorCode: 'PRODUCT_SET_QUANTITY_API_CALL_ERROR',
        errorMessage: 'Please try again later.',
      };
    }
  }
};
