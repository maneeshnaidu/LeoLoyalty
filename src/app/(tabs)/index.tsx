import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'
import { Colors } from '@/constants/Colors'
import OutletList from '@/components/OutletList'
import { useOutlets } from '@/hooks/useOutlets'
import LoyaltyCardsSlider from '@/components/LoyaltyCardsSlider'
import { useLoyaltyPoints } from '@/hooks/useLoyaltyPoints'
import QrCode from '@/components/QrCode'
import { useAuthStore } from '@/store/auth'
import { Ionicons } from '@expo/vector-icons'
import { useRewards } from '@/hooks/useRewards'
import { RewardCard } from '@/components/RewardCard'

const HomeScreen = () => {
  const { user, isHydrated } = useAuthStore();
  const [isQrVisible, setIsQrVisible] = useState(false);

  const { data: outlets, isLoading: outletsLoading, error: outletsError } = useOutlets(undefined, { enabled: !!user && isHydrated });
  const { data: loyaltyPoints, isLoading: loyaltyLoading, error: loyaltyError } = useLoyaltyPoints(undefined, { enabled: !!user && isHydrated });
  const { data: rewards, isLoading: rewardsLoading, error: rewardsError } = useRewards(undefined, { enabled: !!user && isHydrated });

  const groupedRewards = rewards?.reduce((acc, reward) => {
    const existingReward = acc.find(r => r.id === reward.id);
    if (existingReward) {
      existingReward.count = (existingReward.count || 1) + 1;
    } else {
      acc.push({ ...reward, count: 1 });
    }
    return acc;
  }, [] as (typeof rewards[0] & { count: number })[]) || [];

  if (!isHydrated) return null;
  if (!user) return null; // Or a loading spinner

  if (outletsLoading || loyaltyLoading || rewardsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (outletsError || loyaltyError || rewardsError) {
    return (
      <View style={styles.container}>
        <Text>Error: {outletsError?.message || loyaltyError?.message || rewardsError?.message || 'Failed to load data'}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        header: () => <Header />,
      }} />
      <ScrollView>
        <View style={styles.container}>
          <LoyaltyCardsSlider cards={loyaltyPoints || []} />

          {groupedRewards.length > 0 && (
            <View style={styles.rewardsSection}>
              <Text style={styles.sectionTitle}>Your Rewards</Text>
              {groupedRewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  count={reward.count}
                  onPress={() => {
                    // Handle reward press
                  }}
                />
              ))}
            </View>
          )}

          <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
            <Image
              source={require('@/assets/images/sale-banner.jpg')}
              style={{ width: "100%", height: 150, borderRadius: 15 }} />
          </View>

          <OutletList
            outlets={outlets || []}
            flatList={false}
          />

          <View style={styles.qrSection}>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => setIsQrVisible(true)}
            >
              <Ionicons name="qr-code-outline" size={24} color={Colors.white} />
              <Text style={styles.qrButtonText}>Show My QR Code</Text>
            </TouchableOpacity>
          </View>

          <QrCode
            isVisible={isQrVisible}
            qrValue={user?.userCode?.toString() || ''}
            onClose={() => setIsQrVisible(false)}
          />
        </View>
      </ScrollView>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rewardsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
  },
  qrSection: {
    padding: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    gap: 10,
    width: '100%',
  },
  qrButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

