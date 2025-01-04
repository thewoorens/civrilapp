import React, {useState} from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTranslation} from "react-i18next";
import 'react-native-gesture-handler';
import NotificationModel from "./components/NotificationModel";
import Tabs from "./tabs";
import NewsDetailScreen from "./screens/NewsDetailScreen";

const Stack = createStackNavigator();

function TopBar() {
    const {t} = useTranslation(); // Translation function
    const [modalVisible, setModalVisible] = useState(false);
    const notifications = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ];
    const times = new Date().toLocaleTimeString();
    return (
        <SafeAreaView style={styles.topBar}>
            <StatusBar barStyle="light-content"/>
            <Text style={styles.welcomeText}><Text style={{
                fontWeight: 'bold',
            }}>{t('welcome')}</Text>, Semih Dere</Text>
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

function NewsDetailTopBar({ navigation }) {
    console.log("KERNEL-LOG => News Detail Top Bar Renderer Successful 🟩"); // Log NewsDetailTopBar render
    const { t } = useTranslation();
    return (
        <SafeAreaView style={styles.topBar}>
            <StatusBar barStyle="light-content" />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={34} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.newsDetailTitle}>{t('newsDetail')}</Text>
        </SafeAreaView>
    );
}

function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text>Details Screen</Text>
        </View>
    );
}

export default function App() {

    console.log("KERNEL-LOG => APP START SUCCESSFUL powered by kernelsoftware"); // Log application render
    const {t} = useTranslation();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    header: () => <TopBar />, // Use TopBar as the header
                }}
            >
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="NewsDetail" options={{
                    header: (props) => <NewsDetailTopBar {...props} />
                }} component={NewsDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
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
        backgroundColor: '#32CD32',
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
    backIcon: {
        marginLeft: 15,
        color: 'black',
    },
    newsDetailTitle: {
        fontSize: 18,
        color: 'black',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
