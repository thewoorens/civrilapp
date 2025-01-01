import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { getData } from "../../backend/storage"; // Eğer başka bir kaynak kullanıyorsanız buna göre düzenleyin
import i18n from "../../i18n"; // i18n'i içe aktar
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

export default function CivrilSelect({ options, onSelect, selectedValue }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(selectedValue || 'en'); // Varsayılan dil
    const { t } = useTranslation(); // Çeviri fonksiyonu
    // Dil değişimini ve AsyncStorage'de kaydetmeyi sağlayan fonksiyon
    const handleSelect = async (item) => {
        if (item === "Türkçe") {
            item = "tr";
        } else if (item === "İngilizce") {
            item = "en";
        } else if (item === "Almanca") {
            item = "de";
        }
        try {
            // Seçilen dili AsyncStorage'e kaydediyoruz
            await AsyncStorage.setItem("language", item);

            // i18n dilini değiştiriyoruz
            i18n.changeLanguage(item);

            // Dil değiştiğinde mevcut dil durumunu güncelle
            setCurrentLanguage(item);

            // Seçilen dili dışarıya bildir
            onSelect(item);
            setModalVisible(false);
        } catch (error) {
            console.log("Dil değiştirme hatası:", error);
        }
    };

    // Uygulama başlatıldığında AsyncStorage'den dil bilgisini al
    useEffect(() => {
        const getStoredLanguage = async () => {
            try {
                const storedLang = await AsyncStorage.getItem("language");
                if (storedLang) {
                    setCurrentLanguage(storedLang);
                    i18n.changeLanguage(storedLang); // Uygulama başlatıldığında dil değiştirme
                }
            } catch (error) {
                console.log("Dil bilgisi yüklenirken bir hata oluştu:", error);
            }
        };

        getStoredLanguage(); // Dil bilgisini al
    }, []);

    return (
        <TouchableOpacity style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
                <Ionicons name={"language"} size={34} color={"#fff"} />
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalContainer}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                >
                    <View style={styles.modalContent}>
                        <Ionicons
                            name={"close"}
                            size={25}
                            onPress={() => setModalVisible(false)}
                            style={{ alignSelf: "flex-end" }}
                        />
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        backgroundColor: currentLanguage === item ? "gray" : "transparent",
                                        padding: 25,
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Image
                                        source={{
                                            uri:
                                                item === "Türkçe"
                                                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png"
                                                    : item === "Almanca"
                                                        ? "data:image/png;base64,..."
                                                        : item === "İngilizce"
                                                            ? "data:image/png;base64,..."
                                                            : null,
                                        }}
                                        style={{ width: 50, height: 30 }}
                                    />
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={{ textAlign: "center", fontSize: 10 }}>
                            {t("missingLanguage")}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    selectButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    option: {},
    optionText: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
});
