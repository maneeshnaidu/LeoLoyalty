import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '@/store/auth.store';
import { validateAuthState } from '@/utils/auth.utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define public routes that don't require authentication
const PUBLIC_ROUTES = ['outlet-details'];

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const segments = useSegments();
  const router = useRouter();
  const { user, setUser, refreshToken } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we have stored auth data
        const storedAuth = await AsyncStorage.getItem('auth-storage');
        if (!storedAuth) return;

        const parsedAuth = JSON.parse(storedAuth);
        const storedUser = parsedAuth.state.user;

        if (!storedUser) return;

        // Validate the stored auth state
        const isValid = validateAuthState(storedUser);
        
        if (isValid) {
          // If valid, set the user in the store
          setUser(storedUser);
        } else if (storedUser.refreshToken) {
          // If access token is invalid but we have a refresh token, try to refresh
          const refreshSuccess = await refreshToken();
          if (!refreshSuccess) {
            setUser(null);
          }
        } else {
          // If no valid tokens, clear the user
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';
    const isPublicRoute = PUBLIC_ROUTES.includes(segments[0]);

    // Handle authentication and routing
    if (!user) {
      // If user is not authenticated
      if (inAuthGroup && !isPublicRoute) {
        // Redirect to sign-in if trying to access protected route
        router.replace('/');
      }
    } else {
      // If user is authenticated
      if (!inAuthGroup && !isPublicRoute) {
        // Redirect to main app if on non-protected route
        router.replace('/(tabs)');
      }
    }
  }, [user, segments]);

  return <>{children}</>;
}; 