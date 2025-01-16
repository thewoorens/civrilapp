import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {newContactMessage} from "../backend/backend";

import Ionicons from "react-native-vector-icons/Ionicons";
import {Dropdown} from 'react-native-element-dropdown';
import Loading from "../components/Loading";
import {getData} from "../backend/storage";

export default function ContactScreen() {
    const fetchUserData = async () => {
        const userData = await getData('user');
        if (userData) {
            setEmail(userData.email);
            console.log('Kullanıcı verileri:', userData);
        } else {
            console.log('Kullanıcı verisi bulunamadı.');
        }
    };
    fetchUserData();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const [image, setImage] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const neighborhoods = [
        {label: 'Merkez Mahallesi', value: 'Merkez Mahallesi'},
        {label: 'Atatürk Mahallesi', value: 'Atatürk Mahallesi'},
        {label: 'Cumhuriyet Mahallesi', value: 'Cumhuriyet Mahallesi'},
        {label: 'Yeni Mahalle', value: 'Yeni Mahalle'},
    ];

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const handleSubmit = async () => {
        if (loaded) return; // Yüklenirken tekrar işlem yapılmasını önler
        setLoaded(true);

        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
        console.log('Neighborhood:', selectedNeighborhood);
        console.log('Uploaded Image:', image);

        try {
            await newContactMessage(name, email, message, selectedNeighborhood, image);

            if (image) {
                Alert.alert('Başarılı', 'Mesajınız ve resminiz başarıyla gönderildi!');
            } else {
                Alert.alert('Başarılı', 'Mesajınız başarıyla gönderildi!');
            }

            setName('');
            setEmail('');
            setMessage('');
            setSelectedNeighborhood(null);
            setImage(null);
        } catch (error) {
            Alert.alert('Hata', 'Mesaj gönderilemedi, lütfen tekrar deneyin.');
            console.error('Mesaj gönderme hatası:', error);
        } finally {
            setLoaded(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Belediye İletişim Formu</Text>
                    <Text style={styles.description}>
                        Öneri, şikayet, sorun veya istek gibi konular için belediyeniz ile iletişime geçin
                    </Text>

                    {loaded && (
                        <View style={styles.imageContainer}>
                            <Loading message="Mesajınız Gönderiliyor.."/>
                        </View>
                    )}

                    {!loaded && (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Adınızı ve Soyadınızı Giriniz"
                                value={name}
                                onChangeText={setName}
                            />

                            <TextInput
                                style={{display: 'none'}}
                                placeholder="E-posta Adresinizi Giriniz"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                                editable={false}
                            />

                            <Dropdown
                                style={styles.dropdown}
                                data={neighborhoods}
                                labelField="label"
                                valueField="value"
                                placeholder="Mahallenizi Seçiniz"
                                value={selectedNeighborhood}
                                onChange={(item) => setSelectedNeighborhood(item.value)}
                            />

                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Mesajınızı Buraya Yazınız"
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                numberOfLines={4}
                            />

                            {image && (
                                <View style={styles.imageContainer}>
                                    <Image source={{uri: image}} style={styles.imagePreview}/>
                                    <TouchableOpacity
                                        style={styles.deleteIcon}
                                        onPress={() => setImage(null)}
                                    >
                                        <Ionicons name="trash" size={24} color="red" style={styles.deleteIcon}/>
                                    </TouchableOpacity>
                                </View>
                            )}

                            <View style={styles.buttonContainer}>
                                {!image && (
                                    <TouchableOpacity
                                        style={styles.uploadButton}
                                        activeOpacity={1}
                                        onPress={pickImage}
                                    >
                                        <Ionicons name="image" size={24} color="white"/>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    style={styles.submitButton}
                                    activeOpacity={1}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.submitButtonText}>Gönder</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2E7D32', // Koyu yeşil
    },
    description: {
        marginBottom: 20,
        color: 'black', // Koyu yeşil
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: 'green', // Açık yeşil kenarlık
        borderRadius: 10,
        padding: 10,
        fontSize: 18,
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
    },
    textArea: {
        height: 100, // Mesaj alanı için daha büyük yükseklik
    },
    dropdown: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#81C784',
        borderRadius: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
    },
    uploadButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    imagePreview: {
        width: 150,
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#66BB6A',
    },
    deleteIcon: {
        position: 'absolute',
        top: 5,
        borderRadius: 15,
        right: 5,
        backgroundColor: 'white',
        padding: 4,
    },
    buttonContainer: {
        flexDirection: 'row', // Butonları yatayda hizalamak için
        width: '100%',
        justifyContent: 'space-around', // Sol tarafa hizalama
        alignItems: 'center',
    },

    uploadButton: {
        backgroundColor: '#2E7D32', // Koyu yeşil buton
        borderRadius: 10,
        padding: 15,
        width: '15%', // Ekranın %15'ini alacak şekilde boyutlandırma
        alignItems: 'center',
        justifyContent: 'center',
    },

    submitButton: {
        backgroundColor: '#2E7D32', // Koyu yeşil buton
        borderRadius: 10,
        padding: 15,
        width: '80%', // Kalan %85'lik alanı kaplaması için
        alignItems: 'center',
    },

    submitButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
