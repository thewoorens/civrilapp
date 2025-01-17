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
import PharmacyOnCallScreen from "./screens/PharmacyOnCallScreen";
import WaterOutageScreen from "./screens/WaterOutageScreen";
import SurveysScreen from "./screens/SurveysScreen";
import JobsScreen from "./screens/JobsScreen";
import LoginScreen from "./login/LoginScreen";
import RegisterScreen from "./login/RegisterScreen";
import OnlineMarketScreen from "./screens/OnlineMarketScreen";
import CouncilScreen from "./screens/CouncilScreen";
import EventScreen from "./screens/EventScreen";
import CivrilDergiScreen from "./screens/CivrilDergiScreen";

const Stack = createStackNavigator();

function TopBar() {
    const {t} = useTranslation(); // Translation function
    const [modalVisible, setModalVisible] = useState(false);
    const notifications = [
        "Herhangi bir bildirim bulunamadı"
    ];
    const times = new Date().toLocaleTimeString();
    return (
        <SafeAreaView style={styles.topBar}>
            <StatusBar barStyle="light-content"/>
            <Text style={styles.welcomeText}><Text style={{
                fontWeight: 'bold',
            }}>{t('welcome')}</Text></Text>
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

function NewsDetailTopBar({navigation}) {
    const {t} = useTranslation();
    return (
        <SafeAreaView style={styles.topBar}>
            <StatusBar barStyle="light-content"/>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={34} style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.newsDetailTitle}>{t('newsDetail')}</Text>
        </SafeAreaView>
    );
}

function DetailTopBar({navigation, title}) {
    return (
        <SafeAreaView style={styles.topBar}>
            <StatusBar barStyle="light-content"/>
            <TouchableOpacity activeOpacity={1} style={{marginBottom: 10}} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={34} style={styles.backIcon}/>
            </TouchableOpacity>
            <Text style={styles.newsDetailTitle}>{title}</Text>
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

function MainMenu() {
    const {t} = useTranslation();

    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <TopBar/>, // Use TopBar as the header
            }}
        >
            <Stack.Screen name="Tabs" component={Tabs}/>

            <Stack.Screen name="Details" component={DetailsScreen}/>

            <Stack.Screen name="PharmacyOnCallScreen" options={{
                header: (props) => <DetailTopBar {...props} title={"Pharmacy On Call"}/>
            }} component={PharmacyOnCallScreen}/>

            <Stack.Screen name="WaterOutageScreen" options={{
                header: (props) => <DetailTopBar {...props} title={"Water Outage List"}/>
            }} component={WaterOutageScreen}/>

            <Stack.Screen name="SurveysScreen" options={{
                header: (props) => <DetailTopBar {...props} title={"Surveys List"}/>
            }} component={SurveysScreen}/>

            <Stack.Screen name="JobsScreen" options={{
                header: (props) => <DetailTopBar {...props} title={"Jobs"}/>
            }} component={JobsScreen}/>

            <Stack.Screen name="OnlineMarket" options={{
                header: (props) => <DetailTopBar {...props} title={"Jobs"}/>
            }} component={OnlineMarketScreen}/>

            <Stack.Screen name="NewsDetail" options={{
                header: (props) => <NewsDetailTopBar {...props} />
            }} component={NewsDetailScreen}/>

            <Stack.Screen name="CouncilScreen" options={{
                header: (props) => <DetailTopBar {...props} title={"Council Screen"}/>
            }} component={CouncilScreen}/>

            <Stack.Screen name="CivrilDergi" options={{
                header: (props) => <DetailTopBar {...props} title={"Civril Dergi Screen"}/>
            }} component={CivrilDergiScreen}/>

            <Stack.Screen name="EventScreen" options={{
                header: (props) => <NewsDetailTopBar {...props} />
            }} component={EventScreen}/>

        </Stack.Navigator>
    );
}

export default function App() {

    console.log("KERNEL-LOG => APP START SUCCESSFUL powered by kernelsoftware"); // Log application render

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={LoginScreen}
                              options={{gestureEnabled: false, animation: 'fade_from_bottom'}}/>
                <Stack.Screen name="Register" component={RegisterScreen}
                              options={{gestureEnabled: false, animation: 'fade_from_bottom'}}/>
                <Stack.Screen name="MainMenu" component={MainMenu}
                              options={{gestureEnabled: false, animation: 'fade_from_bottom'}}/>
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
        backgroundColor: '#32CD32',
    },
    detailTopBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        marginTop: 5,
        marginLeft: 15,
        color: 'black',
    },
    newsDetailTitle: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
