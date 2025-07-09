import { useAuthStore } from '@/store/auth';
import { useSegments } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const NavigationDebug = () => {
    const segments = useSegments();
    const { user, isHydrated } = useAuthStore();

    if (!__DEV__) return null; // Only show in development

    return (
        <View style={styles.debugContainer}>
            <Text style={styles.debugText}>Segments: {JSON.stringify(segments)}</Text>
            <Text style={styles.debugText}>User: {user ? 'Authenticated' : 'Not authenticated'}</Text>
            <Text style={styles.debugText}>Hydrated: {isHydrated ? 'Yes' : 'No'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    debugContainer: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
    },
    debugText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'monospace',
    },
}); 