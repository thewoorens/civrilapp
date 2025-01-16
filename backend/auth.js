import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {Alert} from 'react-native';
import {clearAllData, saveData} from "./storage";


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
const auth = getAuth(app);


const registerUser = async (email, password, fullName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
        const now = new Date();
        const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            fullName: fullName,
            email: user.email,
            registrationTime: formattedDate,
        });

        console.log("Kullanıcı başarıyla kaydedildi:", user.uid);

        // Başarı mesajını göster
        Alert.alert(
            "Kayıt Başarılı",
            "Kullanıcı başarıyla kaydedildi!",
            [{text: "Tamam"}]
        );
    } catch (error) {
        // Hata mesajını kullanıcıya göster
        handleFirebaseError(error);
    }
};

const handleFirebaseError = (error) => {
    let message = "Bir hata oluştu. Lütfen tekrar deneyin.";

    switch (error.code) {
        case "auth/email-already-in-use":
            message = "Bu e-posta adresi zaten kullanılıyor.";
            break;
        case "auth/invalid-email":
            message = "Geçersiz bir e-posta adresi girdiniz.";
            break;
        case "auth/weak-password":
            message = "Parola çok zayıf. Lütfen daha güçlü bir parola seçin.";
            break;
        case "auth/operation-not-allowed":
            message = "Bu işlem şu anda mümkün değil. Lütfen daha sonra tekrar deneyin.";
            break;
        case "auth/missing-email":
            message = "E-posta adresi eksik. Lütfen bir e-posta adresi girin.";
            break;
        default:
            message = error.message || "Bilinmeyen bir hata oluştu.";
            break;
    }

    console.log("Hata:", error.code, error.message);

    // Hata mesajını kullanıcıya göster
    Alert.alert(
        "Hata",
        message,
        [{text: "Tamam"}]
    );
};
const loginUser = async (email, password, setSession) => {
    try {
        // Kullanıcıyı Firebase Authentication ile giriş yap
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("Kullanıcı başarıyla giriş yaptı:", user);
        await saveData("user", user)
        return true;
    } catch (error) {
        // Hata kodlarına göre Türkçe mesaj göster
        let errorMessage = "Bir hata oluştu. Lütfen tekrar deneyin.";

        switch (error.code) {
            case "auth/invalid-email":
                errorMessage = "Geçersiz e-posta adresi. Lütfen doğru bir adres girin.";
                break;
            case "auth/user-disabled":
                errorMessage = "Bu hesap devre dışı bırakılmış. Lütfen destek ile iletişime geçin.";
                break;
            case "auth/user-not-found":
                errorMessage = "Bu e-posta adresiyle kayıtlı bir kullanıcı bulunamadı.";
                break;
            case "auth/wrong-password":
                errorMessage = "Hatalı şifre. Lütfen tekrar deneyin.";
                break;
            case "auth/too-many-requests":
                errorMessage = "Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.";
                break;
            case "auth/network-request-failed":
                errorMessage = "Ağ bağlantısı başarısız. Lütfen internet bağlantınızı kontrol edin.";
                break;
            case "auth/invalid-credential":
                errorMessage = "Geçersiz giriş bilgisi. Lütfen tekrar deneyin.";
                break;
            case "auth/operation-not-allowed":
                errorMessage = "Bu işlem şu anda devre dışı. Lütfen destek ile iletişime geçin.";
                break;
            case "auth/account-exists-with-different-credential":
                errorMessage = "Bu e-posta başka bir oturum açma yöntemiyle zaten kayıtlı.";
                break;
            case "auth/invalid-verification-code":
                errorMessage = "Geçersiz doğrulama kodu. Lütfen doğru kodu girin.";
                break;
            case "auth/invalid-verification-id":
                errorMessage = "Geçersiz doğrulama kimliği. Lütfen tekrar deneyin.";
                break;
            case "auth/email-already-in-use":
                errorMessage = "Bu e-posta adresi zaten kullanılıyor.";
                break;
            case "auth/requires-recent-login":
                errorMessage = "Bu işlemi gerçekleştirmek için yeniden giriş yapmanız gerekiyor.";
                break;
            case "auth/weak-password":
                errorMessage = "Şifre çok zayıf. Daha güçlü bir şifre seçin.";
                break;
            case "auth/internal-error":
                errorMessage = "Bir sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.";
                break;
            default:
                errorMessage = "Bir hata oluştu: " + error.message;
                console.error("Beklenmeyen bir hata oluştu:", error);
        }

        Alert.alert(
            "Hata",
            errorMessage,
            [{text: "Tamam"}]
        ); // Hata mesajını kullanıcıya göster
        return false; // Giriş başarısız
    }
};

const logoutUser = async () => {
    await clearAllData();
    auth.signOut().then(() => {
        console.log("Kullanıcı başarıyla çıkış yaptı.");
    });
}



export {auth, registerUser, loginUser, logoutUser};