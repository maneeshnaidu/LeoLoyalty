import { LoyaltyCardType } from '@/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    card: LoyaltyCardType;
};

const LoyaltyCard = ({ card }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.vendorName}>{card.vendorName}</Text>
                <Text style={styles.pointsText}>{card.points} Points</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: 220,
    },
    card: {
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    vendorName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
    },
    pointsText: {
        fontSize: 18,
        color: '#4A90E2',
        fontWeight: '600',
    },
});

export default LoyaltyCard;

// Example usage:
// <LoyaltyCard points={3} maxPoints={5} />
// You can change points dynamically based on user rewards!
