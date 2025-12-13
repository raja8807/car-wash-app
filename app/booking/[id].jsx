import { useLocalSearchParams } from 'expo-router';
import { Car, CheckCircle2, Circle, Clock, MapPin } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { MOCK_BOOKINGS } from '../../constants/MockData';
import { CommonStyles, Spacing } from '../../constants/Styles';


export default function BookingDetailsScreen() {
    const { id } = useLocalSearchParams();
    const booking = MOCK_BOOKINGS.find(b => b.id === id) || MOCK_BOOKINGS[0];

    const steps = [
        { status: 'booked', label: 'Booking Confirmed', date: '10:00 AM' },
        { status: 'assigned', label: 'Washer Assigned', date: '10:05 AM' },
        { status: 'on_the_way', label: 'Washer on the way', date: '10:15 AM' },
        { status: 'in_progress', label: 'Wash in Progress', date: '10:30 AM' },
        { status: 'completed', label: 'Completed', date: '11:30 AM' },
    ];

    const getCurrentStepIndex = () => {
        // Mock logic
        if (booking.status === 'completed') return 4;
        if (booking.status === 'in_progress') return 3;
        return 0;
    };

    const currentStep = getCurrentStepIndex();

    return (
        <ScreenWrapper
            headerText={`Booking #${booking.id}`}
            headerRight={<Badge
                label={booking.status.replace('_', ' ').toUpperCase()}
                variant={booking.status === 'completed' ? 'success' : 'info'}
            />}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Status Timeline */}
                <Card style={styles.timelineCard}>
                    {steps.map((step, index) => {
                        const isCompleted = index <= currentStep;
                        const isLast = index === steps.length - 1;

                        return (
                            <View key={index} style={styles.timelineItem}>
                                <View style={styles.timelineLeft}>
                                    {isCompleted ? (
                                        <CheckCircle2 size={20} color={Colors.primary} />
                                    ) : (
                                        <Circle size={20} color={Colors.gray[300]} />
                                    )}
                                    {!isLast && (
                                        <View style={[styles.timelineLine, isCompleted && styles.timelineLineActive]} />
                                    )}
                                </View>
                                <View style={styles.timelineContent}>
                                    <Text style={[styles.stepLabel, isCompleted && styles.stepLabelActive]}>
                                        {step.label}
                                    </Text>
                                    {isCompleted && <Text style={styles.stepDate}>{step.date}</Text>}
                                </View>
                            </View>
                        );
                    })}
                </Card>

                {/* Booking Info */}
                <Text style={CommonStyles.sectionTitle}>Booking Details</Text>
                <Card>
                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <Car size={20} color={Colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.infoLabel}>Vehicle</Text>
                            <Text style={styles.infoValue}>{booking.vehicle.brand} {booking.vehicle.model}</Text>
                            <Text style={styles.infoSub}>{booking.vehicle.registration}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <MapPin size={20} color={Colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.infoLabel}>Location</Text>
                            <Text style={styles.infoValue}>{booking.address.label}</Text>
                            <Text style={styles.infoSub}>{booking.address.address}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <View style={styles.iconBox}>
                            <Clock size={20} color={Colors.primary} />
                        </View>
                        <View>
                            <Text style={styles.infoLabel}>Time</Text>
                            <Text style={styles.infoValue}>{booking.date} at {booking.time}</Text>
                        </View>
                    </View>
                </Card>

                <Text style={CommonStyles.sectionTitle}>Payment</Text>
                <Card>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Service Total</Text>
                        <Text style={styles.paymentValue}>${booking.totalPrice}</Text>
                    </View>
                </Card>
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.l,
        marginTop: Spacing.s,
    },
    timelineCard: {
        padding: Spacing.l,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 0,
        minHeight: 60,
    },
    timelineLeft: {
        alignItems: 'center',
        marginRight: Spacing.m,
        width: 24,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: Colors.gray[200],
        marginVertical: 4,
    },
    timelineLineActive: {
        backgroundColor: Colors.primary,
    },
    timelineContent: {
        flex: 1,
        paddingBottom: Spacing.l,
    },
    stepLabel: {
        fontSize: 16,
        color: Colors.gray[400],
        marginBottom: 4,
    },
    stepLabelActive: {
        color: Colors.text,
        fontWeight: '600',
    },
    stepDate: {
        fontSize: 12,
        color: Colors.gray[500],
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.gray[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.m,
    },
    infoLabel: {
        fontSize: 12,
        color: Colors.gray[500],
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    infoSub: {
        fontSize: 12,
        color: Colors.gray[500],
    },
    divider: {
        height: 1,
        backgroundColor: Colors.gray[200],
        marginVertical: Spacing.m,
        marginLeft: 56, // Align with text
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentLabel: {
        fontSize: 16,
        color: Colors.text,
    },
    paymentValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});
