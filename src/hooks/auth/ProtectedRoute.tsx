'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AuthLoadingScreen from '@/components/layout/AuthLoadingScreen';
import { useAuthStore } from '@/stores/authStore';

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'];

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, token, setUser, setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        setIsLoading(false);
        if (!PUBLIC_PATHS.includes(pathname)) {
           router.push('/login');
        }
        return;
      }

      // If we have a token but haven't fetched user yet
      if (!isAuthenticated) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${storedToken}` }
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
            setToken(storedToken);
          } else {
            localStorage.removeItem('token');
            router.push('/login');
          }
        } catch (error) {
           console.error("Auth check failed", error);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, isAuthenticated, setUser, setToken, router]);

  useEffect(() => {
     // Prevent authenticated users from visiting login/register
     if (!isLoading && isAuthenticated && PUBLIC_PATHS.includes(pathname)) {
        router.push('/');
     }
  }, [isLoading, isAuthenticated, pathname, router]);

  if (isLoading && !PUBLIC_PATHS.includes(pathname)) {
    return <AuthLoadingScreen><div /></AuthLoadingScreen>;
  }

  return <>{children}</>;
}
