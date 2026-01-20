import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function GoStoreScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>GoStore</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
});
