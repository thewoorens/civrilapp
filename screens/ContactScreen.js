import {
    StyleSheet,
    TextInput, View
} from 'react-native';

export default function ContactScreen() {
    <View>
        <TextInput
            label="Name"
            style={styles.input}
            mode="outlined"
            placeholder="Enter your name"/>
    </View>
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 15,
    },
});