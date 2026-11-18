import { createContext } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  organization_id: number;
  department_id?: number | null;
  department_name?: string | null;
  shift_start_time: string;
  organization?: {
    id: number;
    name: string;
    invite_code: string;
  };
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
