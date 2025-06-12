import { Colors } from '@/constants/Colors'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Vendor from './Vendor'
import { VendorType } from '@/types/type'
import { Outlet } from '@/types/outlet.types'
import { OutletCard } from './OutletCard'

type Props = {
    outlets: Outlet[];
    flatList: boolean;
}

const OutletList = ({ outlets, flatList = true }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>For you</Text>
                <TouchableOpacity>
                    <Text style={styles.titleButton}>See all</Text>
                </TouchableOpacity>
            </View>
            {flatList ? (
                <FlatList
                    data={outlets}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ index, item }) => (
                        <OutletCard item={item} />
                    )} />
            ) : (
                <View>
                    {outlets.map((item, index) => (
                        <View key={index}>
                            <OutletCard item={item} />
                        </View>
                    ))}
                </View>
            )}
        </View>
    )
}

export default OutletList

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
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
        marginHorizontal: 20,
    },
    titleButton: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.6,
        color: Colors.black,
    }
});