import useDashboardStore from "../store/dashboardStore";

function Notifications() {
  const notifications = useDashboardStore((state) => state.notifications);
  const removeNotification = useDashboardStore((state) => state.removeNotification);
  const clearNotifications = useDashboardStore((state) => state.clearNotifications);

  // ✅ Debug line (temporary)
  console.log("Notification count:", notifications.length);

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "20px",
      width: "400px"
    }}>
      <h2>Notifications</h2>

      <button
        onClick={clearNotifications}
        style={{
          marginBottom: "15px",
          padding: "5px 10px",
          cursor: "pointer"
        }}
      >
        Clear All
      </button>

      {notifications.length === 0 && <p>No notifications</p>}

      {notifications.map((n) => (
        <div key={n.id} className="notification">
          <strong>{n.title}</strong>
          <p>{n.message}</p>
          <button
            onClick={() => removeNotification(n.id)}
            style={{
              padding: "3px 8px",
              cursor: "pointer"
            }}
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
