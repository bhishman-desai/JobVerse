/* Author: Bhishman Desai */
import { create } from "zustand";
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

let socket;

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    active: false,
  },
  setUsername: (name) =>
    set((state) => ({ auth: { ...state.auth, username: name } })),
}));
export const useNotificationStore = create((set) => ({
  notifications: [],
  newNotification: false,
  initializeSocket: async (token) => {
    socket = await io(process.env.REACT_APP_SERVER_DOMAIN, {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      console.log(socket)
    });

    socket.on('notification', (notification) => {
      console.log(notification)
      set((state) => ({
        notifications: [notification, ...state.notifications],
        newNotification: true,
      }));
    });
  },
  fetchNotifications: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/api/notifications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      set({ notifications: response.data });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  },
  markNotificationsAsRead: async () => {
    await axios.put(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/notifications/mark-read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in headers
        },
      }
    );
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      newNotification: false,
    }));
  },
  deleteNotification: async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/api/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    set((state) => ({
      notifications: state.notifications.filter((n) => n._id !== id),
    }));
  },
  clearNewNotification: () => set({ newNotification: false }),
}));