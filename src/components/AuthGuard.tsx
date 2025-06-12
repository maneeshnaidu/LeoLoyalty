import React, { useEffect } from 'react';
import { Redirect, useRouter } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';
import { validateAuthState, isTokenValid } from '@/utils/auth.utils';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, setUser, refreshToken } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        router.replace('/');
        return;
      }

      // If access token is invalid but refresh token is valid, try to refresh
      if (!isTokenValid(user.token) && user.refreshToken) {
        const refreshSuccess = await refreshToken();
        if (!refreshSuccess) {
          setUser(null);
          router.replace('/');
          return;
        }
      }

      const isValid = validateAuthState(user);
      if (!isValid) {
        setUser(null);
        router.replace('/');
      }
    };

    checkAuth();
  }, [user, router, setUser, refreshToken]);

  if (!user) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
}; 