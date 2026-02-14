import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ 
  host: "0.0.0.0",
  port: 5001
});



console.log("WebSocket server running on ws://localhost:5001");


function randomMetric() {
  return Math.floor(Math.random() * 100);
}

function randomNotification() {
  return {
    type: "notification",
    id: Date.now().toString(),
    title: "System Alert",
    message: "Random notification triggered!"
  };
}

wss.on("connection", (ws) => {
  console.log("Client connected");

  const metricInterval = setInterval(() => {
    ws.send(JSON.stringify({
      type: "metric",
      value: randomMetric()
    }));
  }, 3000);

  const notificationInterval = setInterval(() => {
    ws.send(JSON.stringify(randomNotification()));
  }, 12000);

  ws.on("close", () => {
    clearInterval(metricInterval);
    clearInterval(notificationInterval);
    console.log("Client disconnected");
  });
});
