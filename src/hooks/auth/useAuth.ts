'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  telegram_chat_id?: string;
  social_accounts?: Record<string, unknown>;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkAuth: () => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsLoading(false);
      setIsAuthenticated(false);
      return false;
    }

    try {
      // Check token expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        setIsLoading(false);
        setIsAuthenticated(false);
        return false;
      }

      // Verify with API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setIsLoading(false);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  }, [router]);

  // Check auth on mount
  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        if (isMounted) {
          setIsLoading(false);
          setIsAuthenticated(false);
        }
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          if (isMounted) {
            setIsLoading(false);
            setIsAuthenticated(false);
          }
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (isMounted) {
          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (isMounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    checkAuth,
    logout,
  };
}
