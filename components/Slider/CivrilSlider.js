import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

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

    const cards = [
        {title: 'Card 1', description: 'Description for card 1'},
        {title: 'Card 2', description: 'Description for card 2'},
        {title: 'Card 3', description: 'Description for card 3'}
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
                        <Image source={{uri: image}} style={styles.image}/>
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        height: 260,
    },
    slide: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
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