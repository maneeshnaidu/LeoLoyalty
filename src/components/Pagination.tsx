import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';

type Props = {
    items: string[];
    paginationIndex: number;
}

const Pagination = ({ items, paginationIndex }: Props) => {
    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <View
                    key={index}
                    style={[
                        styles.paginationDots,
                        { backgroundColor: paginationIndex === index ? Colors.primary : '#ccc' }
                    ]} />
            ))}

        </View>
    )
}

export default Pagination

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationDots: {
        width: 30,
        height: 4,
        margin: 3,
        borderRadius: 5,
        backgroundColor: '#ccc',
    }
})