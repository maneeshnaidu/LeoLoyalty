import InputField from '@/components/InputField'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import { Colors } from '@/constants/Colors'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/auth'
import { LoginDto } from '@/types/auth'
import { NavigationUtils } from '@/utils/navigation'
import { Ionicons } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setLoading, setError, isLoading, error } = useAuthStore();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const loginData: LoginDto = {
        username,
        password,
      };

      const response = await authService.login(loginData);
      console.log('Login successful:', response);

      // Set user in auth store
      await setUser(response);

      // Navigate to main app using safe navigation
      NavigationUtils.goToMainApp();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // Use safe back navigation
    NavigationUtils.goBack();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Signin',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <InputField
          placeholder='Username'
          placeholderTextColor={Colors.gray}
          autoCapitalize='none'
          value={username}
          onChangeText={setUsername}
        />
        <InputField
          placeholder='Password'
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.btnText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Don&apos;t have an account? {" "}
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginTextSpan}>Signup</Text>
            </TouchableOpacity>
          </Link>
        </Text>

        <View style={styles.divider} />
        <View style={styles.socialLoginWrapper} >
          <SocialLoginButtons emailHref={"/signin"} />
        </View>
      </View>
    </>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loginText: {
    marginBottom: 30,
    fontSize: 14,
    color: Colors.black,
    lineHeight: 24,
  },
  loginTextSpan: {
    color: Colors.primary,
    fontWeight: '600',
  },
  socialLoginWrapper: {
    alignSelf: "stretch",
    marginBottom: 10,
  },
  divider: {
    borderTopColor: Colors.gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '30%',
    marginBottom: 30,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
})