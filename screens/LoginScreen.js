import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Giriş işlemi
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('../assets/favicon.png')} style={styles.logo} /> {/* Logo resmi */}
            </View>

            {/* E-mail input */}
            <TextInput
                style={styles.input}
                placeholder="E-posta"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            {/* Password input */}
            <TextInput
                style={styles.input}
                placeholder="Parola"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Login button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>

            {/* Forgot password button */}
            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Şifreni mi unuttun?</Text>
            </TouchableOpacity>

            {/* Footer with signature */}
            <View style={styles.footer}>
                <Text style={styles.signature}>Kernel Software 2025</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#007BFF',
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
    },
    signature: {
        fontSize: 14,
        color: '#aaa',
    },
});

export default LoginScreen;
