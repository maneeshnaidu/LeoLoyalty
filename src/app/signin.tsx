import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import { Ionicons } from '@expo/vector-icons'
import InputField from '@/components/InputField'
import authService from '@/services/auth.service'
import { LoginDto } from '@/types/auth.types'
import { useAuthStore } from '@/store/auth.store'

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
      setUser(response);
      
      // Navigate to main app
      router.dismissAll();
      router.push('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Signin',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
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
          Don't have an account? {" "}
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