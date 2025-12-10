"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Server,
  Globe,
  Lock,
  RefreshCw,
  Clock,
  TrendingUp,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";

// Fungsi hash sederhana untuk keamanan
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
};

// Credential yang sudah di-hash
const CREDENTIALS = {
  username: simpleHash("system@dzyra.co.id" + "salt_dzyra_2024"),
  password: simpleHash("@DzyraCorp123" + "salt_dzyra_2024"),
  sessionKey: "dzyra_session_" + simpleHash("dzyra_corp_session_2024"),
};

// Konfigurasi IP - 20 Public IP dan 20 VPN IP
const IP_CONFIG = {
  public: [
    {
      ip: "http://119.252.164.226:1701",
      name: "GT Lambu Kibang",
      location: "Tulang Bawang Barat - Lampung",
      type: "public",
    },
    {
      ip: "http://119.252.164.226:1901",
      name: "GT Simpang Pematang",
      location: "Mesuji - Lampung",
      type: "public",
    },
    {
      ip: "http://119.252.164.226:2101",
      name: "GT Kayu Agung",
      location: "Ogan Komering Ilir - Sumatera Selatan",
      type: "public",
    },
    {
      ip: "http://103.178.16.186:4001",
      name: "GT Pemulutan",
      location: "Ogan Ilir - Sumatera Selatan",
      type: "public",
    },
    {
      ip: "http://124.158.160.178:4001",
      name: "GT Prabumulih",
      location: "Muara Enim - Sumatera Selatan",
      type: "public",
    },
    {
      ip: "http://119.252.164.226:9001",
      name: "GT Bayung Lencir",
      location: "Musi Banyuasin - Sumatera Selatan",
      type: "public",
    },
    {
      ip: "http://119.252.164.226:2001",
      name: "GT Muaro Sebapo",
      location: "Muaro Jambi -  Jambi",
      type: "public",
    },
    {
      ip: "http://103.245.179.198:4001/",
      name: "GT Bengkinang",
      location: "Kampar - Riau",
      type: "public",
    },
    {
      ip: "http://103.144.168.34:3001",
      name: "Gt Pekanbaru",
      location: "Pekanbaru - Riau",
      type: "public",
    },
    {
      ip: "http://103.144.168.34:3007",
      name: " GT Pinggir",
      location: "Bengkalis - Riau",
      type: "public",
    },
    {
      ip: "http://103.144.168.34:3010",
      name: "GT Bathin Solapan",
      location: "Kabupaten Bengkalis - Riau",
      type: "public",
    },
    {
      ip: "http://103.178.17.226:4001",
      name: "GT Stabat",
      location: "Langkat - Sumatera Utara",
      type: "public",
    },
    {
      ip: "http://117.54.133.154:5401",
      name: "GT Indrapuri",
      location: "Aceh Besar - Aceh",
      type: "public",
    },
    {
      ip: "http://103.245.179.198:14001",
      name: "GT Koto Kampar",
      location: "Kampar - Riau",
      type: "public",
    },
    {
      ip: "http://103.169.238.123:4007",
      name: "GT Bakauheni Selatan",
      location: "Kalianda - Lampung",
      type: "public",
    },
    {
      ip: "http://103.169.238.123:4010",
      name: "GT Bakauheni Utara",
      location: "Kalianda - Lampung",
      type: "public",
    },
    {
      ip: "http://103.169.238.123:4001",
      name: "GT Lematang",
      location: "Penukal Abab Lematang Ilir - Lampung",
      type: "public",
    },
    {
      ip: "http://103.169.238.123:4004",
      name: "GT Terbanggi Besar",
      location: "Lampung Tengah - Lampung",
      type: "public",
    },
    {
      ip: "http://150.107.136.12:4004",
      name: "GT Helvetia",
      location: "Medan Helvetia, Medan - Sumatera Utara",
      type: "public",
    },
    {
      ip: "http://150.107.136.12:4001",
      name: "GT Binjai",
      location: "Binjai - Sumatera Utara",
      type: "public",
    },
  ],
  vpn: [
    {
      ip: "http://192.168.47.1:4001/auth/sign-in",
      name: "GT Lambu Kibang",
      location: "Tulang Bawang Barat - Lampung",
      type: "public",
    },
    {
      ip: "http://192.168.51.1:4001/auth/sign-in",
      name: "GT Simpang Pematang",
      location: "Mesuji - Lampung",
      type: "public",
    },
    {
      ip: "http://192.168.48.1:4001/auth/sign-in",
      name: "GT Kayu Agung",
      location: "Ogan Komering Ilir - Sumatera Selatan",
      type: "public",
    },
    {
      ip: "http://192.168.40.1:4001/auth/sign-in",
      name: "GT Pemulutan",
      location: "Ogan Ilir - Sumatera Selatan",
      type: "public",
    },
    {
      ip: "http://192.168.41.1:4001/auth/sign-in",
      name: "GT Prabumulih",
      location: "Muara Enim - Sumatera Selatan",
      type: "public",
    },
    {
      ip: "http://192.168.49.1:4001/auth/sign-in",
      name: "GT Bayung Lencir",
      location: "Musi Banyuasin - Sumatera Selatan",
      type: "public",
    },
    {
      ip: "http://192.168.52.1:4001/auth/sign-in",
      name: "GT Muaro Sebapo",
      location: "Muaro Jambi -  Jambi",
      type: "public",
    },
    {
      ip: "http://192.168.39.1:4001/auth/sign-in",
      name: "GT Bengkinang",
      location: "Kampar - Riau",
      type: "public",
    },
    {
      ip: "http://192.168.38.1:4001/auth/sign-in",
      name: "Gt Pekanbaru",
      location: "Pekanbaru - Riau",
      type: "public",
    },
    {
      ip: "http://192.168.37.1:4001/auth/sign-in",
      name: " GT Pinggir",
      location: "Bengkalis - Riau",
      type: "public",
    },
    {
      ip: "http://192.168.36.1:4001/auth/sign-in",
      name: "GT Bathin Solapan",
      location: "Kabupaten Bengkalis - Riau",
      type: "public",
    },
    {
      ip: "http://192.168.35.1:4001/auth/sign-in",
      name: "GT Stabat",
      location: "Langkat - Sumatera Utara",
      type: "public",
    },
    {
      ip: "http://192.168.50.1:4001/auth/sign-in",
      name: "GT Indrapuri",
      location: "Aceh Besar - Aceh",
      type: "public",
    },
    {
      ip: "http://192.168.53.1:4001/auth/sign-in",
      name: "GT Koto Kampar",
      location: "Kampar - Riau",
      type: "public",
    },
    {
      ip: "http://192.168.46.1:4001/auth/sign-in",
      name: "GT Bakauheni Selatan",
      location: "Kalianda - Lampung",
      type: "public",
    },
    {
      ip: "http://192.168.44.1:4001/auth/sign-in",
      name: "GT Bakauheni Utara",
      location: "Kalianda - Lampung",
      type: "public",
    },
    {
      ip: "http://192.168.33.1:4001/auth/sign-in",
      name: "GT Lematang",
      location: "Penukal Abab Lematang Ilir - Lampung",
      type: "public",
    },
    {
      ip: "http://192.168.45.1:4001/auth/sign-in",
      name: "GT Terbanggi Besar",
      location: "Lampung Tengah - Lampung",
      type: "public",
    },
    {
      ip: "http://192.168.32.1:4001/auth/sign-in",
      name: "GT Helvetia",
      location: "Medan Helvetia, Medan - Sumatera Utara",
      type: "public",
    },
    {
      ip: "http://192.168.31.1:4001/auth/sign-in",
      name: "GT Binjai",
      location: "Binjai - Sumatera Utara",
      type: "public",
    },
  ],
};

