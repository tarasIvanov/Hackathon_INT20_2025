import axios from "axios";
import api from "../api";
import { toast } from "react-toastify";

export async function userUpdateAvatar(avatar: string): Promise<boolean> {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return false;
  } 

  try {
    await api.patch(
      "/user/avatar",
      {
        avatar,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 401:
          toast.error("No access to the resource.");
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

    return false;
  }
}
