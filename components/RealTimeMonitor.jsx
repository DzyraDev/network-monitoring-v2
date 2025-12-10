// components/RealTimeMonitor.jsx
"use client";

import { memo } from "react";
import useIPMonitoring from "@/hooks/useIPMonitoring";
import IPCard from "./IPCard";
import CompactPoint from "./CompactPoint";

const RealTimeMonitor = memo(({ config, viewMode, activeTab, autoRefresh }) => {
  const { ipStatuses, loading, lastUpdate, updateAllStatuses } =
    useIPMonitoring(config, autoRefresh, 10000);

  // Render berdasarkan tab
  const renderContent = () => {
    const filteredIPs = getFilteredIPs(); // Fungsi filter Anda

    if (viewMode === "cards") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredIPs.map((item) => (
            <IPCard key={item.ip} ip={item.ip} data={ipStatuses[item.ip]} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredIPs.map((item) => (
            <CompactPoint
              key={item.ip}
              ip={item.ip}
              data={ipStatuses[item.ip]}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-cyan-400 animate-pulse">Updating...</div>
        </div>
      )}
      {renderContent()}
    </div>
  );
});

RealTimeMonitor.displayName = "RealTimeMonitor";
export default RealTimeMonitor;
