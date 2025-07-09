import { Colors } from '@/constants/Colors';
import { tokenService } from '@/services/token';
import { useAuthStore } from '@/store/auth';
import { AuthDebugUtils } from '@/utils/authDebug';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const AuthDebug = () => {
    const { user, isLoading, isHydrated, error } = useAuthStore();
    const [tokenInfo, setTokenInfo] = useState<{ token: string | null; refreshToken: string | null }>({ token: null, refreshToken: null });

    useEffect(() => {
        const getTokenInfo = async () => {
            const token = tokenService.getToken();
            const refreshToken = tokenService.getRefreshToken();
            setTokenInfo({ token, refreshToken });
        };
        getTokenInfo();
    }, [user]);

    if (!__DEV__) return null; // Only show in development

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Auth Debug</Text>
            <Text style={styles.text}>Hydrated: {isHydrated ? 'Yes' : 'No'}</Text>
            <Text style={styles.text}>Loading: {isLoading ? 'Yes' : 'No'}</Text>
            <Text style={styles.text}>User: {user ? 'Present' : 'None'}</Text>
            <Text style={styles.text}>Token: {tokenInfo.token ? 'Present' : 'None'}</Text>
            <Text style={styles.text}>Refresh Token: {tokenInfo.refreshToken ? 'Present' : 'None'}</Text>
            {error && <Text style={styles.error}>Error: {error}</Text>}
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => {
                        console.log('Auth Debug - Current State:', {
                            user,
                            isLoading,
                            isHydrated,
                            error,
                            tokenInfo
                        });
                    }}
                >
                    <Text style={styles.buttonText}>Log State</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.button, styles.clearButton]} 
                    onPress={() => AuthDebugUtils.clearAllAuthData()}
                >
                    <Text style={styles.buttonText}>Clear Auth</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.button, styles.reinitButton]} 
                    onPress={() => AuthDebugUtils.forceReinitialize()}
                >
                    <Text style={styles.buttonText}>Reinit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.9)',
        padding: 15,
        borderRadius: 8,
        zIndex: 1000,
    },
    title: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 12,
        marginBottom: 5,
    },
    error: {
        color: '#FF6B6B',
        fontSize: 12,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        flex: 1,
    },
    clearButton: {
        backgroundColor: '#FF6B6B',
    },
    reinitButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
}); 