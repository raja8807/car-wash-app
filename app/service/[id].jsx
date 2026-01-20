import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart } from 'lucide-react-native';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { SERVICE_CATEGORIES, SERVICE_DETAILS } from '../../constants/ServiceData';
import { useCart } from '../../context/CartContext';

export default function ServiceDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart, removeFromCart, getItemQuantity, cartTotal, totalItems } = useCart();

    const category = SERVICE_CATEGORIES.find((c) => c.id.toString() === id);
    const services = SERVICE_DETAILS[id] || [];

    const renderItem = ({ item }) => {
        const quantity = getItemQuantity(item.id);

        return (
            <View style={styles.serviceItemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
                <View style={styles.actionContainer}>
                    {quantity === 0 ? (
                        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                            <Text style={styles.addButtonText}>ADD</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.quantityControl}>
                            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.qtyBtn}>
                                <Minus size={16} color={Colors.primary} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{quantity}</Text>
                            <TouchableOpacity onPress={() => addToCart(item)} style={styles.qtyBtn}>
                                <Plus size={16} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{category?.title || 'Service Details'}</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Content */}
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No services available in this category yet.</Text>
                    </View>
                }
            />

            {/* Floating Cart Bar (Visible only if items in cart) */}
            {totalItems > 0 && (
                <View style={styles.cartBarContainer}>
                    <View style={styles.cartBar}>
                        <View style={styles.cartInfo}>
                            <View style={styles.cartIconCircle}>
                                <ShoppingCart size={20} color={Colors.white} />
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{totalItems}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.cartText}>{totalItems} Services Added</Text>
                                <Text style={styles.cartSubText}>Total: ₹{cartTotal}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.viewCartButton} onPress={() => router.push('/cart')}>
                            <Text style={styles.viewCartText}>VIEW CART</Text>
                            <ArrowRight size={16} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: Colors.white,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
    listContent: {
        padding: 16,
        paddingBottom: 100,
    },
    serviceItemCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 12,
        marginBottom: 16,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 12,
        marginRight: 8,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 4,
    },
    itemDescription: {
        fontSize: 12,
        color: Colors.gray[600],
        marginBottom: 8,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 80,
    },
    addButton: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 6,
    },
    addButtonText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 12,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    qtyBtn: {
        padding: 6,
    },
    qtyText: {
        paddingHorizontal: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.black,
    },
    emptyState: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        color: Colors.gray[500],
        fontSize: 16,
    },
    cartBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    cartBar: {
        backgroundColor: 'rgba(28, 28, 30, 0.95)',
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    cartInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cartIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    cartText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    cartSubText: {
        color: Colors.gray[400],
        fontSize: 12,
    },
    viewCartButton: {
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        gap: 8,
    },
    viewCartText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
});
