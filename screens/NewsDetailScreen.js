import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Share} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useRoute} from "@react-navigation/native";
import {fetchNews} from "../backend/backend";
import Loading from "../components/Loading";
import PharmacyOnCallScreen from "../screens/PharmacyOnCallScreen"

export default function NewsDetailScreen() {
    const route = useRoute();  // Get the route parameter
    const {newsId} = route.params;  // Extract newsId from route params
    const [news, setNews] = useState(null);
    const [fontSize, setFontSize] = useState(14);  // Default font size

    useEffect(() => {
        const getNewsDetail = async () => {
            const allNews = await fetchNews();  // Fetch all news
            const selectedNews = allNews.find(newsItem => newsItem.id === newsId);  // Find the selected news by ID
            setNews(selectedNews);  // Set the selected news to state
        };

        getNewsDetail();  // Fetch news when component mounts
    }, [newsId]);

    const increaseFontSize = () => {
        setFontSize(prev => (prev < 30 ? prev + 2 : prev));  // Increase font size but cap at 30
    };

    const decreaseFontSize = () => {
        setFontSize(prev => (prev > 8 ? prev - 2 : prev));  // Decrease font size but ensure it's at least 8
    };

    const onShare = async () => {
        try {
            await Share.share({
                message: `Check out this news: ${news?.title}\n\n${news?.content}`,
            });
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    if (!news) {
        return <Loading message={"Haber Yükleniyor..."}/>  // Loading state if news data is not available yet
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{uri: news.image}} style={styles.image}/>
                <Text style={styles.title}>{news.title}</Text>
                <Text style={styles.date}>Yayınlanma Saati: {news.timestamp}</Text>
                <Text style={styles.category}>Kategori: {news.category}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={1} style={styles.actionButton} onPress={increaseFontSize}>
                        <MaterialIcons color={"white"} name={"zoom-in"} size={22}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.actionButton} onPress={decreaseFontSize}>
                        <MaterialIcons color={"white"} name={"zoom-out"} size={22}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.actionButton} onPress={onShare}>
                        <Ionicons name={"share-outline"} color={"white"} size={22}/>
                    </TouchableOpacity>
                </View>
                <Text selectable={true} selectionColor={"lightgreen"} style={[styles.content, {fontSize}]}
                      textBreakStrategy="simple">
                    {news.content}
                </Text>
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