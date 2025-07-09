import AsyncStorage from '@react-native-async-storage/async-storage';

class TokenService {
    private static instance: TokenService;
    private token: string | null = null;
    private refreshToken: string | null = null;
    private isInitialized: boolean = false;

    private constructor() { }

    static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    async initialize(): Promise<{ token: string | null; refreshToken: string | null }> {
        if (this.isInitialized) {
            return { token: this.token, refreshToken: this.refreshToken };
        }

        try {
            const storedTokens = await AsyncStorage.getItem('auth-tokens');
            if (storedTokens) {
                const { token, refreshToken } = JSON.parse(storedTokens);
                this.token = token;
                this.refreshToken = refreshToken;
            }
            this.isInitialized = true;
            return { token: this.token, refreshToken: this.refreshToken };
        } catch (error) {
            console.error('Error initializing tokens:', error);
            this.isInitialized = true;
            return { token: null, refreshToken: null };
        }
    }

    getToken(): string | null {
        return this.token;
    }

    getRefreshToken(): string | null {
        return this.refreshToken;
    }

    async setTokens(token: string, refreshToken: string) {
        this.token = token;
        this.refreshToken = refreshToken;
        try {
            await AsyncStorage.setItem('auth-tokens', JSON.stringify({ token, refreshToken }));
        } catch (error) {
            console.error('Error storing tokens:', error);
        }
    }

    async clearTokens() {
        this.token = null;
        this.refreshToken = null;
        try {
            await AsyncStorage.removeItem('auth-tokens');
        } catch (error) {
            console.error('Error clearing tokens:', error);
        }
    }

    hasValidTokens(): boolean {
        return !!(this.token && this.refreshToken);
    }
}

export const tokenService = TokenService.getInstance(); 