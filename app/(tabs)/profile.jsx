import { useRouter } from 'expo-router';
import { Car, ChevronRight, History, LogOut, MapPin } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { MOCK_USER } from '../../constants/MockData';
import { CommonStyles, Spacing } from '../../constants/Styles';

export default function ProfileScreen() {
    const router = useRouter();

    const menuItems = [
        {
            icon: <Car size={20} color={Colors.text} />,
            label: 'My Vehicles',
            route: '/vehicle/list',
        },
        {
            icon: <MapPin size={20} color={Colors.text} />,
            label: 'My Addresses',
            route: '/address/list',
        },
        {
            icon: <History size={20} color={Colors.text} />,
            label: 'Booking History',
            route: '/(tabs)/bookings',
        },
    ];

    const handleLogout = () => {
        router.replace('/(auth)/login');
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
                    <Text style={styles.name}>{MOCK_USER.name}</Text>
                    <Text style={styles.email}>{MOCK_USER.email}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={CommonStyles.sectionTitle}>Account</Text>
                    <View style={styles.menuContainer}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.menuItem, index !== menuItems.length - 1 && styles.borderBottom]}
                                onPress={() => router.push(item.route)}
                            >
                                <View style={styles.menuLeft}>
                                    <View style={styles.iconContainer}>{item.icon}</View>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </View>
                                <ChevronRight size={20} color={Colors.gray[400]} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <LogOut size={20} color={Colors.error} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginVertical: Spacing.xl,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: Spacing.m,
        backgroundColor: Colors.gray[200],
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: Colors.gray[600],
    },
    section: {
        marginBottom: Spacing.xl,
    },
    menuContainer: {
        backgroundColor: Colors.card,
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.m,
        backgroundColor: Colors.card,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray[100],
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: Colors.gray[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.m,
    },
    menuLabel: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.m,
        backgroundColor: '#FFEBEE',
        borderRadius: 12,
        marginBottom: Spacing.xl,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.error,
        marginLeft: Spacing.s,
    },
});
