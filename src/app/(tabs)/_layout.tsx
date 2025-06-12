import React from 'react';
import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { TabBar } from '@/components/TabBar';

export default function TabLayout() {
  return (
    <Tabs 
      tabBar={props => <TabBar {...props} />} 
      screenOptions={{ 
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name='index' 
        options={{
          title: 'Home',
          href: '/',
        }} 
      />
      <Tabs.Screen 
        name='explore' 
        options={{
          title: 'Explore',
          href: '/explore',
        }} 
      />
      <Tabs.Screen 
        name='notifications' 
        options={{
          title: 'Notification',
          href: '/notifications',
        }} 
      />
      <Tabs.Screen 
        name='favorites' 
        options={{
          title: 'Favorites',
          tabBarBadge: 3,
          href: '/favorites',
        }} 
      />
      <Tabs.Screen 
        name='profile' 
        options={{
          title: 'Profile',
          href: '/profile',
        }} 
      />
    </Tabs>
  );
}