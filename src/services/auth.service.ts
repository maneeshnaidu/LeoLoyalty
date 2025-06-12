import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api.config';
import { LoginDto, LoginResponse, RegisterDto } from '../types/auth.types';
import { useAuthStore } from '../store/auth.store';
import { router } from 'expo-router';

const AUTH_TOKEN_KEY = '@auth_token';
const REFRESH_TOKEN_KEY = '@refresh_token';

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async setTokens(token: string, refreshToken: string) {
    this.token = token;
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  async getToken(): Promise<string | null> {
    if (!this.token) {
      this.token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    }
    return this.token;
  }

  async login(credentials: LoginDto): Promise<LoginResponse> {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
        credentials,
        { headers: API_CONFIG.HEADERS }
      );
      const data = response.data;
      await this.setTokens(data.token, data.refreshToken);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(credentials: RegisterDto): Promise<LoginResponse> {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`,
        credentials,
        { headers: API_CONFIG.HEADERS }
      );
      const data = response.data;
      await this.setTokens(data.token, data.refreshToken);
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      const token = await this.getToken();
      if (token) {
        await axios.post(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`,
          {},
          { 
            headers: {
              ...API_CONFIG.HEADERS,
              'Authorization': `Bearer ${token}`
            }
          }
        );
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY]);
      useAuthStore.getState().logout();
      router.replace('/signin');
    }
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      return new Error(error.response?.data?.message || 'An error occurred');
    }
    return error;
  }
}

export default AuthService.getInstance(); 