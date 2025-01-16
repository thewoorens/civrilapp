import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Veriyi AsyncStorage'a kaydeder.
 * @param {string} key - Kaydedilecek verinin anahtarı.
 * @param {any} value - Kaydedilecek veri.
 */
export const saveData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log(`Yeni veri kaydedildi => ${key}:`, value);
    } catch (error) {
        console.error('Veri kaydedilirken hata oluştu:', error);
    }
};

/**
 * AsyncStorage'dan veriyi alır.
 * @param {string} key - Alınacak verinin anahtarı.
 * @returns {Promise<any | null>} - Alınan veri veya null.
 */
export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return JSON.parse(value); // JSON formatında çözümle
        }
    } catch (error) {
        console.error('Veri alınırken hata oluştu:', error);
    }
    return null; // Veri bulunamazsa veya hata oluşursa null döndür
};

/**
 * AsyncStorage'daki tüm verileri temizler.
 */
export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Tüm veriler başarıyla silindi');
    } catch (error) {
        console.error('Veriler silinirken hata oluştu:', error);
    }
};
