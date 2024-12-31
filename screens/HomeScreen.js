import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CivrilSlider from '../components/Slider/CivrilSlider';

const { width } = Dimensions.get('window');
const cardSize = (width - 40) / 3; 

const HomeScreen = () => {
    const cards = [
        { title: 'Card 1', description: 'Description for card 1' },
        { title: 'Card 2', description: 'Description for card 2' },
        { title: 'Card 3', description: 'Description for card 3' },
        { title: 'Card 4', description: 'Description for card 4' },
        { title: 'Card 5', description: 'Description for card 5' },
        { title: 'Card 6', description: 'Description for card 6' }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <CivrilSlider />
            <View style={styles.cardsContainer}>
                {cards.slice(0, 3).map((card, index) => (
                    <TouchableOpacity activeOpacity={5} key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardDescription}>{card.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.cardsContainer}>
                {cards.slice(3).map((card, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        <Text style={styles.cardDescription}>{card.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    card: {
        backgroundColor: '#f8f8f8',
        width: cardSize,
        height: cardSize,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});

export default HomeScreen;