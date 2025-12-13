import { useRouter } from 'expo-router';
import { Calendar, Car, Clock, CreditCard, MapPin } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { MOCK_ADDRESSES, MOCK_SERVICES, MOCK_VEHICLES } from '../../constants/MockData';
import { Spacing } from '../../constants/Styles';


export default function BookingSummaryScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Mock selected data
    const vehicle = MOCK_VEHICLES[0];
    const address = MOCK_ADDRESSES[0];
    const service = MOCK_SERVICES[0];
    const date = 'Mon, Oct 30';
    const time = '10:00 AM';
    const total = service.price;

    const handleConfirm = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Navigate to success or details. For now, back to home or bookings
            router.replace('/(tabs)/bookings');
        }, 1500);
    };

    return (
        <ScreenWrapper
            headerText='Booking Summary'
        >


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <Card>
                    <Text style={styles.cardTitle}>Service</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>{service.name}</Text>
                        <Text style={styles.value}>${service.price}</Text>
                    </View>
                    <Text style={styles.description}>{service.description}</Text>
                </Card>

                <Card>
                    <Text style={styles.cardTitle}>Details</Text>

                    <View style={styles.detailRow}>
                        <Calendar size={20} color={Colors.gray[500]} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Date</Text>
                            <Text style={styles.detailValue}>{date}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <Clock size={20} color={Colors.gray[500]} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Time</Text>
                            <Text style={styles.detailValue}>{time}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <Car size={20} color={Colors.gray[500]} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Vehicle</Text>
                            <Text style={styles.detailValue}>{vehicle.brand} {vehicle.model}</Text>
                            <Text style={styles.detailSub}>{vehicle.registration}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <MapPin size={20} color={Colors.gray[500]} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Location</Text>
                            <Text style={styles.detailValue}>{address.label}</Text>
                            <Text style={styles.detailSub}>{address.address}</Text>
                        </View>
                    </View>
                </Card>

                <Card>
                    <Text style={styles.cardTitle}>Payment</Text>
                    <View style={styles.detailRow}>
                        <CreditCard size={20} color={Colors.gray[500]} />
                        <View style={styles.detailTextContainer}>
                            <Text style={styles.detailLabel}>Method</Text>
                            <Text style={styles.detailValue}>Pay on Service</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>${total}</Text>
                    </View>
                </Card>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Confirm Booking"
                    onPress={handleConfirm}
                    loading={loading}
                    size="large"
                />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({

    content: {
        paddingBottom: 100,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: Spacing.m,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.xs,
    },
    label: {
        fontSize: 16,
        color: Colors.text,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    description: {
        fontSize: 14,
        color: Colors.gray[600],
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: Spacing.m,
    },
    detailTextContainer: {
        marginLeft: Spacing.m,
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: Colors.gray[500],
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500',
    },
    detailSub: {
        fontSize: 12,
        color: Colors.gray[500],
    },
    divider: {
        height: 1,
        backgroundColor: Colors.gray[200],
        marginVertical: Spacing.m,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: Spacing.m,
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.gray[200],
    },
});
