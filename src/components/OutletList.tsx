import { Colors } from '@/constants/Colors'
import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { OutletType } from '@/types'
import { OutletCard } from './OutletCard'
import { useOutlets } from '@/hooks/useOutlets'

type Props = {
    outlets: OutletType[];
    flatList: boolean;
}

const OutletList = ({ outlets, flatList = true }: Props) => {
    const { data, refetch } = useOutlets();

    useEffect(() => {
        refetch();
        // Optionally, you can log the fetched data:
        // console.log('Fetched Outlets:', data);
    }, []);

    // Use data from the hook if available, otherwise fallback to props
    const outletData = data ?? outlets;

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
                    data={outletData}
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