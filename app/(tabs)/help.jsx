import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function HelpScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Help Center</Text>
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
