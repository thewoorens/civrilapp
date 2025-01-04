import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions, SafeAreaView,
} from "react-native";
import Swiper from "react-native-swiper";

const AppIntro = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Swiper
                loop={false}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
                paginationStyle={styles.pagination}
            >
                <View style={styles.slide}>
                    <Image
                        source={{ uri: "https://placehold.co/600x400.png" }}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Hoş Geldiniz</Text>
                    <Text style={styles.description}>
                        Çivril Belediyesi uygulamasıyla şehrinize daha yakın olun. Tüm
                        hizmetler bir tık uzağınızda!
                    </Text>
                </View>

                <View style={styles.slide}>
                    <Image
                        source={{ uri: "https://placehold.co/600x400.png" }}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Hizmetler ve Duyurular</Text>
                    <Text style={styles.description}>
                        Belediyeden güncel haberler, duyurular ve hizmetlere kolayca erişin.
                    </Text>
                </View>

                <View style={styles.slide}>
                    <Image
                        source={{ uri: "https://placehold.co/600x400.png" }}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Hemen Başlayın</Text>
                    <Text style={styles.description}>
                        Şehriniz için daha fazla bilgiye ulaşmak için hemen giriş yapın ya
                        da kayıt olun.
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        marginTop: -250,
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    image: {
        width: width * 0.8,
        height: height * 0.4,
        resizeMode: "contain",
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "600",
        color: "#333333",
        textAlign: "center",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#555555",
        textAlign: "center",
        lineHeight: 22,
    },
    dot: {
        backgroundColor: "#C5CCD6",
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "green",
        width: 9,
        height: 9,
        borderRadius: 6,
        marginHorizontal: 5,
    },
    pagination: {
        //TODO: Noktaların altta değil de biraz yukarıda olmasını sağlar Yayına alınırken burası "bottom: 20" olacak
        bottom: 180,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 30,
    },
    button: {
        flex: 1,
        backgroundColor: "green",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },
    secondaryButton: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "green",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    secondaryButtonText: {
        color: "green",
    },
});

export default AppIntro;
