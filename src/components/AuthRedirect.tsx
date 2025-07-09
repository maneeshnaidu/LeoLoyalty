import { useAuthStore } from '@/store/auth';
import { NavigationUtils } from '@/utils/navigation';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

interface AuthRedirectProps {
    redirectTo?: '/(tabs)' | '/signin' | '/signup' | '/';
    requireAuth?: boolean;
}

export const AuthRedirect = ({ redirectTo = '/(tabs)', requireAuth = true }: AuthRedirectProps) => {
    const { user, isHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isHydrated) return;

        if (requireAuth && !user) {
            // Redirect to signin if authentication is required but user is not authenticated
            NavigationUtils.goToSignin();
        } else if (!requireAuth && user) {
            // Redirect to main app if user is authenticated but shouldn't be on this page
            if (redirectTo === '/(tabs)') {
                NavigationUtils.goToMainApp();
            } else if (redirectTo === '/signin') {
                NavigationUtils.goToSignin();
            } else if (redirectTo === '/signup') {
                NavigationUtils.goToSignup();
            } else {
                NavigationUtils.goToWelcome();
            }
        }
    }, [user, isHydrated, requireAuth, redirectTo]);

    return null;
}; 