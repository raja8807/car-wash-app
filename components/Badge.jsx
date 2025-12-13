import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { BorderRadius, Spacing } from '../constants/Styles';

export const Badge = ({
    label,
    variant = 'default',
    style,
}) => {
    const getColors = () => {
        switch (variant) {
            case 'success':
                return { bg: '#E8F5E9', text: Colors.success };
            case 'warning':
                return { bg: '#FFF8E1', text: Colors.warning };
            case 'error':
                return { bg: '#FFEBEE', text: Colors.error };
            case 'info':
                return { bg: '#E3F2FD', text: Colors.primary };
            default:
                return { bg: Colors.gray[200], text: Colors.gray[700] };
        }
    };

    const colors = getColors();

    return (
        <View style={[styles.badge, { backgroundColor: colors.bg }, style]}>
            <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: Spacing.s,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.round,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
});
