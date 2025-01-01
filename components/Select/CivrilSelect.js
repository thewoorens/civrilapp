import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "../../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

export default function CivrilSelect({ options, onSelect, selectedValue }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(selectedValue || 'en'); // Varsayılan dil
    const { t } = useTranslation();
    const handleSelect = async (item) => {
        if (item === "Türkçe") {
            item = "tr";
        } else if (item === "English") {
            item = "en";
        } else if (item === "Deutsch") {
            item = "de";
        }
        try {
            await AsyncStorage.setItem("language", item);

            i18n.changeLanguage(item);

            setCurrentLanguage(item);

            onSelect(item);
            setModalVisible(false);
        } catch (error) {
            console.log("Dil değiştirme hatası:", error);
        }
    };

    useEffect(() => {
        const getStoredLanguage = async () => {
            try {
                const storedLang = await AsyncStorage.getItem("language");
                if (storedLang) {
                    setCurrentLanguage(storedLang);
                    i18n.changeLanguage(storedLang);
                }
            } catch (error) {
                console.log("Dil bilgisi yüklenirken bir hata oluştu:", error);
            }
        };

        getStoredLanguage();
    }, []);

    return (
        <TouchableOpacity style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
                <Ionicons name={"language"} size={34} color={"#fff"} />
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType="fade"
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
                            style={{ alignSelf: "flex-end", marginBottom: 10 }}
                        />
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: "#cccaca",
                                        marginVertical: 5,
                                        backgroundColor: currentLanguage === item ? "#cccaca" : "transparent",
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
                                                    : item === "Deutsch"
                                                        ? "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
                                                        : item === "English"
                                                            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/255px-Flag_of_the_United_States_%28Pantone%29.svg.png"
                                                            : null,
                                        }}
                                        style={{ width: 50, height: 30, borderRadius: 5 }}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

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
