import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { Spacing } from '../../constants/Styles';

export default function AddAddressScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const isEditing = !!id;

    const [label, setLabel] = useState(isEditing ? 'Home' : '');
    const [address, setAddress] = useState(isEditing ? '123 Main St' : '');
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.back();
        }, 1000);
    };

    return (
        <ScreenWrapper
            headerText={isEditing ? 'Edit Address' : 'Add Address'}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <Input
                    label="Label"
                    placeholder="e.g. Home, Office "
                    value={label}
                    onChangeText={setLabel}
                />
                <Input
                    label="Address"
                    placeholder="Enter full address"
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    numberOfLines={3}
                    style={{ height: 80, textAlignVertical: 'top' }}
                />

                {/* Map Placeholder */}
                <View style={styles.mapPlaceholder}>
                    <Text style={styles.mapText}>Map Preview Placeholder</Text>
                </View>

                <Button
                    title="Save Address"
                    onPress={handleSave}
                    loading={loading}
                    style={styles.saveButton}
                />
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: Spacing.l,
        marginTop: Spacing.s,
    },
    mapPlaceholder: {
        height: 200,
        backgroundColor: Colors.gray[200],
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.m,
    },
    mapText: {
        color: Colors.gray[500],
        fontWeight: '500',
    },
    saveButton: {
        marginTop: Spacing.l,
    },
});
