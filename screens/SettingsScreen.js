import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Linking} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {useTranslation} from "react-i18next";
import CivrilSelect from "../components/Select/CivrilSelect";

const SettingsScreen = ({navigation}) => {
    const {t} = useTranslation();
    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await loadLanguageFromStorage();
            setLanguage(savedLanguage);
            setSelectedLanguage(savedLanguage);
        };
        loadLanguage();
    }, []);

    const handleLanguageChange = (value) => {
        const languageMap = {
            'Türkçe': 'tr',
            'İngilizce': 'en',
            'Almanca': 'de'
        };
        return languageMap[value] || "en";

    };

    const loadInBrowser = () => {
        Linking.openURL("https://kernelsoftware.com.tr").catch(err => console.error("Couldn't load page", err));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("userProfile")}</Text>
                <TouchableOpacity
                    activeOpacity={.6}
                    style={styles.option}
                    onPress={() => navigation.navigate('ProfileEdit')}>
                    <Ionicons name="person-outline" size={28} color="#4c9f70"/>
                    <Text style={styles.optionText}>{t("editProfile")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.6}

                    style={styles.option}
                    onPress={() => navigation.navigate('AddressEdit')}>
                    <Ionicons name="location-outline" size={28} color="#4c9f70"/>
 
                    <Text style={styles.optionText}>{t("AddressInformation")}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("NotificationSettings")}</Text>
                <TouchableOpacity
                    activeOpacity={.6}

                    style={styles.option}
                    onPress={() => navigation.navigate('NewsNotifications')}>
                    <Ionicons name="notifications-outline" size={28} color="#4c9f70"/>
                    <Text style={styles.optionText}>{t("NewandAnnouncements")}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("Language")}</Text>
                <CivrilSelect
                    options={['Türkçe', 'İngilizce', 'Almanca']}
                    onSelect={handleLanguageChange}
                />


            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("  MunicipalServices")}</Text>

                <TouchableOpacity
                    activeOpacity={.6}
                    style={styles.option}
                    onPress={() => navigation.navigate('ReportFault')}>
                    <Ionicons name="alert-circle-outline" size={28} color="#e63946"/>
                    <Text style={styles.optionText}>{t("  Quick Fault Notification")}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("  Technical Settings")}</Text>
                <TouchableOpacity
                    activeOpacity={.6}

                    style={styles.option}
                    onPress={() => navigation.navigate('AppUpdates')}>
                    <Ionicons name="cloud-download-outline" size={28} color="#4c9f70"/>
                    <Text style={styles.optionText}>Uygulama Güncellemeleri</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.6}

                    style={styles.option}
                    onPress={() => navigation.navigate('ServiceStatus')}>
                    <Ionicons name="bulb-outline" size={28} color="#4c9f70"/>
                    <Text style={styles.optionText}>{t("  Service Status")}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("Feedback")}</Text>
                <TouchableOpacity
                    activeOpacity={.6}
                    style={styles.option}
                    onPress={() => navigation.navigate('Feedback')}>
                    <Ionicons name="chatbubble-ellipses-outline" size={28} color="#4c9f70"/>
                    <Text style={styles.optionText}>{t("Send Feedback")}</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.section}>
                <TouchableOpacity
                    style={{

                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 18,
                        paddingHorizontal: 20,
                        borderRadius: 12,
                        marginBottom: 100,
                        borderWidth: 1,
                        borderColor: '#ccc',

                    }}
                    onPress={() => loadInBrowser()}>
                    <Text style={{
                        fontSize: 18,
                        color: '#159523',
                        fontWeight: '600',
                    }}>Kernel Software © 2025</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 15,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 15,
        backgroundColor: '#f4f4f4',
        shadowColor: '#ccc',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    optionText: {
        fontSize: 18,
        color: '#333',
        flex: 1,
        paddingLeft: 15,
        fontWeight: '600',
    },

});

export default SettingsScreen;
