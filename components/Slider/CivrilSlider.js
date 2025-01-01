import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

// Get the screen height and width
const { width, height } = Dimensions.get('window');

const CivrilSlider = () => {
    const images = [
        'https://www2.denizli.bel.tr/userfiles/image/r181127112911089.jpg',
        'https://www.boyacioglu.com.tr/wp-content/uploads/2022/06/Isikli-Golu-civril-Golu-0.jpg',
        'https://i0.wp.com/turkeyoutdoor.org/wp-content/uploads/2023/11/Civril-2.jpg?w=900&ssl=1',
        'https://i0.wp.com/turkeyoutdoor.org/wp-content/uploads/2023/11/Civril-2.jpg?w=900&ssl=1',
        'https://www2.denizli.bel.tr/userfiles/image/r181127112911089.jpg',
        'https://www.boyacioglu.com.tr/wp-content/uploads/2022/06/Isikli-Golu-civril-Golu-0.jpg',
        'https://i0.wp.com/turkeyoutdoor.org/wp-content/uploads/2023/11/Civril-2.jpg?w=900&ssl=1',
    ];

    return (
        <View style={styles.sliderContainer}>
            <Swiper
                bouncesZoom={true}
                showsPagination={true}
                autoplay={true}
                autoplayTimeout={5}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.slide}>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        // Adjusting the height based on the screen size
        height: height > 700 ? 300 : 200,  // Larger height for larger screens
    },
    slide: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        // Adjusting image styling for responsiveness
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    dot: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
    },
    activeDot: {
        backgroundColor: 'lightgreen',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
    },
});

export default CivrilSlider;
