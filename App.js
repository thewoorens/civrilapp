import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";


// Screens Import
import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
    const { t } = useTranslation(); // Çeviri fonksiyonu

    return (
        <SafeAreaView style={styles.tabBar}>
            <StatusBar />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate(route.name)}
                        style={styles.tabItem}
                    >
                        <Ionicons size={24}
                            name={route.name === "Home" ? "home" : route.name === "News" ? "newspaper" : route.name === "Settings" ? "settings" : "question-mark-sharp"}
                            style={{ color: isFocused ? 'green' : 'gray', paddingTop: 10, }} />
                        <Text style={{ color: isFocused ? 'green' : 'gray' }}>
                            {route.name === "Home" && t('home')}
                            {route.name === "News" && t('news')}
                            {route.name === "Settings" && t('settings')}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </SafeAreaView>
    );
}

function TopBar() {
    const { t } = useTranslation(); // Çeviri fonksiyonu
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.topBar}>
            <Text style={styles.welcomeText}>{t('welcome')}, Semih Dere</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Ionicons name="settings" size={24} style={styles.settingsIcon} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default function App() {
    const { t } = useTranslation(); // Çeviri fonksiyonu

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar />
                <TopBar />
                <Tab.Navigator screenOptions={{ headerShown: false, headerBackButtonDisplayMode: false }} id={0}
                    tabBar={(props) => <CustomTabBar {...props} />}>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="News" component={NewsScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#ccc',
        height: "auto",
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: "auto",
        backgroundColor: 'green',
    },
    welcomeText: {
        fontSize: 18,
        color: 'black',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    settingsIcon: {
        marginRight: 15,
        color: 'black',
    },
});