import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Spacing } from '../../constants/Styles';

export default function AddVehicleScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const isEditing = !!id;

    const [brand, setBrand] = useState(isEditing ? 'Toyota' : '');
    const [model, setModel] = useState(isEditing ? 'Camry' : '');
    const [registration, setRegistration] = useState(isEditing ? 'ABC 1234' : '');
    const [color, setColor] = useState(isEditing ? 'Silver' : '');
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
            headerText={isEditing ? 'Edit Vehicle' : 'Add Vehicle'}
        >


            <ScrollView showsVerticalScrollIndicator={false}>
                <Input
                    label="Brand"
                    placeholder="e.g. Toyota"
                    value={brand}
                    onChangeText={setBrand}
                />
                <Input
                    label="Model"
                    placeholder="e.g. Camry"
                    value={model}
                    onChangeText={setModel}
                />
                <Input
                    label="Registration Number"
                    placeholder="e.g. ABC 1234"
                    value={registration}
                    onChangeText={setRegistration}
                    autoCapitalize="characters"
                />
                <Input
                    label="Color"
                    placeholder="e.g. Silver"
                    value={color}
                    onChangeText={setColor}
                />

                <Button
                    title="Save Vehicle"
                    onPress={handleSave}
                    loading={loading}
                    style={styles.saveButton}
                />
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({

    saveButton: {
        marginTop: Spacing.l,
    },
});
