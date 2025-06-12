import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { RewardType } from '@/types/type';

interface RewardCardProps {
  reward: RewardType;
  count?: number;
  onPress?: () => void;
}

export const RewardCard: React.FC<RewardCardProps> = ({ reward, count = 1, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name="gift" size={24} color={Colors.primary} />
        {count > 1 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{reward.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {reward.description}
        </Text>
        {reward.expiryDate && (
          <Text style={styles.expiryDate}>Expires: {new Date(reward.expiryDate).toLocaleDateString()}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  countBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 12,
    color: Colors.gray,
    fontStyle: 'italic',
  },
}); 