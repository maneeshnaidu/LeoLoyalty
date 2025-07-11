import { Colors } from '@/constants/Colors';
import { LoyaltyCardType } from '@/types';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoyaltyCard from './LoyaltyCard';

type Props = {
    cards: LoyaltyCardType[];
};

const LoyaltyCardsSlider = ({ cards }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Your Loyalty Cards</Text>
                <TouchableOpacity>
                    <Text style={styles.titleButton}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={cards}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <LoyaltyCard card={item} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
    },
    titleButton: {
        fontSize: 14,
        color: Colors.black,
    },
});

export default LoyaltyCardsSlider; 