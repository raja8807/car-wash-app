import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const Spacing = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
};

export const BorderRadius = {
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    round: 9999,
};

export const Shadows = StyleSheet.create({
    small: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    large: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
});

export const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: Colors.card,
        borderRadius: BorderRadius.m,
        padding: Spacing.m,
        ...Shadows.small,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text,
        // marginBottom: Spacing.s,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: Spacing.m,
        marginTop: Spacing.l,
    },
});
