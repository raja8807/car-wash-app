import { useRouter } from 'expo-router';
import { Car, Edit2, Plus } from 'lucide-react-native';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { MOCK_VEHICLES } from '../../constants/MockData';
import { CommonStyles, Spacing } from '../../constants/Styles';


export default function VehicleListScreen() {
    const router = useRouter();

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <Car size={24} color={Colors.primary} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.vehicleName}>{item.brand} {item.model}</Text>
                    <Text style={styles.vehicleDetails}>{item.type} • {item.color}</Text>
                    <Text style={styles.registration}>{item.registration}</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => router.push({ pathname: '/vehicle/add', params: { id: item.id } })}>
                        <Edit2 size={18} color={Colors.gray[600]} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );

    return (
        <ScreenWrapper
            headerText='My Vehicles'
            headerRight={<Button
                title="Add New"
                size="small"
                icon={<Plus size={16} color={Colors.white} />}
                onPress={() => router.push('/vehicle/add')}
            />}
        >


            <FlatList
                data={MOCK_VEHICLES}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={CommonStyles.center}>
                        <Text style={{ color: Colors.gray[500] }}>No vehicles found.</Text>
                    </View>
                }
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({

    list: {
        paddingBottom: Spacing.xl,
    },
    card: {
        marginBottom: Spacing.m,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.gray[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.m,
    },
    info: {
        flex: 1,
    },
    vehicleName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    vehicleDetails: {
        fontSize: 14,
        color: Colors.gray[600],
        marginTop: 2,
    },
    registration: {
        fontSize: 12,
        color: Colors.gray[500],
        marginTop: 4,
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        backgroundColor: Colors.gray[100],
        alignSelf: 'flex-start',
        paddingHorizontal: 4,
        borderRadius: 4,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: Spacing.s,
    },
});
