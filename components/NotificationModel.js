import React, {useState} from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

const NotificationModel = ({visible, onClose, notifications, times}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Ionicons onPress={onClose}  name="close" size={34} color="black" style={styles.closeIcon}/>
                    <Text style={styles.modalTitle}>Bildirimler</Text>
                    <ScrollView style={styles.scrollView}>
                        {notifications.map((notification, index) => (
                            <View key={index} style={styles.notificationItem}>
                                <Text style={styles.notificationText}>{notification}</Text>
                                <Text style={styles.timesText}>{times}</Text>
                            </View>
                        ))}
                    </ScrollView>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    timesText: {
        fontSize: 12,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    scrollView: {
        width: '100%',
        maxHeight: 300,
    },
    notificationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    }, closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    }

});

export default NotificationModel;