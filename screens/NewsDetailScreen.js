import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Share } from 'react-native';
import newsData from './news.json';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function NewsDetailScreen({ route }) {
    const { newsId } = route.params;
    const news = newsData.find(item => item.id === newsId);
    const [fontSize, setFontSize] = useState(18);


    if (!news) {
        return (
            <View style={styles.container}>
                <Text>News not found</Text>
            </View>
        );
    }

    const onShare = async () => {
        try {
            await Share.share({
                message: `${news.title}\n\n${news.content}`,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const increaseFontSize = () => {
        if (fontSize < 30) {
            setFontSize(fontSize + 2);
        }
    };

    const decreaseFontSize = () => {
        if (fontSize > 10) {
            setFontSize(fontSize - 2);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: news.image }} style={styles.image} />
                <Text style={styles.title}>{news.title}</Text>
                <Text style={styles.date}>Haber Yayınlanma Saati: {news.date}</Text>
                <Text style={styles.location}>Konum: {news.location}</Text>
                <Text style={styles.category}>Kategori: {news.category}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={1} style={styles.actionButton} onPress={increaseFontSize}>
                        <MaterialIcons color={"white"} name={"zoom-in"} size={22}></MaterialIcons>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.actionButton} onPress={decreaseFontSize}>
                        <MaterialIcons color={"white"} name={"zoom-out"} size={22}></MaterialIcons>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.actionButton} onPress={onShare}>
                        <Ionicons name={"share-outline"} color={"white"} size={22}></Ionicons>
                    </TouchableOpacity>
                </View>
                <Text selectable={true} selectionColor={"lightgreen"} style={[styles.content, { fontSize }]} textBreakStrategy="simple">{news.content}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 15,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 15,
        borderRadius: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    date: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    location: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    category: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 15,
    },
    actionButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 7,
        borderRadius: 10,
        alignItems: 'center',
    },
    content: {
        fontSize: 18,
        color: '#333',
        lineHeight: 28,
    },
});