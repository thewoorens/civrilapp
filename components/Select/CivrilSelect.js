import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {getData} from "../../backend/storage"; // Eğer başka bir kaynak kullanıyorsanız buna göre düzenleyin
import i18n from "../../i18n"; // i18n'i içe aktar
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "react-i18next";

export default function CivrilSelect({options, onSelect, selectedValue}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(selectedValue || 'en'); // Varsayılan dil
    const {t} = useTranslation(); // Çeviri fonksiyonu
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
        <TouchableOpacity style={styles.container}
         activeOpacity={0.6}>
            <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)} activeOpacity={0.6}>
                <Ionicons name={"language"} size={28} color="#4c9f70"/>
                <Text style={styles.optionText}>Dil Ayarları</Text>
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
                            style={{alignSelf: "flex-end"}}
                        />
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({item}) => (
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
                                                        ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAMAAAAFBRFXAAAAFVBMVEUAAADeAAD+zgB2AADrAAD3tAH/0gC2fu9nAAAAnElEQVR4nO3PCQ3AAAwAoe71L3kyllzBATMAAAAAAAAAAAAAAAD871pm7mXmWEa4TrhOuE64TrhOuE64TrhOuE64TrhOuE64TrhOuE64TrhOuE64TrhOuE64TrhOuE64bl/4WWbeZeZcRrhOuE64TrhOuE64TrhOuE64TrhOuE64TrhOuE64TrhOuE64TrhOuE64TrhOuE64TrjuAyw2oUHNBRFJAAAAAElFTkSuQmCC"
                                                        : item === "İngilizce"
                                                            ? "data:image/png;base64,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"
                                                            : null,
                                        }}
                                        style={{width: 50, height: 30}}
                                    />
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={{textAlign: "center", fontSize: 10}}>
                            {t("missingLanguage")}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    selectButton: {
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

    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        fontSize: 18,
        color: '#333',
        flex: 1,
        paddingLeft: 15,
        fontWeight: '600',
    },
});