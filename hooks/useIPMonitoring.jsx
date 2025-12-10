import { useState, useEffect, useCallback, useRef } from "react";

const useIPMonitoring = (initialIPs, autoRefresh = true, interval = 10000) => {
  const [ipStatuses, setIpStatuses] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const autoRefreshRef = useRef(autoRefresh);

  // Update ref saat autoRefresh berubah
  useEffect(() => {
    autoRefreshRef.current = autoRefresh;
  }, [autoRefresh]);

  // Fungsi check IP status
  const checkIPStatus = useCallback(async (ip) => {
    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`/api/ping?ip=${encodeURIComponent(ip)}`, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const responseTime = Date.now() - startTime;
      const data = await response.json();

      return {
        status: data.status || "online",
        responseTime,
        uptime: data.uptime || 100,
        lastChecked: new Date(),
        accessible: true,
        error: null,
        errorDetails: null,
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;

      let errorType = "Connection Error";
      let errorDetails = error.message;

      if (error.name === "AbortError") {
        errorType = "Connection Timeout";
        errorDetails = "Server took too long to respond";
      } else if (error.message.includes("Failed to fetch")) {
        errorType = "Network Error";
        errorDetails = "Failed to establish connection";
      }

      return {
        status: "offline",
        responseTime,
        uptime: 0,
        lastChecked: new Date(),
        accessible: false,
        error: errorType,
        errorDetails: errorDetails,
      };
    }
  }, []);

  // Update semua IP status
  const updateAllStatuses = useCallback(async () => {
    console.log("Updating IP statuses...");
    setLoading(true);

    try {
      const newStatuses = {};
      const allIPs = [...initialIPs.public, ...initialIPs.vpn];

      // Gunakan Promise.all untuk concurrent checking
      const promises = allIPs.map(async (item) => {
        try {
          const status = await checkIPStatus(item.ip);
          newStatuses[item.ip] = {
            ...status,
            type: item.type,
            name: item.name,
            location: item.location,
          };
        } catch (error) {
          newStatuses[item.ip] = {
            status: "offline",
            responseTime: 5000,
            uptime: 0,
            lastChecked: new Date(),
            accessible: false,
            error: error.message,
            type: item.type,
            name: item.name,
            location: item.location,
          };
        }
      });

      await Promise.all(promises);
      setIpStatuses(newStatuses);
    } catch (error) {
      console.error("Error updating IP statuses:", error);
    } finally {
      setLastUpdate(new Date());
      setLoading(false);
    }
  }, [initialIPs, checkIPStatus]);

  // Auto refresh dengan useEffect terpisah
  useEffect(() => {
    let intervalId;

    const startAutoRefresh = () => {
      if (autoRefreshRef.current) {
        intervalId = setInterval(() => {
          updateAllStatuses();
        }, interval);
      }
    };

    // Initial load
    updateAllStatuses();
    startAutoRefresh();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [updateAllStatuses, interval]);

  return {
    ipStatuses,
    loading,
    lastUpdate,
    updateAllStatuses,
  };
};

export default useIPMonitoring;
