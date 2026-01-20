import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronRight, X } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
    const router = useRouter();
    const { cartItems, removeFromCart, cartTotal } = useCart();
    const [serviceMode, setServiceMode] = useState('pickup'); // 'pickup' or 'walkin'

    // Calculations
    // Mocking original price logic: assuming current price is discounted, let's say original was 30% more for display purposes
    const getOriginalPrice = (price) => Math.round(price * 1.3);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Cart</Text>
                <View style={styles.carSelector}>
                    <Image
                        source={{ uri: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/40532/kwid-exterior-right-front-three-quarter-158.jpeg' }}
                        style={styles.carImage}
                    />
                    <Text style={styles.carName}>KWID</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Cart Items */}
                <View style={styles.itemsContainer}>
                    {cartItems.map((item) => (
                        <View key={item.id} style={styles.itemCard}>
                            <View style={styles.itemIconContainer}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                            </View>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <View style={styles.priceRow}>
                                    <Text style={styles.currentPrice}>₹{item.price * item.quantity}</Text>
                                    <Text style={styles.originalPrice}>₹{getOriginalPrice(item.price * item.quantity)}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                                <X size={20} color={Colors.white} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    {cartItems.length === 0 && (
                        <Text style={styles.emptyText}>Your cart is empty.</Text>
                    )}
                </View>

                {/* Requirements Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Any other requirements..."
                        placeholderTextColor={Colors.gray[500]}
                        style={styles.input}
                    />
                    <TouchableOpacity>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/84/84380.png' }} style={{ width: 16, height: 16, tintColor: Colors.white }} />
                        {/* Visual placeholder for edit icon */}
                    </TouchableOpacity>
                </View>

                {/* Coupon Section */}
                <TouchableOpacity style={styles.couponContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <View style={styles.couponIcon}>
                            <Text style={{ fontSize: 16, color: '#fff' }}>%</Text>
                        </View>
                        <Text style={styles.couponText}>Apply Coupon | GoApp Money</Text>
                    </View>
                    <ChevronRight size={20} color={Colors.gray[500]} />
                </TouchableOpacity>

                {/* Mode of Service */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Mode of Service</Text>
                    <View style={styles.radioGroup}>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => setServiceMode('pickup')}
                        >
                            <View style={[styles.radioOuter, serviceMode === 'pickup' && { borderColor: '#32D74B' }]}>
                                {serviceMode === 'pickup' && <View style={styles.radioInner} />}
                            </View>
                            <Text style={[styles.radioText, serviceMode === 'pickup' && { color: '#32D74B' }]}>Pickup</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => setServiceMode('walkin')}
                        >
                            <View style={[styles.radioOuter, serviceMode === 'walkin' && { borderColor: '#32D74B' }]}>
                                {serviceMode === 'walkin' && <View style={styles.radioInner} />}
                            </View>
                            <Text style={styles.radioText}>Walk In</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Bill Summary */}
                <View style={styles.billContainer}>
                    <Text style={styles.sectionTitle}>Bill Summary</Text>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Item Total (Incl. of taxes)</Text>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <Text style={[styles.billValue, { textDecorationLine: 'line-through', color: Colors.gray[500] }]}>₹{getOriginalPrice(cartTotal)}</Text>
                            <Text style={styles.billValue}>₹{cartTotal}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.billRow}>
                        <Text style={styles.grandTotalLabel}>Grand Total</Text>
                        <Text style={styles.grandTotalValue}>₹{cartTotal}</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Footer Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2C2C2E',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: -1,
    },
    carSelector: {
        alignItems: 'center',
    },
    carImage: {
        width: 40,
        height: 25,
        resizeMode: 'contain',
    },
    carName: {
        color: Colors.white,
        fontSize: 8,
        textAlign: 'center'
    },
    itemsContainer: {
        marginBottom: 24,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#1C1C1E',
        padding: 12,
        borderRadius: 12,
    },
    itemIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    itemDetails: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        color: Colors.white,
        fontWeight: '500',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    currentPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
    },
    originalPrice: {
        fontSize: 12,
        color: Colors.gray[500],
        textDecorationLine: 'line-through',
    },
    removeButton: {
        padding: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.white,
    },
    emptyText: {
        color: Colors.gray[500],
        textAlign: 'center',
        marginTop: 20,
    },
    inputContainer: {
        backgroundColor: '#5E2B15', // Brownish bg from screenshot
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        color: Colors.white,
        fontSize: 14,
    },
    couponContainer: {
        borderWidth: 1,
        borderColor: '#2C5E48', // Dark green border
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        backgroundColor: '#1A2E26', // Dark green bg
    },
    couponIcon: {
        width: 24,
        height: 24,
        backgroundColor: '#32D74B', // Bright green
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '45deg' }, { scale: 0.8 }] // Star shape-ish
    },
    couponText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    sectionContainer: {
        backgroundColor: '#1C1C1E',
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 32,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.gray[500],
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#32D74B',
    },
    radioText: {
        color: Colors.white,
        fontSize: 14,
    },
    billContainer: {
        backgroundColor: '#1C1C1E',
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
    },
    billLabel: {
        color: Colors.white,
        fontSize: 12,
    },
    billValue: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#2C2C2E',
        marginVertical: 12,
        borderStyle: 'dashed',
        borderWidth: 1, // Visual fix for dashed line needs more work but simple border is fine for now
    },
    grandTotalLabel: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    grandTotalValue: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#121212',
        padding: 16,
    },
    checkoutButton: {
        backgroundColor: '#EA4335', // Red button
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
