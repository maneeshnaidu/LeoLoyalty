import { StyleSheet, View, Image, ScrollView, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useOutlet } from '@/hooks/useOutlet';
import { Colors } from '@/constants/Colors';
import React from 'react';

export default function OutletDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: outlet, isLoading, error } = useOutlet(Number(id));

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error || !outlet) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error instanceof Error ? error.message : 'Outlet not found'}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: outlet.name,
          headerTitleAlign: 'center',
          headerBackVisible: true,
          headerBackTitle: 'Back',
          headerTintColor: Colors.black,
        }}
      />
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: outlet.coverImageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.name}>{outlet.name}</Text>
          <Text style={styles.category}>{outlet.category}</Text>
          <Text style={styles.description}>{outlet.description}</Text>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.infoText}>{outlet.address}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text style={styles.infoText}>{outlet.phoneNumber}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24,
    lineHeight: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
}); 