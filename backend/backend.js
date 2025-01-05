import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore"; // Importing necessary Firestore functions
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

const fetchNews = async () => {
    try {
        const newsCollectionRef = collection(db, "news");
        const newsSnapshot = await getDocs(newsCollectionRef);
        const newsList = newsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return newsList;
    } catch (error) {
        console.error("Error fetching news:", error);
        return []; // Return an empty array on error
    }
};

export {fetchNews};
