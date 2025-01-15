import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Surveys = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Anketler</Text>
        </View>

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
        color: 'green',
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default Surveys;