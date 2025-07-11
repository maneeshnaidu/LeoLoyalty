import React, { useState, useRef } from 'react'
import { StyleSheet, FlatList, View, Image, Dimensions, ViewToken } from 'react-native'
import Pagination from '@/components/Pagination';

type Props = {
    imageList: string[];
};

const width = Dimensions.get('screen').width;

const ImageSlider = ({ imageList = [] }: Props) => {
    const [paginationIndex, setPaginationIndex] = useState(0);

    const onViewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: ViewToken[];
    }) => {
        if (
            viewableItems[0].index !== undefined &&
            viewableItems[0].index !== null &&
            viewableItems.length > 0
        ) {
            setPaginationIndex(viewableItems[0].index);
        }

    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    };

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged }
    ]);

    return (
        <View>
            <FlatList
                data={imageList}
                renderItem={({ item }) => (
                    <View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: item }} style={{ width: 300, height: 300, borderRadius: 10 }} />
                    </View>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEventThrottle={16}
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
            />
            <Pagination items={imageList} paginationIndex={paginationIndex} />
        </View>

    )
}

export default ImageSlider

const styles = StyleSheet.create({})