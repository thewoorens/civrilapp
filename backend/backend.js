import {initializeApp} from "firebase/app";
import {addDoc, collection, getDocs, getFirestore, where} from "firebase/firestore";
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from "axios";
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import { Alert } from 'react-native'; // Alert bileşenini ekliyoruz

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBnWTx16qHhMsZhPercYtZgEsIGCv0_xx4",
    authDomain: "civrilapp.firebaseapp.com",
    projectId: "civrilapp",
    storageBucket: "civrilapp.firebasestorage.app",
    messagingSenderId: "871788519854",
    appId: "1:871788519854:web:3b367ae00662295f0e683f",
    measurementId: "G-728SJXMRVB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Haberleri getirme fonksiyonu
const fetchNews = async () => {
    try {
        const newsCollectionRef = collection(db, "news");
        const newsSnapshot = await getDocs(newsCollectionRef);
        const newsList = newsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log("News fetched successfully News Length => ", newsList.length);
        return newsList;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};

// Resim sıkıştırma ve Base64'e dönüştürme fonksiyonu
const compressAndConvertToBase64 = async (uri) => {
    try {
        const result = await ImageManipulator.manipulateAsync(
            uri,
            [{resize: {width: 800}}],
            {compress: 0.7, format: ImageManipulator.SaveFormat.JPEG}
        );

        const base64String = await FileSystem.readAsStringAsync(result.uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        return base64String;
    } catch (error) {
        console.error("Resim sıkıştırma ve dönüştürme hatası:", error);
        return null; // Resim işlenemezse null döner
    }
};

// Konum alma fonksiyonu
const getLocation = async () => {
    try {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('Konum izni reddedildi');
            return null; // Konum alınamazsa null döner
        }

        const location = await Location.getCurrentPositionAsync({});
        return location.coords;
    } catch (error) {
        console.info("Konum alınamadı ama önemli değil");
        return null; // Konum alınamazsa null döner
    }
};

// Rate Limiting Kontrolü
const checkRateLimit = async (email) => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const querySnapshot = await getDocs(collection(db, "contact"), where("email", "==", email), where("timestamp", ">", oneHourAgo));
    return querySnapshot.size < 3; // Eğer kullanıcı son bir saat içinde 1 formdan fazla göndermediyse true döner
};

// Engellenen IP adresleri
const blockedIps = ["123.45.67.89"]; // Engellenen IP'leri buraya ekleyin

// İletişim mesajı ekleme fonksiyonu
const newContactMessage = async (name, email, message, neighborhood, imageUri) => {
    try {
        const isAllowed = await checkRateLimit(email);
        if (!isAllowed) {
            Alert.alert(
                "Gönderim Limiti Aşıldı",
                "Günlük form gönderim limitinizi doldurdunuz. 1 günde aynı hesap üzerinden sadece 3 defa iletişim formu gönderebilirsiniz, lütfen daha sonra tekrar deneyiniz",
                [{ text: "Tamam" }]
            );
            return;
        }

        // IP adresi al
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = ipResponse.data.ip;

        if (blockedIps.includes(ipAddress)) {
            Alert.alert(
                "IP Adresi Engellendi",
                "IP adresiniz engellendi. Lütfen daha sonra tekrar deneyin.",
                [{ text: "Tamam" }]
            );
            return;
        }

        // Cihaz bilgileri
        const deviceInfo = {
            brand: Device.brand,
            model: Device.modelName,
            os: Device.osName,
            version: Device.osVersion,
        };

        // Konum bilgisi
        const location = await getLocation();

        // Resmi base64 formatına dönüştür
        let base64Image = null;
        if (imageUri) {
            base64Image = await compressAndConvertToBase64(imageUri);
        }

        // Mesajı Firebase'e ekle
        await addDoc(collection(db, "contact"), {
            name,
            email,
            message,
            neighborhood,
            asset: base64Image || "Resim eklenmedi", // Resim yoksa bir varsayılan değer
            timestamp: new Date().toUTCString(),
            ipAddress,
            deviceInfo,
            location: location || {error: null}, // Konum alınamazsa varsayılan değer
            read: false,
        });

        Alert.alert(
            "Başarılı",
            "Mesaj ve veriler başarıyla gönderildi.",
            [{ text: "Tamam" }]
        );
    } catch (error) {
        console.error("Mesaj gönderme hatası:", error);
        Alert.alert(
            "Gönderim Hatası",
            "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
            [{ text: "Tamam" }]
        );
    }
};

export {fetchNews, newContactMessage};
