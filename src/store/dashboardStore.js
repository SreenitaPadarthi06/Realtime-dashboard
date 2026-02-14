import { create } from "zustand";

const useDashboardStore = create((set) => ({
  metric: 0,
  notifications: [],
  connectionStatus: "connecting",


  setMetric: (value) => set({ metric: value }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  addNotification: (notification) =>
  set((state) => {
    const updated = [notification, ...state.notifications];
    return {
      notifications: updated.slice(0, 20), // keep only latest 20
    };
  }),


  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));

export default useDashboardStore;
