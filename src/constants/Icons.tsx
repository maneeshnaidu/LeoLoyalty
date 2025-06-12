import { Ionicons } from '@expo/vector-icons';

export const icon = {
    index: ({ color }: { color: string }) => (
        <Ionicons name="home-outline" size={22} color={color} />
    ),
    explore: ({ color }: { color: string }) => (
        <Ionicons name="search-outline" size={22} color={color} />
    ),
    notifications: ({ color }: { color: string }) => (
        <Ionicons name="notifications-outline" size={22} color={color} />
    ),
    favorites: ({ color }: { color: string }) => (
        <Ionicons name="heart-outline" size={22} color={color} />
    ),
    profile: ({ color }: { color: string }) => (
        <Ionicons name="person-outline" size={22} color={color} />
    ),
};