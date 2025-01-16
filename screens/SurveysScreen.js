import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';

const SurveysScreen = () => {

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Anketler</Text>
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

export default SurveysScreen;
