import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';

import { useTranslation } from 'react-i18next';

import CivrilSelect from "../components/Select/CivrilSelect";

export default function SettingsScreen() {
    const { t } = useTranslation();
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



    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                {t('settings')}
            </Text>
            <CivrilSelect
                options={['Türkçe', 'İngilizce', 'Almanca']}
                onSelect={handleLanguageChange}
            />
        </SafeAreaView>
    );
}
