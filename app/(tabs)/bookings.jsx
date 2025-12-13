import { useRouter } from 'expo-router';
import { Calendar, Car, Clock, MapPin, PlusCircleIcon } from 'lucide-react-native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { MOCK_BOOKINGS } from '../../constants/MockData';
import { CommonStyles, Spacing } from '../../constants/Styles';

export default function BookingsScreen() {
    const router = useRouter();

    const renderItem = ({ item }) => (
        <Card onPress={() => router.push(`/booking/${item.id}`)}>
            <View style={styles.headerRow}>
                <Text style={styles.serviceName}>{item.service.name}</Text>
                <Badge
                    label={item.status.replace('_', ' ').toUpperCase()}
                    variant={item.status === 'completed' ? 'success' : item.status === 'in_progress' ? 'info' : 'default'}
                />
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Calendar size={14} color={Colors.gray[500]} />
                    <Text style={styles.detailText}>{item.date}</Text>
                    <View style={styles.dot} />
                    <Clock size={14} color={Colors.gray[500]} />
                    <Text style={styles.detailText}>{item.time}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Car size={14} color={Colors.gray[500]} />
                    <Text style={styles.detailText}>{item.vehicle.brand} {item.vehicle.model}</Text>
                </View>

                <View style={styles.detailRow}>
                    <MapPin size={14} color={Colors.gray[500]} />
                    <Text style={styles.detailText} numberOfLines={1}>{item.address.address}</Text>
                </View>
            </View>

            <View style={styles.footerRow}>
                <Text style={styles.price}>${item.totalPrice}</Text>
                <Text style={styles.viewDetails}>View Details</Text>
            </View>
        </Card>
    );

    return (
        <ScreenWrapper
            headerText="My Bookings"
            hasBackButton={false}
            headerRight={
                <TouchableOpacity onPress={() => router.push('/bookings/add')}>
                    <PlusCircleIcon size={20} color={Colors.primary} />
                </TouchableOpacity>
            }
        >


            <FlatList
                data={MOCK_BOOKINGS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={CommonStyles.center}>
                        <Text style={{ color: Colors.gray[500] }}>No bookings found.</Text>
                    </View>
                }
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: Spacing.m,
        marginTop: Spacing.s,
    },
    list: {
        paddingBottom: Spacing.xl,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.m,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    detailsContainer: {
        gap: Spacing.s,
        marginBottom: Spacing.m,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.s,
    },
    detailText: {
        fontSize: 14,
        color: Colors.gray[600],
        flex: 1,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.gray[400],
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.gray[100],
        paddingTop: Spacing.m,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    viewDetails: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
});
