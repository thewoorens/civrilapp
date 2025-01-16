import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import {registerUser} from "../backend/auth";

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>

                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Çivril Belediyesi Mobil Uygulamasına Kayıt Olun</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ad Soyad"
                        placeholderTextColor="#888"
                        textContentType={"name"}
                        onChangeText={setName}
                        autoCorrect={false} // Otomatik düzeltmeyi kapatır
                        value={name}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="E-posta"
                        placeholderTextColor="#888"
                        textContentType={"emailAddress"}
                        keyboardType={"email-address"}
                        onChangeText={setEmail}
                        autoCorrect={false} // Otomatik düzeltmeyi kapatır
                        value={email}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Şifre"
                        placeholderTextColor="#888"
                        textContentType={"password"}
                        secureTextEntry
                        onChangeText={setPassword}
                        autoCorrect={false} // Otomatik düzeltmeyi kapatır
                        value={password}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await registerUser(email, password, name);
                        if (!email || !password || !name) {
                            return;
                        }
                        navigation.navigate('Login', {registerEmail: email});
                    }}
                >
                    <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>
                <Text style={styles.buttonText}>Kayıt Ol</Text>
                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Giriş Yap</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
        ;
};

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
        height: 55,
        borderColor: '#004d40',
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 20,
        color: '#004d40',
        marginBottom: 20,
        fontSize: 18,
    },
    button: {
        width: '80%',
        height: 55,
        backgroundColor: '#004d40',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loginButton: {
        width: '80%',
        height: 55,  // Yükseklik arttırıldı
        borderColor: '#004d40',
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginText: {
        color: '#004d40',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
