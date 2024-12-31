import { saveData, getData } from '../backend/storage'; // import saveData ve getData

let selectedLanguage = "en"; // Varsayılan dil

const language = {
    "tr": {
        changeLanguage: "Dil değiştirin",
        settings: "Ayarlar",
        profile: "Profil",
        home: "Anasayfa",
    },
    "en": {
        changeLanguage: "Change language",
        settings: "Settings",
        profile: "Profile",
        home: "Home",
    },
    "de": {
        changeLanguage: "ändere Sprache",
        settings: "Einstellungen",
        profile: "Profil",
        home: "Home",
    }
};

// Dil seçimi ve kaydetme fonksiyonu
const setLanguage = (lang) => {
    if (language[lang]) {
        selectedLanguage = lang;
    } else {
        console.error("Geçersiz dil:", lang);
    }
};

// Dil almak için fonksiyon
const l = (key) => {
    return language[selectedLanguage][key] || key; // Eğer dilde anahtar yoksa anahtarı döndür
};

// Dil ayarlarını AsyncStorage'a kaydetmek
const saveLanguageToStorage = async (lang) => {
    try {
        await saveData("language", lang); // AsyncStorage'a kaydediyoruz
    } catch (e) {
        console.error("Dil kaydetme hatası:", e);
    }
};

// Uygulama açıldığında kaydedilen dili yüklemek
const loadLanguageFromStorage = async () => {
    try {
        const savedLanguage = await getData("language");
        return savedLanguage || "en"; // Eğer dil yoksa, varsayılan olarak "en" döndür
    } catch (e) {
        console.error("Dil yüklenirken hata oluştu:", e);
        return "en"; // Hata durumunda varsayılan dil olarak "en" döndür
    }
};

export { setLanguage, l, loadLanguageFromStorage, saveLanguageToStorage };
