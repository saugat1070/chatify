import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./userAuth";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") || "false"),

  toggleSound: () => {
    let toggleValue = get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", JSON.stringify(!toggleValue));
    set({ isSoundEnabled: !toggleValue });
  },

  setActiveTab: (activeTab) => set({ activeTab: activeTab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data.data });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMyChatPartner: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      console.log(Object.create(res.data?.userInformation));
      if (res.status == 200) {
        set({ chats: res.data?.userInformation });
      }
    } catch (error) {
      console.log(`Error at chat:${error?.response?.data?.message}`);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data) {
        set({ messages: [...messages, res.data] });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },
  subscribeToMessage: async () => {
    try {
      const { socket } = useAuthStore.getState();
      //it only allow to message between sender and receiver
      socket.on("newMessage", (newMessage) => {
        if (newMessage?.senderId != get().selectedUser?._id) return;
        if (get().isSoundEnabled) {;
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound
          .play()
          .catch((err) =>
            console.log(`Error at playing notification music:${err?.message}`)
          );
        }
        return set({ messages: [...get().messages, newMessage] });
      });
    } catch (error) {
      toast.error(error?.message);
    }
  },

  unsubscribeToMessage: async () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
  },
}));
