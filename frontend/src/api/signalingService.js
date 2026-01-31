class SignalingService {
  constructor() {
    this.ws = null;
    this.roomToken = null;
    this.onMessage = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 2000;
  }

  connect(wsUrl, roomToken, onMessage) {
    // Validate inputs
    if (!wsUrl) {
      console.error('SignalingService.connect: wsUrl is required');
      throw new Error('WebSocket URL is required');
    }
    
    if (!roomToken) {
      console.error('SignalingService.connect: roomToken is required');
      throw new Error('Room token is required');
    }
    
    if (!onMessage) {
      console.error('SignalingService.connect: onMessage callback is required');
      throw new Error('Message handler is required');
    }
    
    this.roomToken = roomToken;
    this.onMessage = onMessage;
    this.reconnectAttempts = 0;
    
    console.log('SignalingService: Attempting to connect to', wsUrl);
    
    try {
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected successfully');
        this.reconnectAttempts = 0;
        this.send({ type: 'JOIN', roomToken });
      };
      
      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (this.onMessage) {
            this.onMessage(message);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err, 'Raw data:', event.data);
        }
      };
      
      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected - Code:', event.code, 'Reason:', event.reason, 'Clean:', event.wasClean);
        this.handleDisconnection(wsUrl);
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error event:', error);
        if (this.ws) {
          console.error('WebSocket state:', this.ws.readyState, '(0=CONNECTING, 1=OPEN, 2=CLOSING, 3=CLOSED)');
          console.error('WebSocket URL:', this.ws.url);
          console.error('WebSocket bufferedAmount:', this.ws.bufferedAmount);
        }
        // Additional diagnostics for common issues
        console.error('Potential causes: Backend not running, certificate issues, or network connectivity problems');
      };
    } catch (err) {
      console.error('Error creating WebSocket:', err);
      throw err;
    }
  }

  handleDisconnection(wsUrl) {
    // Only attempt reconnection if we haven't exceeded max attempts
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;
      console.log(`WebSocket disconnected. Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);
      
      setTimeout(() => {
        if (this.ws && this.ws.readyState === WebSocket.CLOSED) {
          console.log('Attempting to reconnect...');
          this.connect(wsUrl, this.roomToken, this.onMessage);
        }
      }, delay);
    } else {
      console.error('Max reconnection attempts reached. WebSocket connection failed permanently.');
    }
  }

  send(message) {
    if (!this.ws) {
      console.warn('SignalingService.send: WebSocket not initialized');
      return;
    }
    
    if (this.ws.readyState !== WebSocket.OPEN) {
      console.warn('SignalingService.send: WebSocket not in OPEN state. Current state:', this.ws.readyState, '(0=CONNECTING, 1=OPEN, 2=CLOSING, 3=CLOSED)');
      return;
    }
    
    try {
      this.ws.send(JSON.stringify({
        ...message,
        roomToken: this.roomToken
      }));
    } catch (err) {
      console.error('Error sending WebSocket message:', err);
    }
  }

  disconnect() {
    if (this.ws) {
      try {
        this.send({ type: 'LEAVE' });
      } catch (err) {
        console.error('Error sending LEAVE message:', err);
      }
      this.ws.close();
      this.ws = null;
    }
  }
}

export default new SignalingService();