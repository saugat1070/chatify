import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: {
        name: "Saugat Giri",
        _id: 123,
    }

}));