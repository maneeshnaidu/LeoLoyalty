export const API_CONFIG = {
  BASE_URL: 'https://plum-api-2cre.onrender.com/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH_TOKEN: '/auth/refresh-token',
      LOGOUT: '/auth/logout',
    },
  },
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}; 