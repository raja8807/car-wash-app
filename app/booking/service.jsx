import { useRouter } from 'expo-router';
import { Check, Clock } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { MOCK_SERVICES } from '../../constants/MockData';
import { Spacing } from '../../constants/Styles';


export default function ServiceSelectionScreen() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState(null);

    const handleContinue = () => {
        if (selectedId) {
            router.push('/booking/slot');
        }
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedId === item.id;
        return (
            <Card
                style={[styles.card, isSelected && styles.selectedCard]}
                onPress={() => setSelectedId(item.id)}
                variant={isSelected ? 'elevated' : 'outlined'}
            >
                <View style={styles.cardContent}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.info}>
                        <View style={styles.headerRow}>
                            <Text style={styles.serviceName}>{item.name}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                        </View>
                        <Text style={styles.description}>{item.description}</Text>
                        <View style={styles.durationRow}>
                            <Clock size={14} color={Colors.gray[600]} />
                            <Text style={styles.duration}>{item.duration}</Text>
                        </View>
                    </View>
                    {isSelected && (
                        <View style={styles.checkIcon}>
                            <Check size={16} color={Colors.white} />
                        </View>
                    )}
                </View>
            </Card>
        );
    };

    return (
        <ScreenWrapper
            headerText='Select Service'
        >
            <FlatList
                data={MOCK_SERVICES}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!selectedId}
                    size="large"
                />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({

    list: {
        paddingBottom: 100,
    },
    card: {
        marginBottom: Spacing.m,
        padding: 0,
        overflow: 'hidden',
    },
    selectedCard: {
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    cardContent: {
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: '100%',
        backgroundColor: Colors.gray[200],
    },
    info: {
        flex: 1,
        padding: Spacing.m,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    description: {
        fontSize: 12,
        color: Colors.gray[600],
        marginBottom: Spacing.s,
        lineHeight: 18,
    },
    durationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    duration: {
        fontSize: 12,
        color: Colors.gray[600],
    },
    checkIcon: {
        position: 'absolute',
        top: Spacing.s,
        right: Spacing.s,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
