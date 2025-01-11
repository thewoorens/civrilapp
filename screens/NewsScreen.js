import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, RefreshControl} from 'react-native';
import {fetchNews, getTokenLog} from "../backend/backend";
import Loading from "../components/Loading";

export default function NewsScreen({navigation}) {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // State for pull to refresh

    useEffect(() => {
        fetchNewsData();
    }, []);

    const fetchNewsData = async () => {
        setLoading(true);
        try {
            const data = await fetchNews();
            setNewsList(data);
        } catch (error) {
            console.error("Failed to fetch news:", error);
        } finally {
            setLoading(false);
            setRefreshing(false); // Ensure refreshing state is set to false after fetch
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchNewsData();
    };

    if (loading) {
        return <Loading message={"Haberler Yükleniyor..."}/>;
    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView
                contentContainerStyle={styles.scrollStyle}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['green', '#00ff00', '#0000ff']}
                        tintColor="green"
                    />
                }
            >
                <Text style={styles.newsTitle}>Çivril Belediyesinden Haberler & Duyurular</Text>

                {newsList.length > 0 ? (
                    newsList.map(news => (
                        <View key={news.id} style={styles.card}>
                            <TouchableOpacity activeOpacity={1}
                                              onPress={() => navigation.navigate('NewsDetail', {newsId: news.id})}>
                                <Image source={{uri: news.image}} style={styles.image}/>
                                <View style={styles.content}>
                                    <Text style={styles.title}>{news.title}</Text>
                                    <Text numberOfLines={5} style={styles.description}>{news.content}</Text>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.button}
                                                      onPress={() => navigation.navigate('NewsDetail', {newsId: news.id})}>
                                        <Text style={styles.buttonText}>Okumaya Devam Et...</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noNewsText}>Henüz haber eklenmedi.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginBottom: 70,
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
    newsTitle: {
        fontSize: 24,
        marginVertical: 15,
        marginHorizontal: 10,
        textAlign: 'left',
        fontStyle: "normal",
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
    noNewsText: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
});
