import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from './locales/en.json';  // İngilizce çeviri
import tr from './locales/tr.json';  // Türkçe çeviri
import de from './locales/de.json';  // Almanca çeviri

const resources = {
  en: { translation: en },
  tr: { translation: tr },
  de: { translation: de },
};

// Dil tercihini AsyncStorage'den al
const getStoredLanguage = async () => {
  try {
    const storedLang = await AsyncStorage.getItem("language");
    if (storedLang) {
      return storedLang;
    }
  } catch (error) {
    console.log("Dil tercihlerini alırken bir hata oluştu:", error);
  }
  return null;
};

// Başlangıçta dil yükleme
const initializeI18n = async () => {
  const storedLang = await getStoredLanguage();
  const defaultLang = storedLang || Localization.locale.split("-")[0] || "en"; // Varsayılan dil

  // i18n'i başlat
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLang, // Cihazdan veya AsyncStorage'den alınan dil
      fallbackLng: "en", // Dil bulunamazsa İngilizceye düş
      interpolation: {
        escapeValue: false, // React zaten XSS koruması sağlar
      },
    });
};

initializeI18n(); // Başlatma işlemi

export default i18n;
