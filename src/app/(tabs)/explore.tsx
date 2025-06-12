import { FlatList, StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useOutlets } from '@/hooks/useOutlets'
import { OutletCard } from '@/components/OutletCard'
import { Outlet } from '@/types/outlet.types'

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: outlets, isLoading, error } = useOutlets(searchQuery);
  const headerHeight = useHeaderHeight();

  if (isLoading) {
    return (
      <View style={[styles.container, { marginTop: headerHeight, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { marginTop: headerHeight, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.errorText}>Error loading outlets</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTransparent: true,
      }} />
      <View style={[styles.container, { marginTop: headerHeight }]}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={Colors.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.gray} />
            </TouchableOpacity>
          ) : null}
        </View>

        <FlatList<Outlet>
          data={outlets || []}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <OutletCard item={item} />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No outlets found</Text>
            </View>
          }
        />
      </View>
    </>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray,
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
  },
});