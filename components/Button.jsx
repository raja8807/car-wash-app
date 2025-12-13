import React from 'react';

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { BorderRadius, Spacing } from '../constants/Styles';

export const Button = ({
    title,
    variant = 'primary',
    size = 'medium',
    loading = false,
    icon,
    style,
    textStyle,
    disabled,
    ...props
}) => {
    const getBackgroundColor = () => {
        if (disabled) return Colors.gray[300];
        switch (variant) {
            case 'primary':
                return Colors.primary;
            case 'secondary':
                return Colors.secondary;
            case 'outline':
            case 'ghost':
                return 'transparent';
            case 'danger':
                return Colors.error;
            default:
                return Colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return Colors.gray[500];
        switch (variant) {
            case 'primary':
            case 'secondary':
            case 'danger':
                return Colors.white;
            case 'outline':
                return Colors.primary;
            case 'ghost':
                return Colors.text;
            default:
                return Colors.white;
        }
    };

    const getBorder = () => {
        if (variant === 'outline') {
            return {
                borderWidth: 1,
                borderColor: disabled ? Colors.gray[300] : Colors.primary,
            };
        }
        return {};
    };

    const getPadding = () => {
        switch (size) {
            case 'small':
                return { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.m };
            case 'large':
                return { paddingVertical: Spacing.m, paddingHorizontal: Spacing.xl };
            default:
                return { paddingVertical: Spacing.s + 4, paddingHorizontal: Spacing.l };
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                getBorder(),
                getPadding(),
                style,
            ]}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon && <React.Fragment>{icon}</React.Fragment>}
                    <Text
                        style={[
                            styles.text,
                            {
                                color: getTextColor(),
                                fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
                                marginLeft: icon ? Spacing.s : 0,
                            },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: BorderRadius.m,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
    },
});
