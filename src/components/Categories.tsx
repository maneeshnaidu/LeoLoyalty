import { Colors } from '@/constants/Colors';
import { CategoryType } from '@/types';
import React from 'react'
import { FlatList, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    categories: CategoryType[];
}

const Categories = ({ categories }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Categories</Text>
                <TouchableOpacity>
                    <Text style={styles.titleButton}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ index, item }) => (
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )} />
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.6,
        color: Colors.black,
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    titleButton: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.6,
        color: Colors.black,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: Colors.lightGray
    },
    item: {
        marginVertical: 10,
        marginLeft: 20,
        gap: 5,
        alignItems: 'center',
    }
})