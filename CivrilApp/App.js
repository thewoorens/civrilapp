import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";

// Language Configuration
import {l} from './language/language'

// Screens Import
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function CustomTabBar({state, descriptors, navigation}) {
    return (

        <SafeAreaView style={styles.tabBar}>
            <StatusBar  />
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const isFocused = state.index === index;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate(route.name)}
                        style={styles.tabItem}
                    >
                        <Ionicons size={24}
                                  name={route.name === "Home" ? "home" : route.name === "Profile" ? "person" : route.name === "Settings" ? "settings" : "question-mark-sharp"}
                                  style={{color: isFocused ? 'green' : 'gray', paddingTop: 10,}}/>
                        <Text style={{color: isFocused ? 'green' : 'gray'}}>
                            {route.name === "Home" && l('home')}
                            {route.name === "Profile" && l('profile')}
                            {route.name === "Settings" && l('settings')}
                        </Text>

                    </TouchableOpacity>
                );
            })}
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{headerShown: false, headerBackButtonDisplayMode: false}} id={0} tabBar={(props) => <CustomTabBar {...props} />}>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
                <Tab.Screen name="Settings" component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
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
});
