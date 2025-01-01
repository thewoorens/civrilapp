import React, {useState} from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar, View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTranslation} from "react-i18next";

// Screens Import
import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import SettingsScreen from './screens/SettingsScreen';
import JobsScreen from "./screens/JobsScreen";
import ContactScreen from "./screens/ContactScreen";
import NotificationModel from "./components/NotificationModel";
import Tabs from "./tabs";

const Tab = createBottomTabNavigator();


function TopBar() {
    const {t} = useTranslation(); // Translation function
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const notifications = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."];
    const times = new Date().toLocaleTimeString();
    return (
        <SafeAreaView style={styles.topBar}>
            <Text style={styles.welcomeText}>{t('welcome')}, Semih Dere</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name="notifications" size={24} style={styles.settingsIcon}/>
            </TouchableOpacity>
            <NotificationModel
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                notifications={notifications}
                times={times}
            />
        </SafeAreaView>
    );
}

export default function App() {
    const {t} = useTranslation();

    return (
        <NavigationContainer>
            <TopBar/>
            <Tabs/>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        borderRadius: 10,
        height: 90,
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