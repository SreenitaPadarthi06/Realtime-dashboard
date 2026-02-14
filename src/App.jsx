import { useEffect } from "react";
import WebSocketClient from "./services/websocket";
import useDashboardStore from "./store/dashboardStore";
import Notifications from "./components/Notifications";
import MetricChart from "./components/MetricChart";
import "./dashboard.css";

function App() {
  const setMetric = useDashboardStore((state) => state.setMetric);
  const addNotification = useDashboardStore((state) => state.addNotification);
  const metric = useDashboardStore((state) => state.metric);
   const setConnectionStatus = useDashboardStore(
  (state) => state.setConnectionStatus
);
const connectionStatus = useDashboardStore(
  (state) => state.connectionStatus
);

  useEffect(() => {
    const ws = new WebSocketClient(
  "ws://127.0.0.1:5001",
  setConnectionStatus
);

 ws.connect();

    ws.onMessage((data) => {
  if (!data || typeof data !== "object") return;

  switch (data.type) {
    case "metric":
      if (typeof data.value === "number") {
        setMetric(data.value);
      }
      break;

    case "notification":
      if (data.id && data.title && data.message) {
        addNotification(data);
      }
      break;

    default:
      console.warn("Unknown message type:", data);
  }
});


    return () => ws.disconnect();
  }, []);

 return (
  <div className="dashboard">
    <h1>Real-Time Dashboard</h1>

    <div className={`status ${connectionStatus}`}>
      Status: {connectionStatus}
    </div>

    <div className="card">
      <h2>Live Metric</h2>
      <div className="metric-value">{metric}</div>
    </div>
   <div className="card">
  <h2>Live Chart</h2>
  <MetricChart />
</div>

    <div className="card">
      <Notifications />
    </div>
  </div>

);
}
export default App;
