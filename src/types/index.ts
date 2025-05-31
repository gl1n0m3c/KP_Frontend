// Network Types
export interface NetworkMetric {
  id: string
  title: string
  value: string
  status: "success" | "warning" | "error"
  icon: any
  trend?: string | null
}

export interface Device {
  id: string
  name: string
  ip: string
  type: "router" | "switch" | "server" | "workstation"
  status: "online" | "offline" | "warning"
  lastSeen: string
  ping?: number
  uptime?: number
}

export interface Alert {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  deviceId?: string
  acknowledged: boolean
}

export interface ChartData {
  timestamp: string
  value: number
  label?: string
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: any
  loading: boolean
}

// Auth Types
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

// API Types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Store Types
export interface RootState {
  auth: AuthState
  network: NetworkState
  alerts: AlertsState
  ui: UIState
  devices: DevicesState
}

export interface NetworkState {
  isOnline: boolean
  uptime: number
  averagePing: number
  devices: Device[]
  chartData: ChartData[]
  refreshing: boolean
  testing: boolean
  exporting: boolean
}

export interface AlertsState {
  alerts: Alert[]
  recent: Alert[]
  activeCount: number
  loading: boolean
}

export interface UIState {
  isDarkMode: boolean
  locale: string
  sidebarOpen: boolean
}

export interface DevicesState {
  devices: Device[]
  loading: boolean
}
