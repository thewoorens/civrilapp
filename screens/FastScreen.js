import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
} from "react-native";
import Swiper from "react-native-swiper";
import Ionicons from "react-native-vector-icons/Ionicons";

const AppIntro = ({navigation}) => {
    const handleSkip = () => {
        // Kullanıcıyı son slayta yönlendirir
        navigation.navigate("SignUp");
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Atla Butonu */}
            <TouchableOpacity activeOpacity={1} style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>
                    Atla
                </Text>
                <Ionicons name="arrow-forward" size={28} />

            </TouchableOpacity>

            <Swiper
                loop={false}
                dot={<View style={styles.dot}/>}
                activeDot={<View style={styles.activeDot}/>}
                paginationStyle={styles.pagination}
            >
                {/* İlk Slayt */}
                <View style={styles.slide}>
                    <Image
                        source={require("../assets/favicon.png")}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Hoş Geldiniz!</Text>
                    <Text style={styles.description}>
                        Çivril Belediyesi uygulamasıyla ilçemize bir adım daha yakın olun! 💚{"\n"}Tüm hizmetler size
                        özel, tek bir tıkla elinizin altında! 🌟
                    </Text>
                </View>

                {/* İkinci Slayt */}
                <View style={styles.slide}>
                    <Image
                        source={require("../assets/slider2.png")}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Harika Özellikler!</Text>
                    <Text style={styles.description}>
                        Online Perşembe Pazarı, Çivril Rehberi, İstek ve Şikayet gibi özelliklerle ilçemizi keşfetmeye
                        başlayın. 🌟Üstelik dil seçenekleriyle herkes için erişilebilir!
                    </Text>
                </View>

                {/* Üçüncü Slayt */}
                <View style={styles.slide}>
                    <Image
                        source={require("../assets/slider3.png")}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Hemen Katılın!</Text>
                    <Text style={styles.description}>
                        İlçemizle ilgili daha fazla bilgiye ulaşmak için üye olun ya da giriş yapın. 😊
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate("SignUp") || alert("Sistem Aktif Değil")}
                        >
                            <Text style={styles.buttonText}>Kayıt Ol</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.secondaryButton]}
                            onPress={() => navigation.navigate("Login") || alert("Sistem Aktif Değil")}
                        >
                            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                                Giriş Yap
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>
        </SafeAreaView>
    );
};

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
    skipButton: {
        position: "absolute",
        top: 40,
        right: 20,
        zIndex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    skipButtonText: {
        fontWeight: "bold",
        fontSize: 14,
        flexDirection: "row",
        marginTop: -15,
        alignItems: "center",
    },
    skipIcon: {
        marginLeft: 5,
        color: "#2E7D32",
    },

    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    image: {
        width: width * 0.75,
        height: height * 0.4,
        resizeMode: "contain",
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#2E7D32",
        textAlign: "center",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#555555",
        textAlign: "center",
        lineHeight: 24,
        paddingHorizontal: 10,
        marginBottom: 40,
    },
    dot: {
        backgroundColor: "#B2DFDB",
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 6,
    },
    activeDot: {
        backgroundColor: "#2E7D32",
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 6,
    },
    pagination: {
        bottom: height * 0.1, // Responsive pagination konumu
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
        paddingHorizontal: 20,
    },
    button: {
        marginBottom: 80,
        marginTop: -40,
        flex: 1,
        backgroundColor: "#2E7D32",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    secondaryButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#2E7D32",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    secondaryButtonText: {
        color: "#2E7D32",
    },
});

export default AppIntro;
