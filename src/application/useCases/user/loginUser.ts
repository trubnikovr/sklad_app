 import { useExceptionStore } from "../../../stores/useExceptionStore.ts";
import { Response } from "../../../interfaces/response.ts";
 import { postLogin } from "../../services/ApiService.ts";
 import { BaseError } from "../../../exceptions/BaseError.ts";

export const loginUser = async (login: string, password: string): Response<{ token: string }> => {
  try {
    // Clear any existing error before starting the login process
    useExceptionStore.getState().hideError();

    const response = await postLogin(login, password);

    if(!response.success) {
      throw new BaseError(response.message);
    }
    return response;
  } catch (error) {
    // Use showError to set the error message in the store
    useExceptionStore.getState().showError('Login failed: ' + (error as Error).message);

    return { success: false, message: error.message  };
  }
};
