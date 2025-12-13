import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { BorderRadius, Shadows, Spacing } from '../constants/Styles';

export const Card = ({
    children,
    style,
    variant = 'elevated',
    onPress,
    ...props
}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'elevated':
                return { ...Shadows.small, backgroundColor: Colors.card, borderWidth: 0 };
            case 'outlined':
                return {
                    backgroundColor: Colors.card,
                    borderWidth: 1,
                    borderColor: Colors.border,
                    elevation: 0,
                };
            case 'flat':
                return { backgroundColor: Colors.gray[100], borderWidth: 0, elevation: 0 };
            default:
                return {};
        }
    };

    const Container = onPress ? TouchableOpacity : View;

    return (
        <Container
            style={[styles.card, getVariantStyle(), style]}
            activeOpacity={onPress ? 0.7 : 1}
            onPress={onPress}
            {...props}
        >
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: BorderRadius.m,
        padding: Spacing.m,
        marginBottom: Spacing.m,
    },
});
