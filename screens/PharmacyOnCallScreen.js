import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';

const PharmacyOnCallScreen = () => {

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Nöbetçi </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green'
    },
});

export default PharmacyOnCallScreen;
