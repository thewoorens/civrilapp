import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CivrilSlider from '../components/Slider/CivrilSlider';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const {width} = Dimensions.get('window');
const cardSize = (width - 40) / 3;

const HomeScreen = () => {
    const weather = "Güneşli"; // Example weather variable, replace with actual data
    const weatherIcon = weather === "Güneşli" ? "sunny" : "Yağmurlu" ? "rainy-outline" : "cloudy";
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
                <Text style={{fontSize: 20}}>Hava Durumu: </Text>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>20&deg;C</Text>
                <Ionicons name={weatherIcon} size={40} style={{
                    marginLeft: 10,
                    color: weather === "Güneşli" ? 'orange' : weather === "Yağmurlu" ? 'blue' : 'gray'
                }}/>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}> {weather}</Text>
            </View>
            <CivrilSlider/>
            <ScrollView contentContainerStyle={{flexGrow: 1}} scrollEnabled={true}>
                <View style={styles.cardsContainer}>
                    <TouchableOpacity activeOpacity={5} style={styles.card}>
                        <Text style={styles.cardIcon}><MaterialCommunityIcons name={"pill"} size={34}/></Text>
                        <Text style={styles.cardTitle}>Nöbetçi Eczaneler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={5} style={styles.card}>
                        <Text style={styles.cardIcon}><Ionicons name={"water-outline"} size={34}/></Text>
                        <Text style={styles.cardTitle}>Su Kesinti Listesi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={5} style={styles.card}>
                        <Text style={styles.cardIcon}><Ionicons name={"reader-outline"} size={34}/></Text>
                        <Text style={styles.cardTitle}>Anketler</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardsContainer}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.disablecard}>
                        <Text style={styles.cardIcon}><Ionicons name={"code-slash-outline"} size={34}/></Text>
                        <Text style={styles.cardTitle}>Geliştiriliyor..</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.disablecard}>
                        <Text style={styles.cardIcon}><Ionicons name={"code-slash-outline"} size={34}/></Text>
                        <Text style={styles.cardTitle}>Geliştiriliyor..</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.disablecard}>
                        <Text style={styles.cardIcon}><Ionicons name={"code-slash-outline"} size={34}/></Text>
                        <Text style={styles.cardTitle}>Geliştiriliyor..</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    cardsContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#f8f8f8',
        width: cardSize,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    disablecard: {
        backgroundColor: '#f8f8f8',
        width: cardSize,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        opacity: 0.5,
    },
    cardTitle: {
        textAlign: 'center',
        marginBottom: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardIcon: {
        width: cardSize - 20,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 5,
    },
});

export default HomeScreen;