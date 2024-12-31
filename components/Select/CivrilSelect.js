import React, {useState,} from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Image} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {l} from '../../language/language';
import {getData} from "../../backend/storage";


export default function CivrilSelect({options, onSelect, selectedValue}) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (item) => {
        onSelect(item);
        setModalVisible(false);
    };

    return (

        <TouchableOpacity style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.selectButtonText}>{l("changeLanguage")}</Text>
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1}
                                  onPressOut={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <Ionicons name={"close"} size={25} onPress={() => setModalVisible(false)}
                                  style={{alignSelf: "flex-end"}}></Ionicons>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({item}) => (
                                <TouchableOpacity activeOpacity={1} style={{
                                    backgroundColor: getData("language") === item ? 'gray' : 'transparent', padding: 25,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                                  onPress={() => handleSelect(item)}>
                                    <Image source={{
                                        uri: item === 'Türkçe' ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/1200px-Flag_of_Turkey.svg.png" : item === 'Almanca' ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAElBMVEUAAAD/zgDdAADnAADaAAD/2AAtsSEoAAAA+ElEQVR4nO3QMQGAMAAEsYeCf8tIuI0pkZANAAAAAAAAAAAAAAAAAAAAgB8dwm6CoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKewh7CbsIipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUqKkqKkKClKipKipCgpSoqSoqQoKUofMGTNC8HkSxoAAAAASUVORK5CYII=" : item === 'İngilizce' ? "data:image/png;base64,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" : null
                                    }} style={{width: 50, height: 30}}/>
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <Text style={{textAlign: 'center', fontSize: 10}}>Eksik veya İstediğniz dil için lütfen
                            iletişime geçin</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    selectButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    option: {},
    optionText: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
});