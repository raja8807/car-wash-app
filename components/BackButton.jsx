import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Spacing } from '../constants/Styles';

export const BackButton = ({ style, color = Colors.text }) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={() => router.back()}
            activeOpacity={0.7}
        >
            <ChevronLeft size={24} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: Spacing.s,
        marginLeft: -Spacing.s, // Negative margin to align with screen padding
        marginRight: Spacing.s,
    },
});
