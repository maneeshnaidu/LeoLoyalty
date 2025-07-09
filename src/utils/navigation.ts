import { router } from 'expo-router';

export class NavigationUtils {
  /**
   * Safely navigate to a route, handling potential navigation errors
   */
  static safeNavigate(route: string, options?: { replace?: boolean }) {
    try {
      if (options?.replace) {
        router.replace(route as any);
      } else {
        router.push(route as any);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation
      try {
        router.replace(route as any);
      } catch (fallbackError) {
        console.error('Fallback navigation failed:', fallbackError);
      }
    }
  }

  /**
   * Navigate to signin screen
   */
  static goToSignin() {
    this.safeNavigate('/signin', { replace: true });
  }

  /**
   * Navigate to signup screen
   */
  static goToSignup() {
    this.safeNavigate('/signup', { replace: true });
  }

  /**
   * Navigate to main app tabs
   */
  static goToMainApp() {
    this.safeNavigate('/(tabs)', { replace: true });
  }

  /**
   * Navigate to welcome screen
   */
  static goToWelcome() {
    this.safeNavigate('/', { replace: true });
  }

  /**
   * Safely go back
   */
  static goBack() {
    try {
      router.back();
    } catch (error) {
      console.error('Back navigation error:', error);
      // Fallback to welcome screen
      this.goToWelcome();
    }
  }

  /**
   * Safely dismiss all screens and navigate
   */
  static dismissAndNavigate(route: string) {
    try {
      router.dismissAll();
      router.push(route as any);
    } catch (error) {
      console.error('Dismiss and navigate error:', error);
      // Fallback to replace
      this.safeNavigate(route, { replace: true });
    }
  }
} 