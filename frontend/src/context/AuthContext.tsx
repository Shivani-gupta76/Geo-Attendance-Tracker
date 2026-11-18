import React, { useCallback, useEffect, useState } from 'react';
import api from '../api/axios';
import { AuthContext, type User } from './auth-context';

function readStoredUser(): User | null {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) as User : null;
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(readStoredUser);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('token') && localStorage.getItem('user')));

  const login = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await api.get('/auth/me');
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
  }, []);

  useEffect(() => {
    if (!token) return;
    api.get('/auth/me')
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      })
      .catch(logout)
      .finally(() => setLoading(false));
  }, [logout, token]);

  return <AuthContext.Provider value={{ user, token, login, logout, refreshUser, loading }}>{children}</AuthContext.Provider>;
};

