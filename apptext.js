import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useTranslation } from "react-i18next";
import i18n from "./i18n"; // i18n'i içe aktar
import AsyncStorage from "@react-native-async-storage/async-storage";

// Dil değiştirme fonksiyonu
const changeLanguage = async (lng) => {
  try {
    await AsyncStorage.setItem("language", lng); // Seçilen dili AsyncStorage'e kaydet
    i18n.changeLanguage(lng); // Dili değiştir
  } catch (error) {
    console.log("Dil değiştirme hatası:", error);
  }
};

export default function App() {
  const { t } = useTranslation(); // Çeviri fonksiyonu

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("welcome")}</Text>
      <Text style={styles.text}>{t("hello")}</Text>
      <Button title="Türkçe" onPress={() => changeLanguage("tr")} />
      <Button title="Deutsch" onPress={() => changeLanguage("de")} />
      <Button title="English" onPress={() => changeLanguage("en")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
