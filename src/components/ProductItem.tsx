import { Colors } from '@/constants/Colors';
import { ProductType } from '@/types'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    item: ProductType;
}

const width = Dimensions.get('window').width - 40;

const ProductItem = ({ item }: Props) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <TouchableOpacity style={styles.bookmark}>
                <Ionicons name="heart-outline" size={22} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    container: {
        // width: width / 2 - 10,
        width: '100%',
    },
    productImage: {
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
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
        letterSpacing: 0.5,
    }
})