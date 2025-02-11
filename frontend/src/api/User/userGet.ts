import axios from "axios";
import api from "../api";
import { toast } from "react-toastify";
import { User } from "@/Types/User";

export async function userGet(token: string): Promise<User | undefined> {
  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      avatar: response.data.avatar,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 401:
          toast.error("No access to the resource.");
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
