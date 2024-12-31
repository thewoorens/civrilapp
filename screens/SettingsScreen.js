import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { setLanguage, l, loadLanguageFromStorage, saveLanguageToStorage } from '../language/language'; // Import

import CivrilSelect from "../components/Select/CivrilSelect";

export default function SettingsScreen() {
    const [selectedLanguage, setSelectedLanguage] = useState("en");

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
        const newLanguage = languageMap[value] || "en";
        setLanguage(newLanguage);
        saveLanguageToStorage(newLanguage);
        setSelectedLanguage(newLanguage);
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                {l("settings")}
            </Text>
            <CivrilSelect
                options={['Türkçe', 'İngilizce', 'Almanca']}
                onSelect={handleLanguageChange}
            />
        </SafeAreaView>
    );
}
