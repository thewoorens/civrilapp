import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import NewsScreen from './screens/NewsScreen';
import SettingsScreen from './screens/SettingsScreen';
import {Image, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContactScreen from "./screens/ContactScreen";
import {useTranslation} from "react-i18next";
import FastScreen from "./screens/FastScreen";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
        activeOpacity={1}
        style={{
            top: -10,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
        android_ripple={null}
    >
        <View>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    const {t} = useTranslation();
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: -20,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 25,
                    height: 90,
                }
            }}
         id={0}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Ionicons name={focused ? "home" : "home-outline"} size={28}
                                      color={focused ? '#32CD32' : '#696969'}/>
                        </View>
                    ),
                    tabBarButton: (props) => <TouchableOpacity activeOpacity={1} {...props} android_ripple={null}/>
                }}
            />
            <Tab.Screen
                name="News"
                component={NewsScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Ionicons name={focused ? "newspaper" : "newspaper-outline"} size={28}
                                      color={focused ? '#32CD32' : '#696969'}/>
                        </View>
                    ),
                    tabBarButton: (props) => <TouchableOpacity activeOpacity={1} {...props} android_ripple={null}/>
                }}
            />
            <Tab.Screen
                name="Fast"
                component={FastScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View>
                            <Image source={require('./assets/icon.png')} style={{width: 90, height: 90}}
                                   resizeMode="contain"/>
                        </View>
                    ),
                    tabBarButton: (props) => <CustomTabBarButton activeOpacity={1} {...props} />
                }}
            />

            <Tab.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Ionicons name={focused ? "call" : "call-outline"} size={28}
                                      color={focused ? '#32CD32' : '#696969'}/>
                        </View>
                    ),
                    tabBarButton: (props) => <TouchableOpacity activeOpacity={1} {...props} android_ripple={null}/>
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                            <Ionicons name={focused ? "settings" : "settings-outline"} size={28}
                                      color={focused ? '#32CD32' : '#696969'}/>
                        </View>
                    ),
                    tabBarButton: (props) => <TouchableOpacity activeOpacity={1} {...props} android_ripple={null}/>
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;