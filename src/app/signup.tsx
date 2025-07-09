import InputField from '@/components/InputField'
import SocialLoginButtons from '@/components/SocialLoginButtons'
import { Colors } from '@/constants/Colors'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/auth'
import { RegisterDto } from '@/types/auth'
import { NavigationUtils } from '@/utils/navigation'
import { Ionicons } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {}

const SignUpScreen = (props: Props) => {
  const { setUser, setLoading, setError, isLoading, error } = useAuthStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setFormError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsFormLoading(true);
    setError(null);

    try {
      const registerData: RegisterDto = {
        firstName,
        lastName,
        username,
        email,
        password,
      };

      const response = await authService.register(registerData);
      console.log('Registration successful:', response);

      // Set user in auth store
      await setUser(response);

      // Navigate to main app using safe navigation
      NavigationUtils.goToMainApp();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsFormLoading(false);
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
          headerTitle: 'Sign Up',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="close" size={24} color={Colors.black} />
            </TouchableOpacity>
          ),
        }} />
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <InputField
          placeholder='First Name'
          placeholderTextColor={Colors.gray}
          value={firstName}
          onChangeText={setFirstName}
        />
        <InputField
          placeholder='Last Name'
          placeholderTextColor={Colors.gray}
          value={lastName}
          onChangeText={setLastName}
        />
        <InputField
          placeholder='Username'
          placeholderTextColor={Colors.gray}
          value={username}
          onChangeText={setUsername}
          autoCapitalize='none'
        />
        <InputField
          placeholder='Email Address'
          placeholderTextColor={Colors.gray}
          autoCapitalize='none'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder='Password'
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <InputField
          placeholder='Confirm Password'
          placeholderTextColor={Colors.gray}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.btnText}>Create an Account</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account? {" "}
          <Link href={"/signin"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginTextSpan}>Login</Text>
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

export default SignUpScreen

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