// Mock data for network monitoring application
import type { User, Device, Alert, ChartData } from "@/types"

// Mock user data
export const mockUser: User = {
  id: "1",
  email: "gorilla@cheburnet.com",
  name: "Network Administrator",
  role: "admin",
  avatar: undefined,
}

// Mock devices data
export const mockDevices: Device[] = [
  {
    id: "1",
    name: "Main Router",
    ip: "192.168.1.1",
    type: "router",
    status: "online",
    lastSeen: new Date().toISOString(),
    ping: 12,
    uptime: 99.8,
  },
  {
    id: "2",
    name: "Core Switch",
    ip: "192.168.1.10",
    type: "switch",
    status: "online",
    lastSeen: new Date(Date.now() - 5000).toISOString(),
    ping: 8,
    uptime: 99.9,
  },
  {
    id: "3",
    name: "Web Server",
    ip: "192.168.1.100",
    type: "server",
    status: "warning",
    lastSeen: new Date(Date.now() - 30000).toISOString(),
    ping: 45,
    uptime: 98.5,
  },
  {
    id: "4",
    name: "Database Server",
    ip: "192.168.1.101",
    type: "server",
    status: "online",
    lastSeen: new Date(Date.now() - 2000).toISOString(),
    ping: 15,
    uptime: 99.7,
  },
  {
    id: "5",
    name: "Workstation-01",
    ip: "192.168.1.50",
    type: "workstation",
    status: "offline",
    lastSeen: new Date(Date.now() - 3600000).toISOString(),
    ping: undefined,
    uptime: 95.2,
  },
]

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Server Down",
    message: "Web Server (192.168.1.100) is not responding",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    deviceId: "3",
    acknowledged: false,
  },
  {
    id: "2",
    type: "warning",
    title: "High Latency",
    message: "Network latency increased to 45ms",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    deviceId: "3",
    acknowledged: false,
  },
  {
    id: "3",
    type: "info",
    title: "Device Reconnected",
    message: "Core Switch reconnected successfully",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    deviceId: "2",
    acknowledged: true,
  },
  {
    id: "4",
    type: "critical",
    title: "Device Offline",
    message: "Workstation-01 went offline",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    deviceId: "5",
    acknowledged: false,
  },
  {
    id: "5",
    type: "warning",
    title: "Memory Usage High",
    message: "Database Server memory usage at 85%",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    deviceId: "4",
    acknowledged: true,
  },
]

// Mock chart data generator
export const generateMockChartData = (timeRange: string): ChartData[] => {
  const now = new Date()
  const data: ChartData[] = []

  let points = 24
  let interval = 60 * 60 * 1000 // 1 hour

  switch (timeRange) {
    case "1h":
      points = 12
      interval = 5 * 60 * 1000 // 5 minutes
      break
    case "24h":
      points = 24
      interval = 60 * 60 * 1000 // 1 hour
      break
    case "7d":
      points = 7
      interval = 24 * 60 * 60 * 1000 // 1 day
      break
  }

  for (let i = points - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * interval)
    const baseValue = 45 + Math.sin(i * 0.5) * 15
    const noise = (Math.random() - 0.5) * 10
    const value = Math.max(0, Math.min(100, baseValue + noise))

    data.push({
      timestamp: timestamp.toISOString(),
      value: Math.round(value * 10) / 10,
      label: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    })
  }

  return data
}

// Mock network metrics
export const mockNetworkMetrics = {
  isOnline: true,
  uptime: 99.9,
  averagePing: 18,
  totalDevices: mockDevices.length,
  onlineDevices: mockDevices.filter((d) => d.status === "online").length,
  offlineDevices: mockDevices.filter((d) => d.status === "offline").length,
  warningDevices: mockDevices.filter((d) => d.status === "warning").length,
}

// Mock login function
export const mockLogin = (
  email: string,
  password: string,
): { success: boolean; user?: User; token?: string; error?: string } => {
  // Simple mock validation
  if (email === "gorilla@cheburnet.com" && password === "password") {
    return {
      success: true,
      user: mockUser,
      token: "mock-jwt-token-" + Date.now(),
    }
  }

  return {
    success: false,
    error: "Invalid credentials",
  }
}

// Mock async delay function
export const mockDelay = (ms = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
