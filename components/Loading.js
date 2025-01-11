import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

const Loading = ({ news, message }) => {
    const [rotation, setRotation] = useState(new Animated.Value(0));

    useEffect(() => {
        const rotateAnimation = Animated.loop(
            Animated.timing(rotation, {
                toValue: 200,
                duration: 100000,
                useNativeDriver: true,
            })
        );
        rotateAnimation.start();

        return () => rotateAnimation.stop();
    }, [rotation]);

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'], // Rotate the icon by 360 degrees
    });

    if (!news) {
        return (
            <View style={styles.loadingContainer}>
                <Animated.View style={[styles.loadingIcon, { transform: [{ rotate: rotateInterpolate }] }]}>
                    <Ionicons name="reload-circle-outline" size={56} color="gray" />
                </Animated.View>
                <Text style={styles.loadingText}>{message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Your news detail content goes here */}
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: 'gray',
    },
    container: {
        flex: 1,
        padding: 20,
    },
});

export default Loading;
