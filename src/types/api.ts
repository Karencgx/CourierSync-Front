// Tipos TypeScript para las respuestas de la API

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Tipos para Shipments
export interface Shipment {
  id: string;
  tracking_code: string;
  origin_address: string; 
  destination_address: string; 
  priority: string;
  status: string;
  creation_date: string;
  estimated_delivery_date: string | null;
  real_delivery_date: string | null;
  weight: number;
  volume: number;
  client_id: string;
  vehicle_id: string | null;
  client: Client | null;  
  vehicle: Vehicle | null;
}

export interface CreateShipmentRequest {
  client_id: string;
  origin_address: string;
  destination_address: string;
  weight: number;
  volume: number;
  priority: 'Alta' | 'Normal' | 'Baja';
}

export interface UpdateShipmentRequest {
  origin?: string;
  destination?: string;
  weight?: string;
  priority?: 'Alta' | 'Normal' | 'Baja';
  status?: 'Pendiente' | 'En tránsito' | 'Entregado' | 'Novedad';
  observation?: string;
  deliveryConfirmed?: boolean;
}

export interface UpdateStatusRequest {
  status: 'Pendiente' | 'En tránsito' | 'Entregado' | 'Novedad';
  observation?: string;
  deliveryConfirmed?: boolean;
}

export interface User {
  id: string; // PK
  name: string;
  email: string;
  password?: string; // 
  phone: string;
  role: string;
  creation_date: string; // 
}
// Tipos para autenticación
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Tipos para Client
export interface Client {
  id: string; // PK
  name: string;
  email: string;
  phone: string;
  address: string;
  registration_date: string;
}

// Tipos para Vehicle
export interface Vehicle {
  id: string; // PK
  plate: string;
  model: string;
  maximum_capacity: number; // Asumiendo que es un número
  available: boolean;
}

export interface statusHistory{
  shipment_id: string; // PK/FK
  old_status: string;
  new_status: string;
  change_date: string;
}
// Tipos para municipios
export interface Municipality {
  id: string;
  name: string;
  department: string;
}

// Tipos genéricos para paginación
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Estado de carga para hooks
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}