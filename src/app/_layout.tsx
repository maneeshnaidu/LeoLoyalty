import { AuthInitializer } from '@/components/AuthInitializer';
import { QueryProvider } from '@/providers/QueryProvider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <AuthInitializer>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="outlet-details/[id]" options={{ headerShown: true }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signin" options={{ presentation: 'modal', headerShown: true }} />
          <Stack.Screen name="signup" options={{ presentation: 'modal', headerShown: true }} />
        </Stack>
      </AuthInitializer>
    </QueryProvider>
  );
}