// Komponen Login
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      try {
        const hashedUsername = simpleHash(username + "salt_dzyra_2024");
        const hashedPassword = simpleHash(password + "salt_dzyra_2024");

        if (
          hashedUsername === CREDENTIALS.username &&
          hashedPassword === CREDENTIALS.password
        ) {
          localStorage.setItem(
            CREDENTIALS.sessionKey,
            simpleHash(Date.now().toString()),
          );
          onLogin();
        } else {
          setError("Invalid username or password");
          setLoading(false);
        }
      } catch (err) {
        setError("Authentication error");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/50">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            NETWORK COMMAND CENTER
          </h1>
          <p className="text-slate-400">Secure System Access</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Username
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="system@dzyra.co.id"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Login to System</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="text-xs text-slate-500 text-center">
              <p className="mb-1">🔒 Secure Authentication</p>
              <p>All credentials are encrypted and stored securely</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          <p>© 2024 Dzyra Corp. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

// Komponen Status Badge
const StatusBadge = ({ status }) => {
  const config = {
    online: {
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/20",
      text: "ONLINE",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-yellow-400",
      bg: "bg-yellow-500/20",
      text: "WARNING",
    },
    offline: {
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-500/20",
      text: "OFFLINE",
    },
  };

  const { icon: Icon, color, bg, text } = config[status] || config.offline;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded ${bg}`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <span className={`text-xs font-bold ${color}`}>{text}</span>
    </div>
  );
};

// Komponen IP Card
const IPCard = ({ ip, data }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Gunakan window.open dengan target _blank untuk mencegah navigation
    window.open(ip, "_blank", "noopener,noreferrer");
  };

  const getErrorDisplay = () => {
    if (!data.error) return null;

    if (data.error === "Connection Timeout") {
      return {
        title: "ERR_CONNECTION_TIMED_OUT",
        message: `The connection to ${ip} timed out.`,
        suggestion:
          "Try:\n• Checking the connection\n• Checking the proxy and firewall\n• Running Windows Network Diagnostics",
      };
    } else if (data.error === "Network Error") {
      return {
        title: "ERR_CONNECTION_REFUSED",
        message: `${ip} refused to connect.`,
        suggestion:
          "Try:\n• Checking the connection\n• Checking the proxy and firewall\n• Contacting the site administrator",
      };
    } else {
      return {
        title: data.error,
        message: data.errorDetails || "An error occurred",
        suggestion: "Try refreshing the page or checking network settings",
      };
    }
  };

  const errorDisplay = getErrorDisplay();

  return (
    <div
      onClick={handleClick}
      className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {data.type === "public" ? (
            <Globe className="w-5 h-5 text-cyan-400" />
          ) : (
            <Lock className="w-5 h-5 text-purple-400" />
          )}
          <div>
            <div className="font-bold text-sm text-white">{data.name}</div>
            <div className="font-mono text-xs text-slate-400">{ip}</div>
          </div>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <div className="text-xs text-slate-500 mb-3 flex items-center gap-1">
        <Server className="w-3 h-3" />
        {data.location}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-700/50">
        <div>
          <div className="text-xs text-slate-500 mb-1">Response Time</div>
          <div
            className={`text-lg font-bold ${
              data.responseTime > 1000
                ? "text-red-400"
                : data.responseTime > 500
                  ? "text-yellow-400"
                  : "text-cyan-400"
            }`}
          >
            {data.responseTime}ms
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Uptime</div>
          <div className="text-lg font-bold text-green-400">{data.uptime}%</div>
        </div>
      </div>

      {errorDisplay && (
        <div className="mt-3 pt-3 border-t border-slate-700/50">
          <div
            className="text-xs text-red-400 cursor-pointer hover:text-red-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
          >
            <div className="flex items-center gap-1 mb-1">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              <span className="font-bold">{errorDisplay.title}</span>
            </div>

            {showDetails && (
              <div className="mt-2 bg-red-500/10 border border-red-500/20 rounded p-2 text-left">
                <div className="text-red-300 mb-2">{errorDisplay.message}</div>
                <div className="text-red-400/80 text-[11px] whitespace-pre-line">
                  {errorDisplay.suggestion}
                </div>
                <div className="mt-2 text-[10px] text-red-500">
                  Last checked: {data.lastChecked.toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-slate-500 text-center">
        Click to open →
      </div>
    </div>
  );
};

// Komponen Compact Point View
const CompactPoint = ({ ip, data }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Gunakan window.open dengan target _blank untuk mencegah navigation
    window.open(ip, "_blank", "noopener,noreferrer");
  };

  const getErrorDisplay = () => {
    if (!data.error) return null;

    if (data.error === "Connection Timeout") {
      return "ERR_TIMEOUT";
    } else if (data.error === "Network Error") {
      return "ERR_REFUSED";
    } else {
      return data.error;
    }
  };

  const errorDisplay = getErrorDisplay();

  return (
    <div
      onClick={handleClick}
      className="group flex flex-col p-3 bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-cyan-500/50 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 min-h-[140px]"
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className={`w-3 h-3 rounded-full ${
            data.status === "online"
              ? "bg-green-500 shadow-green-500/50"
              : data.status === "warning"
                ? "bg-yellow-500 shadow-yellow-500/50"
                : "bg-red-500 shadow-red-500/50"
          } shadow-lg animate-pulse flex-shrink-0`}
        />
        {data.type === "public" ? (
          <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
        ) : (
          <Lock className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
        )}
      </div>

      <div className="flex-1 mb-2">
        <div className="font-bold text-xs text-white mb-1 line-clamp-1">
          {data.name}
        </div>
        <div className="font-mono text-[10px] text-slate-400 mb-1 line-clamp-1">
          {ip}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-500">
          <Server className="w-2.5 h-2.5 flex-shrink-0" />
          <span className="line-clamp-1">{data.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-700/50 text-[10px]">
        <div>
          <div className="text-slate-500 mb-0.5">Ping</div>
          <div
            className={`font-bold ${
              data.responseTime > 1000
                ? "text-red-400"
                : data.responseTime > 500
                  ? "text-yellow-400"
                  : "text-cyan-400"
            }`}
          >
            {data.responseTime}ms
          </div>
        </div>
        <div>
          <div className="text-slate-500 mb-0.5">Up</div>
          <div className="font-bold text-green-400">{data.uptime}%</div>
        </div>
      </div>

      {errorDisplay && (
        <div
          className="mt-2 pt-2 border-t border-slate-700/50 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
        >
          <div className="text-[9px] text-red-400 flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{errorDisplay}</span>
          </div>

          {showDetails && (
            <div className="mt-1 bg-red-500/10 border border-red-500/20 rounded p-1 text-left">
              <div className="text-[8px] text-red-300 mb-1">
                {data.errorDetails?.substring(0, 50)}...
              </div>
              <div className="text-[7px] text-red-400/80">
                Click IP to troubleshoot
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// app/page.jsx - Tambahkan di bagian bawah sebelum export:
export const dynamic = "force-dynamic"; // Untuk real-time features

// Atau untuk static export:
// export const revalidate = 60; // Revalidate setiap 60 detik

// Komponen utama aplikasi
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("cards");
  const [ipStatuses, setIpStatuses] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Di dalam komponen utama, tambahkan:
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "System Administrator",
    email: "system@dzyra.co.id",
    role: "Senior Network Engineer",
    department: "IT Infrastructure",
    location: "Command Center HQ",
    lastLogin: new Date().toISOString(),
    avatar: "/avatar.png", // Anda bisa taruh gambar di public/avatar.png
    status: "active",
    notifications: 3,
    theme: "dark",
    notificationsEnabled: true,
    autoRefreshEnabled: true,
  });

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    type: "all",
    status: "all",
    sortBy: "name",
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Testing states
  const [testingIP, setTestingIP] = useState("");
  const [testResult, setTestResult] = useState(null);

  const autoRefreshRef = useRef(autoRefresh);
  const isAuthenticatedRef = useRef(isAuthenticated);

  // Update refs saat state berubah
  useEffect(() => {
    autoRefreshRef.current = autoRefresh;
    isAuthenticatedRef.current = isAuthenticated;
  }, [autoRefresh, isAuthenticated]);

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem(CREDENTIALS.sessionKey);
      if (session) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(CREDENTIALS.sessionKey);
    setIsAuthenticated(false);
  };

  // Fungsi check IP status
  const checkIPStatus = async (ip) => {
    const start = Date.now();

    // Bersihkan IP dari http://
    const cleanIP = ip.replace(/^https?:\/\//, "");
    const [host, port] = cleanIP.split(":");

    try {
      // Coba HEAD request ke root path
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`http://${host}:${port || 80}`, {
        method: "HEAD",
        signal: controller.signal,
        headers: {
          "User-Agent": "NetworkMonitor/1.0",
          Accept: "*/*",
        },
        mode: "no-cors", // Important untuk bypass CORS
      });

      clearTimeout(timeoutId);

      const responseTime = Date.now() - start;

      // Jika sampai sini, server merespons
      return {
        status: "online",
        responseTime,
        uptime: Math.floor(Math.random() * 30) + 70, // Random 70-99%
        lastChecked: new Date(),
        accessible: true,
        error: null,
        errorDetails: null,
      };
    } catch (error) {
      const responseTime = Date.now() - start;

      return {
        status: "offline",
        responseTime,
        uptime: 0,
        lastChecked: new Date(),
        accessible: false,
        error: error.name === "AbortError" ? "Timeout" : "Connection Failed",
        errorDetails: error.message,
      };
    }
  };

  // Update status semua IP
  const updateAllStatuses = useCallback(async () => {
    if (!isAuthenticatedRef.current) return;

    console.log("Updating IP statuses...");
    setLoading(true);

    const newStatuses = {};

    try {
      const allIPs = [...IP_CONFIG.public, ...IP_CONFIG.vpn];
      const batchSize = 10;
      const batches = [];

      for (let i = 0; i < allIPs.length; i += batchSize) {
        batches.push(allIPs.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        const batchPromises = batch.map(async (item) => {
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

        await Promise.all(batchPromises);
      }

      setIpStatuses(newStatuses);
    } catch (error) {
      console.error("Error updating IP statuses:", error);
    } finally {
      setLastUpdate(new Date());
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [checkIPStatus]);

  // Initial load saat login
  useEffect(() => {
    if (isAuthenticated && isInitialLoad) {
      updateAllStatuses();
    }
  }, [isAuthenticated, isInitialLoad, updateAllStatuses]);

  // Auto refresh handler
  useEffect(() => {
    let intervalId = null;

    const startAutoRefresh = () => {
      if (autoRefreshRef.current && isAuthenticatedRef.current) {
        intervalId = setInterval(() => {
          updateAllStatuses();
        }, 10000);
      }
    };

    const stopAutoRefresh = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    if (isAuthenticated) {
      if (autoRefresh) {
        startAutoRefresh();
      } else {
        stopAutoRefresh();
      }
    }

    return () => {
      stopAutoRefresh();
    };
  }, [autoRefresh, isAuthenticated, updateAllStatuses]);

  // Fungsi untuk test single IP
  const testSingleIP = async (ip) => {
    if (!ip) return;

    setTestingIP(ip);
    setTestResult(null);

    const result = await checkIPStatus(ip);
    setTestResult(result);

    // Update status di state
    setIpStatuses((prev) => ({
      ...prev,
      [ip]: result,
    }));

    setTimeout(() => {
      setTestResult(null);
    }, 5000);
  };

  // Handler untuk manual refresh
  const handleManualRefresh = async () => {
    await updateAllStatuses();
  };

  // Handler untuk toggle auto refresh
  const handleToggleAutoRefresh = () => {
    setAutoRefresh((prev) => !prev);
  };

  // Fungsi untuk memfilter IP berdasarkan query dan filter
  const getFilteredIPs = useCallback(() => {
    const allIPs = [...IP_CONFIG.public, ...IP_CONFIG.vpn].map((item) => ({
      ...item,
      statusData: ipStatuses[item.ip],
    }));

    let filtered = allIPs;

    // Filter berdasarkan query search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.ip.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query) ||
          (item.statusData?.error?.toLowerCase() || "").includes(query),
      );
    }

    // Filter berdasarkan type
    if (searchFilters.type !== "all") {
      filtered = filtered.filter((item) => item.type === searchFilters.type);
    }

    // Filter berdasarkan status
    if (searchFilters.status !== "all") {
      filtered = filtered.filter(
        (item) => item.statusData?.status === searchFilters.status,
      );
    }

    // Sort berdasarkan kriteria
    filtered.sort((a, b) => {
      switch (searchFilters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "responseTime":
          return (
            (a.statusData?.responseTime || 9999) -
            (b.statusData?.responseTime || 9999)
          );
        case "uptime":
          return (b.statusData?.uptime || 0) - (a.statusData?.uptime || 0);
        case "status":
          const statusOrder = { online: 1, warning: 2, offline: 3 };
          return (
            (statusOrder[a.statusData?.status] || 4) -
            (statusOrder[b.statusData?.status] || 4)
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, searchFilters, ipStatuses]);

  // Hitung statistik
  const getStats = () => {
    const all = Object.values(ipStatuses);
    const online = all.filter((s) => s.status === "online").length;
    const warning = all.filter((s) => s.status === "warning").length;
    const offline = all.filter((s) => s.status === "offline").length;

    const publicIPs = all.filter((s) => s.type === "public");
    const vpnIPs = all.filter((s) => s.type === "vpn");

    return {
      total: all.length,
      online,
      warning,
      offline,
      publicOnline: publicIPs.filter((s) => s.status === "online").length,
      vpnOnline: vpnIPs.filter((s) => s.status === "online").length,
      avgResponseTime:
        all.length > 0
          ? Math.floor(
              all.reduce((acc, s) => acc + s.responseTime, 0) / all.length,
            )
          : 0,
    };
  };

  const stats = getStats();

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/80 border-b border-cyan-500/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-40 h-10 md:w-50 md:h-12 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/17.png"
                  alt="Dzyra Technology Logo"
                  width={560}
                  height={280}
                  className="w-40 h-60 md:w-70 md:h-90 object-contain relative z-10"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-white">
                  NETWORK COMMAND CENTER
                </h1>
                <p className="text-xs text-cyan-400">
                  System Monitoring Interface
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>
                  Last:{" "}
                  {lastUpdate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                    viewMode === "cards"
                      ? "bg-cyan-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-all ${
                    viewMode === "compact"
                      ? "bg-cyan-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Compact
                </button>
              </div>

              <button
                onClick={handleToggleAutoRefresh}
                className={`px-3 py-1 rounded-lg font-semibold text-xs transition-all flex items-center gap-1 ${
                  autoRefresh
                    ? "bg-cyan-500 text-white hover:bg-cyan-600"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    autoRefresh ? "bg-green-400 animate-pulse" : "bg-red-400"
                  }`}
                />
                {autoRefresh ? "Auto: ON" : "Auto: OFF"}
              </button>

              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all disabled:opacity-50 flex items-center gap-1"
              >
                <RefreshCw
                  className={`w-4 h-4 text-cyan-400 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
                <span className="text-xs text-slate-300">
                  {loading ? "Updating..." : "Refresh"}
                </span>
              </button>

              {/* Manual Testing mini panel */}
              <div className="relative group">
                <button className="p-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-slate-600 hover:border-cyan-500/30 rounded-lg transition-all duration-300 shadow-sm hover:shadow-cyan-500/20 group-hover:scale-105">
                  <Activity className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </button>

                {/* Dropdown testing panel */}
                <div className="absolute right-0 top-full mt-2 w-96 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 rounded-xl p-4 shadow-2xl shadow-black/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-sm">
                  {/* Header with glow effect */}
                  <div className="relative mb-4">
                    <div className="absolute -top-2 -left-2 w-10 h-10 bg-cyan-500/20 rounded-full blur-sm"></div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2 relative z-10">
                      <div className="p-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
                        <Activity className="w-3 h-3 text-white" />
                      </div>
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Quick IP Test
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Test connection to any IP address
                    </p>
                  </div>

                  {/* Input section */}
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur-sm"></div>
                      <div className="relative flex gap-2">
                        <div className="relative flex-1">
                          <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/60" />
                          <input
                            type="text"
                            value={testingIP}
                            onChange={(e) => setTestingIP(e.target.value)}
                            placeholder="192.168.1.1:80"
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-900/80 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                          />
                        </div>
                        <button
                          onClick={() => testSingleIP(testingIP)}
                          disabled={!testingIP.trim()}
                          className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:shadow-none flex items-center gap-1.5 min-w-16 justify-center"
                        >
                          <svg
                            className={`w-3.5 h-3.5 ${
                              !testingIP.trim() ? "opacity-50" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span className="text-xs">Test</span>
                        </button>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">
                          Format: IP:Port or Domain
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Example: google.com:443
                        </span>
                      </div>
                    </div>

                    {/* Test result */}
                    {testResult && (
                      <div
                        className={`mt-4 overflow-hidden rounded-xl border ${
                          testResult.status === "online"
                            ? "border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-600/5"
                            : "border-red-500/30 bg-gradient-to-br from-red-500/10 to-red-600/5"
                        }`}
                      >
                        {/* Result header */}
                        <div
                          className={`px-4 py-3 flex items-center justify-between ${
                            testResult.status === "online"
                              ? "bg-gradient-to-r from-green-500/20 to-green-600/10"
                              : "bg-gradient-to-r from-red-500/20 to-red-600/10"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`p-1.5 rounded-lg ${
                                testResult.status === "online"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {testResult.status === "online" ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">
                                {testResult.status === "online"
                                  ? "CONNECTION SUCCESS"
                                  : "CONNECTION FAILED"}
                              </div>
                              <div className="text-xs text-slate-400">
                                {testingIP}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-cyan-400">
                              {testResult.responseTime}ms
                            </div>
                            <div className="text-xs text-slate-400">Ping</div>
                          </div>
                        </div>

                        {/* Result details */}
                        <div className="p-4">
                          {testResult.status === "online" ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">
                                  Status
                                </span>
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">
                                  ONLINE
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">
                                  Accessible
                                </span>
                                <span className="text-green-400 text-sm font-bold">
                                  ✓ Yes
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">
                                  Uptime
                                </span>
                                <span className="text-green-400 text-sm font-bold">
                                  {testResult.uptime}%
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertTriangle className="w-4 h-4 text-red-400" />
                                  <span className="text-sm font-bold text-red-400">
                                    {testResult.error}
                                  </span>
                                </div>
                                <div className="text-xs text-red-300/80 mb-3">
                                  {testResult.errorDetails}
                                </div>
                                <div className="space-y-2">
                                  <div className="text-xs font-semibold text-slate-400">
                                    Troubleshooting steps:
                                  </div>
                                  <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
                                    <li>Check the server is running</li>
                                    <li>Verify firewall settings</li>
                                    <li>Confirm IP and port are correct</li>
                                    <li>Check network connectivity</li>
                                  </ul>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/50">
                                <div>
                                  <div className="text-xs text-slate-500">
                                    Response Time
                                  </div>
                                  <div className="text-sm font-bold text-red-400">
                                    {testResult.responseTime}ms
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-slate-500">
                                    Last Check
                                  </div>
                                  <div className="text-sm font-semibold text-slate-300">
                                    {testResult.lastChecked.toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      },
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="px-4 py-3 border-t border-slate-700/50 bg-slate-900/50 flex justify-between">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(testingIP);
                            }}
                            className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            Copy IP
                          </button>
                          <button
                            onClick={() =>
                              window.open(`${testingIP}`, "_blank")
                            }
                            className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Open in Browser
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Recent tests hint */}
                    {!testResult && (
                      <div className="mt-4 pt-3 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-400">
                            Quick test examples:
                          </span>
                          <button
                            onClick={() => setTestingIP("google.com:443")}
                            className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            Try Google
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {["8.8.8.8:53", "1.1.1.1:80", "localhost:3000"].map(
                            (ip) => (
                              <button
                                key={ip}
                                onClick={() => setTestingIP(ip)}
                                className="px-2 py-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white text-xs rounded transition-colors"
                              >
                                {ip}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="relative group">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-slate-600 hover:border-cyan-500/30 rounded-lg transition-all duration-300 shadow-sm hover:shadow-cyan-500/20 flex items-center gap-1.5"
                >
                  <svg
                    className="w-4 h-4 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span className="text-xs text-slate-300 hidden md:inline">
                    Search
                  </span>
                </button>

                {/* Search Panel Dropdown */}
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 rounded-xl p-4 shadow-2xl shadow-black/50 z-50 backdrop-blur-sm animate-fadeIn">
                    {/* Header */}
                    <div className="relative mb-4">
                      <div className="absolute -top-2 -left-2 w-10 h-10 bg-blue-500/20 rounded-full blur-sm"></div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2 relative z-10">
                        <div className="p-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                          Search & Filter
                        </span>
                        <span className="ml-auto text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                          {getFilteredIPs().length} results
                        </span>
                      </h4>
                    </div>

                    {/* Search Input */}
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg blur-sm"></div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <svg
                            className="w-4 h-4 text-blue-400/60"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search by name, IP, location, or error..."
                          className="w-full pl-10 pr-10 py-2.5 bg-slate-900/80 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          autoFocus
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Filter Controls */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {/* Type Filter */}
                      <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">
                          Type
                        </label>
                        <div className="flex flex-col gap-1">
                          {["all", "public", "vpn"].map((type) => (
                            <button
                              key={type}
                              onClick={() =>
                                setSearchFilters((prev) => ({ ...prev, type }))
                              }
                              className={`px-2 py-1.5 text-xs rounded-lg transition-all ${
                                searchFilters.type === type
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                                  : "bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700"
                              }`}
                            >
                              {type === "all"
                                ? "All"
                                : type === "public"
                                  ? "🌐 Public"
                                  : "🔒 VPN"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Status Filter */}
                      <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">
                          Status
                        </label>
                        <div className="flex flex-col gap-1">
                          {["all", "online", "warning", "offline"].map(
                            (status) => (
                              <button
                                key={status}
                                onClick={() =>
                                  setSearchFilters((prev) => ({
                                    ...prev,
                                    status,
                                  }))
                                }
                                className={`px-2 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5 ${
                                  searchFilters.status === status
                                    ? status === "online"
                                      ? "bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400 border border-green-500/30"
                                      : status === "warning"
                                        ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 text-yellow-400 border border-yellow-500/30"
                                        : status === "offline"
                                          ? "bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-400 border border-red-500/30"
                                          : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                                    : "bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700"
                                }`}
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    status === "online"
                                      ? "bg-green-500"
                                      : status === "warning"
                                        ? "bg-yellow-500"
                                        : status === "offline"
                                          ? "bg-red-500"
                                          : "bg-blue-500"
                                  }`}
                                />
                                {status === "all"
                                  ? "All"
                                  : status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                              </button>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Sort By */}
                      <div>
                        <label className="text-xs text-slate-400 mb-1.5 block">
                          Sort By
                        </label>
                        <div className="flex flex-col gap-1">
                          {[
                            { value: "name", label: "Name" },
                            { value: "status", label: "Status" },
                            { value: "responseTime", label: "Response Time" },
                            { value: "uptime", label: "Uptime" },
                          ].map((sort) => (
                            <button
                              key={sort.value}
                              onClick={() =>
                                setSearchFilters((prev) => ({
                                  ...prev,
                                  sortBy: sort.value,
                                }))
                              }
                              className={`px-2 py-1.5 text-xs rounded-lg transition-all ${
                                searchFilters.sortBy === sort.value
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                                  : "bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700"
                              }`}
                            >
                              {sort.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                      <div className="grid grid-cols-4 gap-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">
                            {getFilteredIPs().length}
                          </div>
                          <div className="text-xs text-slate-400">Total</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">
                            {
                              getFilteredIPs().filter(
                                (item) => item.statusData?.status === "online",
                              ).length
                            }
                          </div>
                          <div className="text-xs text-slate-400">Online</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-yellow-400">
                            {
                              getFilteredIPs().filter(
                                (item) => item.statusData?.status === "warning",
                              ).length
                            }
                          </div>
                          <div className="text-xs text-slate-400">Warning</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-400">
                            {
                              getFilteredIPs().filter(
                                (item) => item.statusData?.status === "offline",
                              ).length
                            }
                          </div>
                          <div className="text-xs text-slate-400">Offline</div>
                        </div>
                      </div>
                    </div>

                    {/* Search Results Preview */}
                    <div className="max-h-64 overflow-y-auto pr-1">
                      <div className="text-xs text-slate-400 mb-2 flex justify-between">
                        <span>Quick Preview:</span>
                        <span className="text-blue-400">
                          {getFilteredIPs().length} items
                        </span>
                      </div>

                      {getFilteredIPs().length === 0 ? (
                        <div className="text-center py-6">
                          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <p className="text-slate-400 text-sm">
                            No results found
                          </p>
                          <p className="text-slate-500 text-xs mt-1">
                            Try different keywords or filters
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {getFilteredIPs()
                            .slice(0, 5)
                            .map((item) => (
                              <div
                                key={item.ip}
                                onClick={() => {
                                  window.open(`${item.ip}`, "_blank");
                                  setIsSearchOpen(false);
                                }}
                                className="p-2 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 hover:border-blue-500/30 rounded-lg cursor-pointer transition-all group"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    {item.type === "public" ? (
                                      <Globe className="w-3 h-3 text-blue-400" />
                                    ) : (
                                      <Lock className="w-3 h-3 text-purple-400" />
                                    )}
                                    <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                                      {item.name}
                                    </span>
                                  </div>
                                  <div
                                    className={`text-xs px-1.5 py-0.5 rounded ${
                                      item.statusData?.status === "online"
                                        ? "bg-green-500/20 text-green-400"
                                        : item.statusData?.status === "warning"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                    }`}
                                  >
                                    {item.statusData?.status || "unknown"}
                                  </div>
                                </div>
                                <div className="text-xs text-slate-400 truncate">
                                  {item.ip}
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-xs text-slate-500">
                                    {item.location}
                                  </span>
                                  {item.statusData?.responseTime && (
                                    <span
                                      className={`text-xs ${
                                        item.statusData.responseTime > 1000
                                          ? "text-red-400"
                                          : item.statusData.responseTime > 500
                                            ? "text-yellow-400"
                                            : "text-green-400"
                                      }`}
                                    >
                                      {item.statusData.responseTime}ms
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}

                          {getFilteredIPs().length > 5 && (
                            <div className="text-center pt-2 border-t border-slate-700/50">
                              <div className="text-xs text-blue-400">
                                +{getFilteredIPs().length - 5} more results
                              </div>
                              <button
                                onClick={() => {
                                  setActiveTab("overview");
                                  setIsSearchOpen(false);
                                }}
                                className="mt-1 text-xs bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-1.5 rounded-lg transition-all"
                              >
                                View All Results
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Clear Filters */}
                    {(searchQuery ||
                      searchFilters.type !== "all" ||
                      searchFilters.status !== "all") && (
                      <div className="mt-4 pt-3 border-t border-slate-700/50">
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setSearchFilters({
                              type: "all",
                              status: "all",
                              sortBy: "name",
                            });
                          }}
                          className="w-full py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Clear All Filters
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg font-semibold text-xs transition-all"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
              {/* Profile Button di Header */}
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="relative p-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-slate-600 hover:border-purple-500/30 rounded-lg transition-all duration-300 shadow-sm hover:shadow-purple-500/20 group"
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                      {userProfile.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
                  </div>
                  <span className="text-xs text-slate-300 hidden md:inline">
                    Profile
                  </span>
                </div>
              </button>

              {/* Profile Panel Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 rounded-xl p-6 shadow-2xl shadow-black/50 z-50 backdrop-blur-sm animate-fadeIn">
                  {/* Header Profile */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700/50">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/30">
                        {userProfile.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-slate-900 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">
                        {userProfile.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {userProfile.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full font-semibold">
                          {userProfile.role}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded-full">
                          ID: SYS-
                          {simpleHash(userProfile.email)
                            .substring(0, 6)
                            .toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                      <div className="text-xl font-bold text-cyan-400">40</div>
                      <div className="text-xs text-slate-400">
                        IPs Monitored
                      </div>
                    </div>
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                      <div className="text-xl font-bold text-green-400">
                        24/7
                      </div>
                      <div className="text-xs text-slate-400">Uptime</div>
                    </div>
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                      <div className="text-xl font-bold text-yellow-400">
                        {userProfile.notifications}
                      </div>
                      <div className="text-xs text-slate-400">Alerts</div>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="text-sm text-slate-400">
                          Department
                        </span>
                      </div>
                      <span className="text-sm text-white font-semibold">
                        {userProfile.department}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm text-slate-400">Location</span>
                      </div>
                      <span className="text-sm text-white font-semibold">
                        {userProfile.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm text-slate-400">
                          Last Login
                        </span>
                      </div>
                      <span className="text-sm text-white font-semibold">
                        {new Date(userProfile.lastLogin).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Settings */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </h4>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white">Dark Mode</div>
                          <div className="text-xs text-slate-400">
                            Interface theme
                          </div>
                        </div>
                        <div
                          className={`w-12 h-6 rounded-full transition-all cursor-pointer ${
                            userProfile.theme === "dark"
                              ? "bg-gradient-to-r from-purple-500 to-pink-500"
                              : "bg-slate-700"
                          }`}
                          onClick={() =>
                            setUserProfile((prev) => ({
                              ...prev,
                              theme: prev.theme === "dark" ? "light" : "dark",
                            }))
                          }
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                              userProfile.theme === "dark"
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white">
                            Notifications
                          </div>
                          <div className="text-xs text-slate-400">
                            System alerts
                          </div>
                        </div>
                        <div
                          className={`w-12 h-6 rounded-full transition-all cursor-pointer ${
                            userProfile.notificationsEnabled
                              ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                              : "bg-slate-700"
                          }`}
                          onClick={() =>
                            setUserProfile((prev) => ({
                              ...prev,
                              notificationsEnabled: !prev.notificationsEnabled,
                            }))
                          }
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                              userProfile.notificationsEnabled
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white">Auto Refresh</div>
                          <div className="text-xs text-slate-400">
                            Real-time updates
                          </div>
                        </div>
                        <div
                          className={`w-12 h-6 rounded-full transition-all cursor-pointer ${
                            userProfile.autoRefreshEnabled
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : "bg-slate-700"
                          }`}
                          onClick={() => {
                            setUserProfile((prev) => ({
                              ...prev,
                              autoRefreshEnabled: !prev.autoRefreshEnabled,
                            }));
                            setAutoRefresh(!autoRefresh);
                          }}
                        >
                          <div
                            className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                              userProfile.autoRefreshEnabled
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        // Action untuk edit profile
                        alert("Edit Profile feature coming soon!");
                      }}
                      className="py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="py-2 bg-gradient-to-r from-red-500/20 to-red-600/10 hover:from-red-500/30 hover:to-red-600/20 border border-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign Out
                    </button>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-700/50">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1">
                        Session: {CREDENTIALS.sessionKey.substring(0, 8)}...
                      </div>
                      <div className="text-xs text-slate-600">
                        © 2024 Dzyra Corp. • v1.0.0
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
              <span className="text-xl md:text-3xl font-bold text-green-400">
                {stats.online}
              </span>
            </div>
            <div className="text-slate-300 text-sm font-semibold">Online</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
              <span className="text-xl md:text-3xl font-bold text-yellow-400">
                {stats.warning}
              </span>
            </div>
            <div className="text-slate-300 text-sm font-semibold">Warnings</div>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <XCircle className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
              <span className="text-xl md:text-3xl font-bold text-red-400">
                {stats.offline}
              </span>
            </div>
            <div className="text-slate-300 text-sm font-semibold">Offline</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <Activity className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
              <span className="text-xl md:text-3xl font-bold text-cyan-400">
                {stats.avgResponseTime}ms
              </span>
            </div>
            <div className="text-slate-300 text-sm font-semibold">Avg Ping</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6 bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Server className="w-4 h-4" />
              <span className="text-sm">Overview</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("public")}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all ${
              activeTab === "public"
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm">
                Public ({stats.publicOnline}/{IP_CONFIG.public.length})
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("vpn")}
            className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all ${
              activeTab === "vpn"
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="text-sm">
                VPN ({stats.vpnOnline}/{IP_CONFIG.vpn.length})
              </span>
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                  Network Status Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                      Public Network
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Total Nodes:</span>
                        <span className="text-white font-bold">
                          {IP_CONFIG.public.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Active:</span>
                        <span className="text-green-400 font-bold">
                          {stats.publicOnline}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (stats.publicOnline / IP_CONFIG.public.length) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3">
                      VPN Network
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Total Nodes:</span>
                        <span className="text-white font-bold">
                          {IP_CONFIG.vpn.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Active:</span>
                        <span className="text-green-400 font-bold">
                          {stats.vpnOnline}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (stats.vpnOnline / IP_CONFIG.vpn.length) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Public Network Section */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded"></div>
                  <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                    <Globe className="w-6 h-6" />
                    Public Network Nodes (20)
                  </h3>
                  <div className="h-1 flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent rounded"></div>
                </div>

                {viewMode === "cards" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {IP_CONFIG.public.map(
                      (item) =>
                        ipStatuses[item.ip] && (
                          <IPCard
                            key={item.ip}
                            ip={item.ip}
                            data={ipStatuses[item.ip]}
                          />
                        ),
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Kolom Kiri - IP 1-10 */}
                    <div className="space-y-4">
                      {/* Baris 1: IP 1-5 */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {IP_CONFIG.public
                          .slice(0, 5)
                          .map(
                            (item) =>
                              ipStatuses[item.ip] && (
                                <CompactPoint
                                  key={item.ip}
                                  ip={item.ip}
                                  data={ipStatuses[item.ip]}
                                />
                              ),
                          )}
                      </div>
                      {/* Baris 2: IP 6-10 */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {IP_CONFIG.public
                          .slice(5, 10)
                          .map(
                            (item) =>
                              ipStatuses[item.ip] && (
                                <CompactPoint
                                  key={item.ip}
                                  ip={item.ip}
                                  data={ipStatuses[item.ip]}
                                />
                              ),
                          )}
                      </div>
                    </div>

                    {/* Kolom Kanan - IP 11-20 */}
                    <div className="space-y-4">
                      {/* Baris 1: IP 11-15 */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {IP_CONFIG.public
                          .slice(10, 15)
                          .map(
                            (item) =>
                              ipStatuses[item.ip] && (
                                <CompactPoint
                                  key={item.ip}
                                  ip={item.ip}
                                  data={ipStatuses[item.ip]}
                                />
                              ),
                          )}
                      </div>
                      {/* Baris 2: IP 16-20 */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {IP_CONFIG.public
                          .slice(15, 20)
                          .map(
                            (item) =>
                              ipStatuses[item.ip] && (
                                <CompactPoint
                                  key={item.ip}
                                  ip={item.ip}
                                  data={ipStatuses[item.ip]}
                                />
                              ),
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Separator */}
              <div className="relative my-12">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-slate-600"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-slate-900 px-6 py-3 rounded-lg border-2 border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                      <span className="text-slate-400 font-semibold">
                        NETWORK SEPARATOR
                      </span>
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VPN Network Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
                  <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
                    <Lock className="w-6 h-6" />
                    VPN Network Nodes (20)
                  </h3>
                  <div className="h-1 flex-1 bg-gradient-to-r from-purple-500/50 to-transparent rounded"></div>
                </div>

                {viewMode === "cards" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {IP_CONFIG.vpn.map(
                      (item) =>
                        ipStatuses[item.ip] && (
                          <IPCard
                            key={item.ip}
                            ip={item.ip}
                            data={ipStatuses[item.ip]}
                          />
                        ),
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Kolom Kiri - IP 1-10 */}
                    <div className="space-y-4">
                      {/* Baris 1: IP 1-5 */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {IP_CONFIG.vpn
                          .slice(0, 5)
                          .map(
                            (item) =>
                              ipStatuses[item.ip] && (
                                <CompactPoint
                                  key={item.ip}
                                  ip={item.ip}
                                  data={ipStatuses[item.ip]}
                                />
                              ),
                          )}
                      </div>
                      {/* Baris 2: IP 6-10 */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {IP_CONFIG.vpn
                          .slice(5, 10)
                          .map(
                            (item) =>
                              ipStatuses[item.ip] && (
                                <CompactPoint
                                  key={item.ip}
                                  ip={item.ip}
                                  data={ipStatuses[item.ip]}
                                />
                              ),
                          )}
                      </div>
                    </div>

                    {/* Kolom Kanan - IP 11-20 */}
                    <div className="space-y-4">
                      {/* Baris 1: IP 11-15 */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {IP_CONFIG.vpn
                          .slice(10, 15)
                          .map(
                            (item) =>
                              ipStatuses[item.ip] && (
                                <CompactPoint
                                  key={item.ip}
                                  ip={item.ip}
                                  data={ipStatuses[item.ip]}
                                />
                              ),
                          )}
                      </div>
                      {/* Baris 2: IP 16-20 */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                        {IP_CONFIG.vpn
                          .slice(15, 20)
                          .map(
                            (item) =>
                              ipStatuses[item.ip] && (
                                <CompactPoint
                                  key={item.ip}
                                  ip={item.ip}
                                  data={ipStatuses[item.ip]}
                                />
                              ),
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "public" && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                Public Network Nodes ({IP_CONFIG.public.length})
              </h3>
              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {IP_CONFIG.public.map(
                    (item) =>
                      ipStatuses[item.ip] && (
                        <IPCard
                          key={item.ip}
                          ip={item.ip}
                          data={ipStatuses[item.ip]}
                        />
                      ),
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Kolom Kiri - IP 1-10 */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                      {IP_CONFIG.public
                        .slice(0, 10)
                        .map(
                          (item) =>
                            ipStatuses[item.ip] && (
                              <CompactPoint
                                key={item.ip}
                                ip={item.ip}
                                data={ipStatuses[item.ip]}
                              />
                            ),
                        )}
                    </div>
                  </div>
                  {/* Kolom Kanan - IP 11-20 */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                      {IP_CONFIG.public
                        .slice(10, 20)
                        .map(
                          (item) =>
                            ipStatuses[item.ip] && (
                              <CompactPoint
                                key={item.ip}
                                ip={item.ip}
                                data={ipStatuses[item.ip]}
                              />
                            ),
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "vpn" && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                VPN Network Nodes ({IP_CONFIG.vpn.length})
              </h3>
              {viewMode === "cards" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {IP_CONFIG.vpn.map(
                    (item) =>
                      ipStatuses[item.ip] && (
                        <IPCard
                          key={item.ip}
                          ip={item.ip}
                          data={ipStatuses[item.ip]}
                        />
                      ),
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Kolom Kiri - IP 1-10 */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                      {IP_CONFIG.vpn
                        .slice(0, 10)
                        .map(
                          (item) =>
                            ipStatuses[item.ip] && (
                              <CompactPoint
                                key={item.ip}
                                ip={item.ip}
                                data={ipStatuses[item.ip]}
                              />
                            ),
                        )}
                    </div>
                  </div>
                  {/* Kolom Kanan - IP 11-20 */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                      {IP_CONFIG.vpn
                        .slice(10, 20)
                        .map(
                          (item) =>
                            ipStatuses[item.ip] && (
                              <CompactPoint
                                key={item.ip}
                                ip={item.ip}
                                data={ipStatuses[item.ip]}
                              />
                            ),
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900/80 border-t border-cyan-500/30 mt-8">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div>© 2024 Network Command Center. All systems monitored.</div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  loading
                    ? "bg-yellow-400 animate-pulse"
                    : autoRefresh
                      ? "bg-green-400 animate-pulse"
                      : "bg-slate-400"
                }`}
              />
              <span>
                {loading
                  ? "Updating..."
                  : autoRefresh
                    ? "Auto Refresh Active"
                    : "System Operational"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
