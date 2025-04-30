import axios from "axios";
import { create } from "zustand";
import { getToken } from "@/utils/getToken";

interface User {
  id: number;
  email: string;
  password: string;
  user_name: string;
  avatar: object;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserStore {
  user: User | null;
  getUser: () => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  getUser: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-user",
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
}));

export default useUserStore;
