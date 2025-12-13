import { useRouter } from 'expo-router';
import { Calendar, Car, Clock, MapPin, Plus } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Colors } from '../../constants/Colors';
import { MOCK_ADDRESSES, MOCK_BOOKINGS, MOCK_USER, MOCK_VEHICLES } from '../../constants/MockData';
import { CommonStyles, Spacing } from '../../constants/Styles';

import ParallaxScrollView from '../../components/parallax-scroll-view';
import { ThemedText } from '../../components/themed-text';
import { Collapsible } from '../../components/ui/collapsible';
import { IconSymbol } from '../../components/ui/icon-symbol';

export default function HomeScreen() {
  const router = useRouter();
  const activeBooking = MOCK_BOOKINGS.find(b => b.status === 'in_progress' || b.status === 'booked');
  const selectedVehicle = MOCK_VEHICLES[0];
  const selectedAddress = MOCK_ADDRESSES[0];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#80B3FF"
          name="house.fill"
          style={styles.headerImage}
        />
      }>

      {/* Header Content */}
      <View style={styles.titleContainer}>
        <ThemedText type="title">Welcome, {MOCK_USER.name.split(' ')[0]}!</ThemedText>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <View style={styles.avatarPlaceholder} />
        </TouchableOpacity>
      </View>

      {/* Quick Actions / Summary */}
      <View style={styles.section}>
        <Text style={CommonStyles.sectionTitle}>Your Selection</Text>

        <View style={styles.selectionRow}>
          {/* Vehicle Card */}
          <Card
            style={styles.selectionCard}
            onPress={() => router.push('/vehicle/list')}
            variant="outlined"
          >
            <View style={styles.selectionHeader}>
              <Car size={20} color={Colors.primary} />
              <Text style={styles.changeText}>Change</Text>
            </View>
            <Text style={styles.selectionTitle}>{selectedVehicle.brand} {selectedVehicle.model}</Text>
            <Text style={styles.selectionSubtitle}>{selectedVehicle.registration}</Text>
          </Card>

          {/* Address Card */}
          <Card
            style={styles.selectionCard}
            onPress={() => router.push('/address/list')}
            variant="outlined"
          >
            <View style={styles.selectionHeader}>
              <MapPin size={20} color={Colors.primary} />
              <Text style={styles.changeText}>Change</Text>
            </View>
            <Text style={styles.selectionTitle}>{selectedAddress.label}</Text>
            <Text style={styles.selectionSubtitle} numberOfLines={1}>{selectedAddress.address}</Text>
          </Card>
        </View>
      </View>

      {/* Primary CTA */}
      <Button
        title="Book Car Wash"
        size="large"
        icon={<Plus size={24} color={Colors.white} />}
        onPress={() => router.push('/booking/service')}
        style={styles.bookButton}
      />

      {/* Active Booking */}
      {activeBooking && (
        <View style={styles.section}>
          <View style={CommonStyles.row}>
            <Text style={[CommonStyles.sectionTitle, { flex: 1 }]}>Ongoing Booking</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/bookings')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <Card onPress={() => router.push(`/booking/${activeBooking.id}`)}>
            <View style={styles.bookingHeader}>
              <Badge
                label={activeBooking.status === 'in_progress' ? 'In Progress' : 'Upcoming'}
                variant={activeBooking.status === 'in_progress' ? 'info' : 'success'}
              />
              <Text style={styles.price}>${activeBooking.totalPrice}</Text>
            </View>

            <View style={styles.bookingDetails}>
              <Text style={styles.serviceName}>{activeBooking.service.name}</Text>

              <View style={styles.bookingRow}>
                <Calendar size={16} color={Colors.gray[500]} />
                <Text style={styles.bookingText}>{activeBooking.date}</Text>
                <View style={styles.dot} />
                <Clock size={16} color={Colors.gray[500]} />
                <Text style={styles.bookingText}>{activeBooking.time}</Text>
              </View>

              <View style={styles.bookingRow}>
                <Car size={16} color={Colors.gray[500]} />
                <Text style={styles.bookingText}>{activeBooking.vehicle.brand} {activeBooking.vehicle.model}</Text>
              </View>
            </View>
          </Card>
        </View>
      )}

      {/* Collapsible Section for Tips */}
      <Collapsible title="Car Care Tips">
        <ThemedText>
          1. Wash your car regularly to protect paint.
        </ThemedText>
        <ThemedText>
          2. Wax every 3 months for extra shine.
        </ThemedText>
        <ThemedText>
          3. Check tire pressure monthly.
        </ThemedText>
      </Collapsible>

      <Collapsible title="How it Works?">
        <ThemedText>
          Select your vehicle, choose a service, pick a time slot, and we come to you!
        </ThemedText>
      </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#80B3FF',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.m,
    justifyContent: 'space-between',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[300],
  },
  section: {
    marginBottom: Spacing.l,
  },
  selectionRow: {
    flexDirection: 'row',
    gap: Spacing.m,
  },
  selectionCard: {
    flex: 1,
    padding: Spacing.m,
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.s,
  },
  changeText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  selectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  selectionSubtitle: {
    fontSize: 12,
    color: Colors.gray[600],
  },
  bookButton: {
    marginBottom: Spacing.xl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  seeAll: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: Spacing.m,
    marginTop: Spacing.l,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.s,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  bookingDetails: {
    gap: Spacing.xs,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s,
  },
  bookingText: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray[400],
  },
});
