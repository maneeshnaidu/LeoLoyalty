import { Colors } from '@/constants/Colors';
import { NavigationUtils } from '@/utils/navigation';
import React, { Component, ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: string | null;
}

export class NavigationErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        // Check if it's a navigation error
        if (error.message.includes('POP_TO_TOP') || 
            error.message.includes('navigation') || 
            error.message.includes('route')) {
            return { hasError: true, error: error.message };
        }
        // Let other error boundaries handle non-navigation errors
        return { hasError: false, error: null };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Navigation Error Boundary caught an error:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    handleGoHome = () => {
        this.setState({ hasError: false, error: null });
        NavigationUtils.goToWelcome();
    };

    handleGoToSignin = () => {
        this.setState({ hasError: false, error: null });
        NavigationUtils.goToSignin();
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Navigation Error</Text>
                    <Text style={styles.message}>
                        {this.state.error || 'A navigation error occurred.'}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
                            <Text style={styles.buttonText}>Retry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.homeButton} onPress={this.handleGoHome}>
                            <Text style={styles.buttonText}>Go Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signinButton} onPress={this.handleGoToSignin}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        color: Colors.gray,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    buttonContainer: {
        flexDirection: 'column',
        gap: 15,
        width: '100%',
    },
    retryButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    homeButton: {
        backgroundColor: Colors.gray,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    signinButton: {
        backgroundColor: '#FF6B6B',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
}); 