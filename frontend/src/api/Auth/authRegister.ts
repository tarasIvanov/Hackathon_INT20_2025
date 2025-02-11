import axios from "axios";
import api from "../api";
import { toast } from "react-toastify";

export async function authRegister(
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
) {
  try {
    const response = await api.post("/v1/register", {
      name,
      email,
      password,
      password_confirmation,
    });

    localStorage.setItem("access_token", response.data.token);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 409:
          toast.error("A user with this email already exists");
          break;
        case 422:
          toast.error("Validation error");
          break;
        case 500:
          toast.error("Internal server error");
          break;
        default:
          throw new Error(
            "There was some kind of mistake. Check your internet connection or try again later"
          );
      }
    } else {
      toast.error(
        "There was some kind of mistake. Check your internet connection or try again later"
      );
    }

    return undefined;
  }
}
