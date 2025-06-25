import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Href, Link } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

type Props = {
    emailHref: Href;
}

const SocialLoginButtons = (props: Props) => {
    const { emailHref } = props;

    return (
        <>
            <Animated.View entering={FadeInDown.delay(500).duration(500)}>
                <Link href={emailHref as any} asChild>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color={Colors.black}
                        />
                        <Text style={styles.btnText}>Continue with Email</Text>
                    </TouchableOpacity>
                </Link>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(700).duration(500)}>
                <Link href={emailHref as any} asChild>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons
                            name="logo-google"
                            size={20}
                            color={Colors.black}
                        />
                        <Text style={styles.btnText}>Continue with Google</Text>
                    </TouchableOpacity>
                </Link>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(1100).duration(500)}>
                <Link href={"/signin"} asChild>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons
                            name="logo-apple"
                            size={20}
                            color={Colors.black}
                        />
                        <Text style={styles.btnText}>Continue with Apple</Text>
                    </TouchableOpacity>
                </Link>
            </Animated.View>

        </>
    )
}

export default SocialLoginButtons

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        flex: 1,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "flex-end",
    },
    wrapper: {
        paddingBottom: 50,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.primary,
        letterSpacing: 2.4,
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: Colors.gray,
        letterSpacing: 1.2,
        lineHeight: 30,
        marginBottom: 20,
    },
    socialLoginWrapper: {
        alignSelf: "stretch",
        marginBottom: 10,
    },
    button: {
        flexDirection: "row",
        padding: 10,
        borderColor: Colors.gray,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        marginBottom: 15,
    },
    btnText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
    },
    loginText: {
        marginTop: 30,
        fontSize: 14,
        color: Colors.black,
        lineHeight: 24,
    },
    loginTextSpan: {
        color: Colors.primary,
        fontWeight: '600',
    }
});