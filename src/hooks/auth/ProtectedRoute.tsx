'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AuthLoadingScreen from '@/components/layout/AuthLoadingScreen';
import { useAuth } from './useAuth';

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'];

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !PUBLIC_PATHS.includes(pathname)) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  // Show loading screen while checking auth
  if (isLoading && !PUBLIC_PATHS.includes(pathname)) {
    return (
      <AuthLoadingScreen>
        <div />
      </AuthLoadingScreen>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated && !PUBLIC_PATHS.includes(pathname)) {
    return null;
  }

  // Prevent authenticated users from accessing public pages
  if (isAuthenticated && PUBLIC_PATHS.includes(pathname)) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
}
