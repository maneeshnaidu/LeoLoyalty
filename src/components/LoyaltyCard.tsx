import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LoyaltyCardType } from '@/types/type';

type Props = {
    card: LoyaltyCardType;
};

const LoyaltyCard = ({ card }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.vendorInfo}>
                    <Image 
                        source={{ uri: card.vendorLogo }} 
                        style={styles.vendorLogo}
                        resizeMode="contain"
                    />
                    <Text style={styles.vendorName}>{card.vendorName}</Text>
                </View>
                <View style={styles.starsContainer}>
                    {Array.from({ length: card.maxPoints }).map((_, index) => (
                        <AntDesign
                            key={index}
                            name={index < card.points ? 'star' : 'staro'}
                            size={24}
                            color={index < card.points ? '#FFD700' : '#CCCCCC'}
                        />
                    ))}
                </View>
                <Text style={styles.pointsText}>{card.points} / {card.maxPoints} Points</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: 280,
    },
    card: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    vendorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    vendorLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    vendorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    pointsText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

export default LoyaltyCard;

// Example usage:
// <LoyaltyCard points={3} maxPoints={5} />
// You can change points dynamically based on user rewards!
