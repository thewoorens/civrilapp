import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const pharmacies = [
    {
        name: 'Serkan Eczanesi',
        address: 'YAVRUTURNA BAHABEY CAD. No:120 -C',
        phone: '03642241351',
        logo: 'https://img.icons8.com/ios/50/4a90e2/pharmacy-shop.png',
    },
    {
        name: 'Sedef Eczanesi',
        address: 'GÜLABİBEY MAH. BAĞCILAR 41. SOK. NO : 13 / A',
        phone: '03642216444',
        logo: 'https://img.icons8.com/ios/50/4a90e2/pharmacy-shop.png',
    },
    {
        name: 'Gökmen Eczanesi',
        address: 'ULUKAVAK TARAKCI 8. No:18 -A',
        phone: '03647770477',
        logo: 'https://img.icons8.com/ios/50/4a90e2/pharmacy-shop.png',
    },
];

const PharmacyOnCallScreen = () => {
    const callPharmacy = (phone) => {
        const url = `tel:${phone}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    alert('Telefon araması desteklenmiyor.');
                }
            })
            .catch((err) => console.error('Telefon bağlantı hatası:', err));
    };

    const openMap = (address) => {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    alert('Harita bağlantısı desteklenmiyor.');
                }
            })
            .catch((err) => console.error('Harita bağlantı hatası:', err));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Nöbetçi Eczaneler</Text>
            <Text style={styles.info}>
                Bazı eczaneler gece boyu nöbet tutmuyor olabilir. Gitmeden önce telefonla teyit etmeniz önerilir.
            </Text>
            {pharmacies.map((pharmacy, index) => (
                <View key={index} style={styles.card}>
                    <Image source={{ uri: pharmacy.logo }} style={styles.logo} />
                    <View style={styles.details}>
                        <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                        <Text style={styles.address}>{pharmacy.address}</Text>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.button, styles.callButton]}
                            onPress={() => callPharmacy(pharmacy.phone)}
                        >
                            <Icon name="phone" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.mapButton]}
                            onPress={() => openMap(pharmacy.address)}
                        >
                            <Icon name="map" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1E88E5',
        marginBottom: 12,
    },
    info: {
        fontSize: 14,
        color: '#6D6D6D',
        marginBottom: 20,
        lineHeight: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    pharmacyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    address: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 6,
        padding: 10,
        marginLeft: 8,
    },
    callButton: {
        backgroundColor: '#4CAF50',
    },
    mapButton: {
        backgroundColor: '#2196F3',
    },
});

export default PharmacyOnCallScreen;