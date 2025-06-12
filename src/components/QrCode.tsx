import { Button, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg'

type Props = {
    isVisible: boolean;
    qrValue: string;
    onClose: () => void;
}

const QrCode = ({ isVisible, qrValue, onClose }: Props) => {
    return (
        <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Scan this QR Code</Text>
                    <QRCode value={qrValue} size={200} />
                    <Text style={{ marginTop: 20, fontSize: 16 }}>
                        {qrValue}
                    </Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default QrCode

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        width: 300,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "white",
        fontSize: 16,
    },
})