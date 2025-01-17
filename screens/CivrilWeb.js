import React from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView, TouchableOpacity, View,
} from "react-native";


const CivrilWeb = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Civril Web Sitesi Buraya Gelicek hanımlar</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },

});
export default CivrilWeb;
