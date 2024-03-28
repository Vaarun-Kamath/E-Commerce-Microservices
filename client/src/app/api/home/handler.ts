import { isAxiosError } from "axios";
import axiosInstance from "@/utils/axiosInstance";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(
      `https://api.escuelajs.co/api/v1/products/`
    );
    const { data } = response;
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const { status, errorCode, errorMessage } = error.response.data;
      return { status, errorCode, errorMessage };
    } else {
      console.error(error);
      return {
        status: 500,
        errorCode: "PRODUCTS_GET_API_CALL_ERROR",
        errorMessage: "Please try again later.",
      };
    }
  }
};
