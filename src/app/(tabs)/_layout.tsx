import { TabBar } from '@/components/TabBar';
import { Tabs } from "expo-router";
import React from 'react';

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
                }}
            />
            <Tabs.Screen
                name='explore'
                options={{
                    title: 'Explore',
                }}
            />
            <Tabs.Screen
                name='notifications'
                options={{
                    title: 'Notification',
                }}
            />
            <Tabs.Screen
                name='favorites'
                options={{
                    title: 'Favorites',
                    // tabBarBadge: 3,
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: true,
                    headerTitle: '',
                }}
            />
        </Tabs>
    );
}