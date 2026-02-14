import { describe, it, expect } from "vitest";
import useDashboardStore from "./dashboardStore";

describe("Dashboard Store", () => {
  it("should update metric", () => {
    useDashboardStore.getState().setMetric(42);
    expect(useDashboardStore.getState().metric).toBe(42);
  });

  it("should limit notifications to 20", () => {
    const store = useDashboardStore.getState();

    for (let i = 0; i < 25; i++) {
      store.addNotification({
        id: i.toString(),
        title: "Test",
        message: "Message",
      });
    }

    expect(useDashboardStore.getState().notifications.length).toBe(20);
  });
});
