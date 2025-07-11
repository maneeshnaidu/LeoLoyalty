import { useAuthStore } from '@/store/auth';
import { validateAuthState } from '@/utils/jwt';
import { useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { LoadingScreen } from './LoadingScreen';

// Define public routes that don't require authentication
const PUBLIC_ROUTES = ['/', 'signin', 'signup'];

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
    const segments = useSegments();
    const router = useRouter();
    const { user, setUser, refreshToken, isLoading, isHydrated } = useAuthStore();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                if (!user) return;

                // Validate the current auth state
                const isValid = validateAuthState(user);

                if (isValid) {
                    // If valid, keep the user in the store
                    return;
                } else if (user.refreshToken) {
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

        if (isHydrated) {
            initializeAuth();
        }
    }, [refreshToken, setUser, user, isHydrated]);

    useEffect(() => {
        if (!isHydrated) return;

        const inAuthGroup = segments[0] === '(tabs)';
        const isPublicRoute = PUBLIC_ROUTES.includes(segments[0] ?? '');

        // console.log('AuthInitializer:', { user, segments, inAuthGroup, isPublicRoute });

        if (!user) {
            if (inAuthGroup) {
                router.replace('../signin');
            }
        } else {
            if (!inAuthGroup && !isPublicRoute) {
                router.replace('/(tabs)');
            }
        }
    }, [user, segments, router, isHydrated]);

    if (!isHydrated || isLoading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
};