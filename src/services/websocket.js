class WebSocketClient {
  constructor(url, onStatusChange) {
    this.url = url;
    this.socket = null;
    this.listeners = [];
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.onStatusChange = onStatusChange;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.onStatusChange?.("connecting");

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
      this.onStatusChange?.("connected");
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.listeners.forEach((callback) => callback(data));
      } catch (error) {
        console.error("Invalid JSON received:", error);
      }
    };

    this.socket.onerror = () => {
      this.onStatusChange?.("error");
    };

    this.socket.onclose = () => {
      this.onStatusChange?.("disconnected");
      this.reconnect();
    };
  }

  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.onStatusChange?.("failed");
      return;
    }

    const delay = Math.pow(2, this.reconnectAttempts) * 1000;
    this.reconnectAttempts++;

    setTimeout(() => {
      this.connect();
    }, delay);
  }

  onMessage(callback) {
    this.listeners.push(callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketClient;
