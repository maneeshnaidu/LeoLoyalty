import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {}

const FlashSale = (props: Props) => {
    const [timeUnits, setTimeUnits] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 2);
    saleEndDate.setHours(23, 59, 59);

    useEffect(() => {
        const calculateTimeUnits = (timeDifference: number) => {
            const seconds = Math.floor(timeDifference / 1000);
            setTimeUnits({
                days: Math.floor(seconds / (3600 * 24)),
                hours: Math.floor(seconds % (3600 * 24) / 3600),
                minutes: Math.floor(seconds % 3600 / 60),
                seconds: seconds % 60,
            });
        };

        const updateCountdown = () => {
            const currentTime = new Date().getTime();
            const expiryTime = saleEndDate.getTime();
            const timeDifference = expiryTime - currentTime;
            calculateTimeUnits(timeDifference);

            if (timeDifference <= 0) {
                calculateTimeUnits(0);
            } else {
                calculateTimeUnits(timeDifference);
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time: number) => {
        return time.toString().padStart(2, '0');
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <View style={styles.timerWrapper}>
                    <Text style={styles.title}>Flash Sale</Text>
                    <View style={styles.timer}>
                        <Ionicons name="time-outline" size={16} color={Colors.black} />
                        <Text style={styles.timerText}>{`${formatTime(timeUnits.days)}:${formatTime(timeUnits.hours)}:${formatTime(timeUnits.minutes)}:${formatTime(timeUnits.seconds)}`}</Text>
                    </View>

                </View>
                <TouchableOpacity>
                    <Text style={styles.titleButton}>See all</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FlashSale

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
    },
    titleButton: {
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.6,
        color: Colors.black,
    },
    timerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    timer: {
        flexDirection: 'row',
        gap: 5,
        backgroundColor: Colors.highlight,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 12,
        alignItems: 'center',
    },
    timerText: {
        fontWeight: '500',
        color: Colors.black,
    }
})