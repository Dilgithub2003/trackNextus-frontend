class WebSocketService {
  constructor(url) {
    this.url = url;
    this.socket = null;
  }

  connect(onMessage) {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
        //console.log(data);
      } catch (e) {
        console.error("Invalid WS message:", e);
      }
    };

    this.socket.onerror = (err) => {
      console.error("WebSocket Error:", err);
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
      setTimeout(() => this.connect(onMessage), 5000); // auto reconnect
    };
  }
}

export default WebSocketService;
