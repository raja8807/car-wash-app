import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { BorderRadius, Spacing } from '../constants/Styles';

export const Input = ({
    label,
    error,
    leftIcon,
    rightIcon,
    containerStyle,
    style,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    error ? styles.inputError : null,
                    props.editable === false ? styles.disabled : null,
                ]}
            >
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={Colors.gray[500]}
                    {...props}
                />
                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.m,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.m,
        backgroundColor: Colors.white,
        minHeight: 48,
    },
    input: {
        flex: 1,
        paddingHorizontal: Spacing.m,
        paddingVertical: Spacing.s,
        fontSize: 16,
        color: Colors.text,
    },
    inputError: {
        borderColor: Colors.error,
    },
    disabled: {
        backgroundColor: Colors.gray[100],
    },
    leftIcon: {
        paddingLeft: Spacing.m,
    },
    rightIcon: {
        paddingRight: Spacing.m,
    },
    errorText: {
        fontSize: 12,
        color: Colors.error,
        marginTop: Spacing.xs,
    },
});
