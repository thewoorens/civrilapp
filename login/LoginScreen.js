import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    TouchableWithoutFeedback,
    Keyboard, StatusBar, Alert
} from 'react-native';
import {loginUser} from "../backend/auth";
import CivrilSelect from "../components/Select/CivrilSelect";
import {useTranslation} from "react-i18next";
import {getData} from "../backend/storage";
import {useRoute} from "@react-navigation/native";

const LoginScreen = ({navigation}) => {
        const [email, setEmail] = useState();


        const fetchUserData = async () => {
            try {
                const userData = await getData("user");
                if (userData) {
                    setEmail(userData.email);
                    console.log("Kullanıcı verileri:", userData);
                    return true; // Kullanıcı verisi bulundu
                } else {
                    console.log("Kullanıcı verisi bulunamadı.");
                    return false; // Kullanıcı verisi bulunamadı
                }
            } catch (error) {
                console.error("Kullanıcı verileri alınırken hata oluştu:", error);
                return false; // Hata durumunda false döndür
            }
        };

        useEffect(() => {
            const checkUserData = async () => {
                const userExists = await fetchUserData();
                if (userExists) {
                    navigation.navigate("MainMenu");
                }
            };

            checkUserData();
        }, [navigation]);
        const {t} = useTranslation();
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


        }
        const [password, setPassword] = useState('');
        const [session, setSession] = useState(null);

        const dismissKeyboard = () => {
            Keyboard.dismiss();
        };

        const handleLogin = async () => {
            if (!email || !password){
                Alert.alert(
                    "Hata",
                    "Lütfen bütün alanları doldurunuz",
                    [{text: "Tamam"}]
                ); // Hata mesajını kullanıcıya göster
                return;
            }
            const result = await loginUser(email, password, setSession);
            if (session) {
                alert('Giriş yapıldı!'); // Burada oturum açıldıktan sonra yönlendirme yapabilirsiniz
                navigation.navigate('MainMenu');

            }
            if (result === true) {
                navigation.navigate('MainMenu');

            }
        };


        return (

            <TouchableWithoutFeedback onPress={dismissKeyboard}>

                <View style={styles.container}>
                    <StatusBar barStyle={"default"}/>
                    <Animated.View style={[styles.logoContainer]}>

                        <Text style={styles.logoText}>Çivril Belediyesi Mobil Uygulamasına Giriş Yapın</Text>
                    </Animated.View>
                    <View style={styles.inputContainer}>

                        <TextInput
                            textContentType={"emailAddress"}
                            keyboardType={"email-address"}
                            style={styles.input}
                            placeholder="E-posta"
                            autoCorrect={false} // Otomatik düzeltmeyi kapatır
                            placeholderTextColor="#888"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <TextInput
                            textContentType={"password"}
                            style={styles.input}
                            placeholder="Şifre"
                            placeholderTextColor="#888"
                            autoCorrect={false} // Otomatik düzeltmeyi kapatır
                            secureTextEntry
                            onChangeText={setPassword}
                            value={password}
                        />
                    </View>
                    {/* TODO: LONG PRESS KALDIRILMALI ÇOK BÜYÜK BİR AÇIK TEST İÇİN KONULDU */}
                    <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => handleLogin()}
                                      onLongPress={() => navigation.navigate('MainMenu')}>
                        <Text style={styles.buttonText}>Giriş Yap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.registerButton}
                                      onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerText}>Kayıt Ol</Text>
                    </TouchableOpacity>
                    <View style={{width: '55%'}}>
                        <CivrilSelect
                            options={['Türkçe', 'İngilizce', 'Almanca']}
                            onSelect={handleLanguageChange}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 50,
    },
    logoText: {
        fontSize: 27,
        color: '#004d40',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 50,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 30,
    },
    input: {
        height: 55,  // Yükseklik arttırıldı
        borderColor: '#004d40',
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 20,
        color: '#004d40',
        marginBottom: 20,
        fontSize: 18,  // Font boyutu büyütüldü
    },
    button: {
        width: '80%',
        height: 55,  // Yükseklik arttırıldı
        backgroundColor: '#004d40',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,  // Font boyutu büyütüldü
        fontWeight: 'bold',
    },
    registerButton: {
        width: '80%',
        height: 55,  // Yükseklik arttırıldı
        borderColor: '#004d40',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    registerText: {
        color: '#004d40',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
