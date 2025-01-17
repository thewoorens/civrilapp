import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, ScrollView, TouchableOpacity, Image, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CivrilSlider from '../components/Slider/CivrilSlider';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const {width} = Dimensions.get('window');
const cardSize = (width - 40) / 3;
import {getWeather} from "../backend/api";

const HomeScreen = ({navigation}) => {
        const loadInBrowser = () => {
            Linking.openURL("https://www.civril.bel.tr/").catch(err => console.error("Couldn't load page", err));
        };
        const [weather, setWeather] = useState(null);
        const [loading, setLoading] = useState(true);
        const [iconName, setIconName] = useState(null);

        useEffect(() => {
                const fetchWeather = async () => {
                    try {
                        const data = await getWeather("Civril");
                        setWeather(data);
                        if (data.icon) {
                            let icon = null;
                            switch (data.icon) {
                                case '01d':
                                    icon = 'sunny-outline';
                                    break;
                                case '01n':
                                    icon = 'moon-outline';
                                    break;
                                case '02d':
                                    icon = 'partly-sunny-outline';
                                    break;
                                case '02n':
                                    icon = 'cloudy-night-outline';
                                    break;
                                case '03d':
                                case '03n':
                                    icon = 'cloud-outline';
                                    break;
                                case '04d':
                                case '04n':
                                    icon = 'cloudy-outline';
                                    break;
                                case '09d':
                                case '09n':
                                    icon = 'rainy-outline';
                                    break;
                                case '10d':
                                case '10n':
                                    icon = 'rainy-outline';
                                    break;
                                case '11d':
                                case '11n':
                                    icon = 'thunderstorm-outline';
                                    break;
                                case '13d':
                                case '13n':
                                    icon = 'snow-outline';
                                    break;
                                case '50d':
                                case '50n':
                                    icon = 'water-outline';
                                    break;
                                default:
                                    icon = 'help-outline'; // Varsayılan bir simge
                            }
                            setIconName(icon); // Belirlenen simgeyi state'e atıyoruz
                        }
                    } catch
                        (error) {
                        console.error("Hava durumu çekilirken hata oluştu:", error.message);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchWeather();
            }, []
        )
        ;

        const getColorByWeather = (iconName) => {
            switch (iconName) {
                case 'sunny-outline':
                    return '#FFB300'; // Canlı ve parlak sarı (güneşli)
                case 'moon-outline':
                    return '#6A4C9C'; // Derin mor (gece)
                case 'partly-sunny-outline':
                    return '#FF7043'; // Parlak turuncu (parçalı güneş)
                case 'cloudy-night-outline':
                    return '#512DA8'; // Zengin mor (gece bulutlu)
                case 'cloudy-outline':
                    return '#90A4AE'; // Hafif gri mavi (bulutlu)
                case 'rainy-outline':
                    return '#1E88E5'; // Enerjik mavi (yağmurlu)
                case 'snow-outline':
                    return '#81D4FA'; // Yumuşak mavi (karlı)
                case 'water-outline':
                    return '#00ACC1'; // Canlı su mavisi
                case 'thunderstorm-outline':
                    return '#D32F2F'; // Canlı kırmızı (fırtına)
                case 'help-outline':
                    return '#FF5722'; // Enerjik turuncu (yardım)
                default:
                    return '#000000'; // Varsayılan siyah (belirsiz)
            }
        };


        return (
            <View style={{flex: 1}}>
                <ScrollView contentContainerStyle={{flexGrow: 1}} scrollEnabled={true}>

                    {loading ? (
                        <Text>Yükleniyor...</Text>
                    ) : (
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginTop: 15,}}>
                            <Text style={{fontSize: 20, color: '#333'}}>
                                Çivril Hava Durumu: {weather?.celsius}°C
                            </Text>
                            {iconName ? (
                                <Ionicons
                                    name={iconName}
                                    size={30}
                                    color={getColorByWeather(iconName)}
                                    style={{marginLeft: 10}}
                                />
                            ) : null}
                        </View>
                    )}
                    <CivrilSlider/>
                    <View style={styles.cardsContainer}>
                        <TouchableOpacity activeOpacity={5} style={styles.card}
                                          onPress={() => navigation.navigate('PharmacyOnCallScreen')}>
                            <Text style={styles.cardIcon}><MaterialCommunityIcons name={"pill"} size={34}/></Text>
                            <Text style={styles.cardTitle}>Nöbetçi Eczaneler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={5} style={styles.card}
                                          onPress={() => navigation.navigate('WaterOutageScreen')}>
                            <Text style={styles.cardIcon}><Ionicons name={"water-outline"} size={34}/></Text>
                            <Text style={styles.cardTitle}>Su Kesinti Listesi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={5} style={styles.card}
                                          onPress={() => navigation.navigate('SurveysScreen')}>
                            <Text style={styles.cardIcon}><Ionicons name={"reader-outline"} size={34}/></Text>
                            <Text style={styles.cardTitle}>Anketler</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>{"\n"}</Text>
                    <View style={styles.cardsContainer}>
                        <TouchableOpacity activeOpacity={5} style={styles.card}
                                          onPress={() => navigation.navigate('JobsScreen')}>
                            <Text style={styles.cardIcon}><Ionicons name={"briefcase-outline"} size={34}/></Text>
                            <Text style={styles.cardTitle}>İş İlanları</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={5} style={styles.card}
                                          onPress={() => navigation.navigate('OnlineMarket')}>
                            <Text style={styles.cardIcon}><Ionicons name={"basket-outline"} size={34}/></Text>
                            <Text style={styles.cardTitle}>Online Pazar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={5} style={styles.card}
                                          onPress={() => loadInBrowser()}>
                            <Text style={styles.cardIcon}><Ionicons name={"planet-outline"} size={34}/></Text>
                            <Text style={styles.cardTitle}>Onilne İşlemler</Text>
                        </TouchableOpacity>
                    </View>
                    <Text>{"\n"}</Text>
                    <View style={styles.cardsContainer}>
                        <TouchableOpacity activeOpacity={5} style={styles.card}
                                          onPress={() => navigation.navigate('CouncilScreen')}>
                            <Text style={styles.cardIcon}><Ionicons name={"information-circle-outline"} size={34}/></Text>
                            <Text style={styles.cardTitle}>Meclis Kararları</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={5} style={styles.card}
                                          onPress={() => navigation.navigate('EventScreen')}>
                            <Text style={styles.cardIcon}><Ionicons name={"gift-outline"} size={34}/></Text>
                            <Text style={styles.cardTitle}>Etkinlikler{"\n"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={5} style={styles.card}
                                          onPress={() => navigation.navigate('CivrilDergi')}>
                            <Text style={styles.cardIcon}><Ionicons name={"book-outline"} size={34}/></Text>
                            <Text style={styles.cardTitle}>Çivril Dergi</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
;

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