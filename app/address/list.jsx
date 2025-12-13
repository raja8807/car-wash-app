import { useRouter } from 'expo-router';
import { Edit2, MapPin, Plus } from 'lucide-react-native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { MOCK_ADDRESSES } from '../../constants/MockData';
import { CommonStyles, Spacing } from '../../constants/Styles';


export default function AddressListScreen() {
    const router = useRouter();

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <MapPin size={24} color={Colors.primary} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => router.push({ pathname: '/address/add', params: { id: item.id } })}>
                        <Edit2 size={18} color={Colors.gray[600]} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );

    return (
        <ScreenWrapper
            headerText='My Addresses'
            headerRight={
                <Button
                    title="Add New"
                    size="small"
                    icon={<Plus size={16} color={Colors.white} />}
                    onPress={() => router.push('/address/add')}
                />}
        >
            <FlatList
                data={MOCK_ADDRESSES}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={CommonStyles.center}>
                        <Text style={{ color: Colors.gray[500] }}>No addresses found.</Text>
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
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    address: {
        fontSize: 14,
        color: Colors.gray[600],
        marginTop: 2,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        padding: Spacing.s,
    },
});
