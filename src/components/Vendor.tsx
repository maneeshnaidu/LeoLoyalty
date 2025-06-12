import { Colors } from '@/constants/Colors';
import { VendorType } from '@/types/type';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Props = {
    item: VendorType;
    index: number;
}

const Vendor = ({ item, index }: Props) => {
    return (
        <Link href={`/vendor-details/${item.id}`} asChild>
            <TouchableOpacity>
                <Animated.View style={styles.container} entering={FadeInDown.delay(300 + index * 100).duration(500)}>
                    <Image source={{ uri: item.images[0] }} style={styles.vendorImage} />
                    <TouchableOpacity style={styles.bookmark}>
                        <Ionicons name="heart-outline" size={22} color="black" />
                    </TouchableOpacity>
                    <View style={styles.vendorInfo}>
                        <Text style={styles.title}>{item.name}</Text>
                        <View style={styles.rewardWrapper}>
                            <Ionicons name="star" size={20} color={'#D4AF37'} />
                            <Text style={styles.reward}>9</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{item.address}</Text>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    )
}

export default Vendor

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    vendorImage: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 10,
    },
    bookmark: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        padding: 5,
        borderRadius: 50,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.primary,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
        letterSpacing: 0.5,
        marginBottom: 10,
    },
    vendorInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    rewardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    reward: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.gray
    },
})