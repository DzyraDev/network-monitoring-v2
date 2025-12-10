import { useState, useEffect, useRef, useCallback } from "react";

const useWebSocketMonitor = () => {
  const [ipStatuses, setIpStatuses] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Fungsi untuk connect ke WebSocket
  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    console.log("Connecting to WebSocket...");
    setLoading(true);

    // Gunakan URL yang sesuai dengan environment
    const wsUrl =
      process.env.NODE_ENV === "production"
        ? `wss://${window.location.host}/ws`
        : "ws://localhost:3001";

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      setLoading(false);

      // Clear any reconnect timeout
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "INIT":
            console.log("Received initial config:", data.data);
            setLastUpdate(new Date(data.data.timestamp));
            break;

          case "IP_UPDATE":
            setIpStatuses((prev) => ({
              ...prev,
              [data.data.ip]: {
                status: data.data.status,
                responseTime: data.data.responseTime,
                uptime: data.data.uptime || 0,
                lastChecked: new Date(data.data.timestamp),
                accessible: data.data.status === "online",
                error: data.data.error || null,
                errorDetails: data.data.error || null,
                type: data.data.type,
                name: data.data.name,
                location: data.data.location,
              },
            }));
            setLastUpdate(new Date(data.data.timestamp));
            break;

          case "TEST_RESULT":
            // Handle single test result
            console.log("Test result:", data.data);
            break;

          default:
            console.log("Unknown message type:", data.type);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.onclose = (event) => {
      console.log(`WebSocket disconnected: ${event.code} ${event.reason}`);
      setIsConnected(false);

      // Attempt to reconnect after 5 seconds
      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log("Attempting to reconnect...");
          connectWebSocket();
        }, 5000);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  // Request manual update
  const requestUpdate = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "REQUEST_UPDATE",
          timestamp: Date.now(),
        }),
      );
      return true;
    }
    return false;
  }, []);

  // Test single IP
  const testSingleIP = useCallback((ip) => {
    return new Promise((resolve) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const messageId = Date.now();

        const handleMessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "TEST_RESULT") {
              resolve(data.data);
              wsRef.current.removeEventListener("message", handleMessage);
            }
          } catch (error) {
            console.error("Error parsing test result:", error);
            resolve(null);
          }
        };

        wsRef.current.addEventListener("message", handleMessage);
        wsRef.current.send(
          JSON.stringify({
            type: "TEST_IP",
            ip,
            messageId,
          }),
        );

        // Timeout setelah 10 detik
        setTimeout(() => {
          wsRef.current.removeEventListener("message", handleMessage);
          resolve(null);
        }, 10000);
      } else {
        resolve(null);
      }
    });
  }, []);

  // Setup WebSocket connection
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket]);

  return {
    ipStatuses,
    isConnected,
    lastUpdate,
    loading,
    requestUpdate,
    testSingleIP,
  };
};

export default useWebSocketMonitor;
