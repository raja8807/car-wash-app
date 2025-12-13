import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/Button';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { Colors } from '../../constants/Colors';
import { MOCK_SLOTS } from '../../constants/MockData';
import { BorderRadius, CommonStyles, Spacing } from '../../constants/Styles';


export default function SlotSelectionScreen() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(0); // Index of date
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Generate next 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.getDate(),
            fullDate: d,
        };
    });

    const handleContinue = () => {
        if (selectedSlot) {
            router.push('/booking/summary');
        }
    };

    return (
        <ScreenWrapper
            headerText='Select Date & Time'
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <Text style={CommonStyles.sectionTitle}>Date</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                    {dates.map((item, index) => {
                        const isSelected = selectedDate === index;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.dateCard, isSelected && styles.selectedDateCard]}
                                onPress={() => setSelectedDate(index)}
                            >
                                <Text style={[styles.dayText, isSelected && styles.selectedDateText]}>{item.day}</Text>
                                <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>{item.date}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <Text style={CommonStyles.sectionTitle}>Available Slots</Text>
                <View style={styles.slotsGrid}>
                    {MOCK_SLOTS.map((slot, index) => {
                        const isSelected = selectedSlot === slot;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.slotCard, isSelected && styles.selectedSlotCard]}
                                onPress={() => setSelectedSlot(slot)}
                            >
                                <Text style={[styles.slotText, isSelected && styles.selectedSlotText]}>{slot}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!selectedSlot}
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
    dateScroll: {
        marginBottom: Spacing.l,
        flexGrow: 0,
    },
    dateCard: {
        width: 60,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BorderRadius.m,
        backgroundColor: Colors.card,
        marginRight: Spacing.m,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selectedDateCard: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    dayText: {
        fontSize: 12,
        color: Colors.gray[600],
        marginBottom: 4,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    selectedDateText: {
        color: Colors.white,
    },
    slotsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.m,
    },
    slotCard: {
        width: '30%',
        paddingVertical: Spacing.m,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BorderRadius.m,
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selectedSlotCard: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    slotText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text,
    },
    selectedSlotText: {
        color: Colors.white,
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
