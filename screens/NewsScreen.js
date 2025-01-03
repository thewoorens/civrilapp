import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import newsData from './news.json';

export default function NewsScreen({navigation}) {


    if (!newsData) {
        return (
            <View style={styles.container}>
                <Text>News not found</Text>
            </View>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollStyle}>
                {newsData.map(news => (
                    <View key={news.id} style={styles.card}>
                        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('NewsDetail', { newsId: news.id })}>
                            <Image source={{uri: news.image}} style={styles.image}/>
                            <View style={styles.content}>
                                <Text style={styles.title}>{news.title}</Text>
                                <Text numberOfLines={5} style={styles.description}>{news.content}</Text>
                                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => navigation.navigate('NewsDetail', { newsId: news.id })}>
                                    <Text style={styles.buttonText}>Okumaya Devam Et...</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginBottom: 100,
        backgroundColor: 'transparent',
    },
    scrollStyle: {
        padding: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 200,
    },
    content: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    button: {
        marginTop: 15,
        width: '100%',
        backgroundColor: 'green',
        paddingVertical: 10,
        borderRadius: 7,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});