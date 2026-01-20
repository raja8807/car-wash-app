import * as Location from 'expo-location';
import { Briefcase, Home, Map, MapPin, Navigation, Plus, X } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../constants/Colors';

const MOCK_ADDRESSES = [
    { id: '1', label: 'Home', address: 'B-402, Galaxy Heights, Parel, Mumbai' },
    { id: '2', label: 'Office', address: 'Tech Park, Andheri East, Mumbai' },
    { id: '3', label: 'Parents', address: 'Sector 17, Vashi, Navi Mumbai' },
];

export default function LocationBottomSheet({ visible, onClose, onSelectLocation, selectedId }) {
    const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
    const [addingNew, setAddingNew] = useState(false);
    const [newAddress, setNewAddress] = useState({
        flat: '',
        area: '',
        landmark: '',
        label: 'Home', // Home, Work, Other
        customLabel: ''
    });

    // Map State
    const [mapVisible, setMapVisible] = useState(false);
    const [region, setRegion] = useState({
        latitude: 19.0760,
        longitude: 72.8777,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [selectedLocation, setSelectedLocation] = useState(null);

    if (!visible) return null;

    const handleSaveAddress = () => {
        if (!newAddress.flat || !newAddress.area) return;

        const fullAddress = `${newAddress.flat}, ${newAddress.landmark ? newAddress.landmark + ', ' : ''}${newAddress.area}`;
        const finalLabel = newAddress.label === 'Other' && newAddress.customLabel
            ? newAddress.customLabel
            : newAddress.label;

        const addressToAdd = {
            id: Math.random().toString(),
            label: finalLabel,
            address: fullAddress
        };

        setAddresses([...addresses, addressToAdd]);
        onSelectLocation(addressToAdd);
        setAddingNew(false);
        setAddingNew(false);
        setNewAddress({ flat: '', area: '', landmark: '', label: 'Home', customLabel: '' });

    };

    const handleConfirmMapLocation = () => {
        const loc = selectedLocation || region;
        if (loc) {
            // In a real app, reverse geocode here
            // setNewAddress({ ...newAddress, area: `Pinned Location (${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)})` });
            setAddingNew(true); // Show form after confirmation
        }
        setMapVisible(false);
    };

    const handleOpenMap = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            setMapVisible(true); // Open anyway, maybe default to Mumbai
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });
        setMapVisible(true);
    };

    const renderMapModal = () => (
        <Modal visible={mapVisible} animationType="slide">
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={region}
                    onRegionChangeComplete={(r) => {
                        setRegion(r);
                        setSelectedLocation({ latitude: r.latitude, longitude: r.longitude });
                    }}
                >
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                </MapView>

                <View style={styles.mapFooter}>
                    <Text style={styles.mapHelperText}>Drag map to pin location</Text>
                    <TouchableOpacity style={styles.confirmMapButton} onPress={handleConfirmMapLocation}>
                        <Text style={styles.confirmMapText}>Confirm Location</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeMapButton} onPress={() => setMapVisible(false)}>
                        <X size={24} color={Colors.black} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1} />
                <View style={styles.sheet}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>{addingNew ? 'Add New Address' : 'Select Location'}</Text>
                        <TouchableOpacity onPress={addingNew ? () => setAddingNew(false) : onClose} style={styles.closeButton}>
                            <X size={20} color={Colors.black} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.content}>

                        {!addingNew ? (
                            <>
                                {/* Current Location Option */}
                                <TouchableOpacity style={styles.optionItem} onPress={() => onSelectLocation({ id: 'current', label: 'Current Location', address: 'Detecting...' })}>
                                    <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                                        <Navigation size={20} color="#2E7D32" />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.optionTitle}>Use Current Location</Text>
                                        <Text style={styles.optionSubtitle}>Using GPS</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.divider} />

                                {/* Add New Address Option */}
                                <TouchableOpacity style={styles.optionItem} onPress={handleOpenMap}>
                                    <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                                        <Plus size={20} color="#1565C0" />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.optionTitle}>Add New Address</Text>
                                        <Text style={styles.optionSubtitle}>Save for later</Text>
                                    </View>
                                </TouchableOpacity>

                                <Text style={styles.sectionHeader}>Saved Addresses</Text>

                                {/* Saved Addresses List */}
                                {addresses.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={[styles.addressItem, selectedId === item.id && styles.selectedItem]}
                                        onPress={() => onSelectLocation(item)}
                                    >
                                        <View style={styles.addressIcon}>
                                            <MapPin size={20} color={selectedId === item.id ? Colors.primary : Colors.gray[500]} />
                                        </View>
                                        <View style={styles.addressTextContainer}>
                                            <Text style={[styles.addressLabel, selectedId === item.id && styles.selectedText]}>{item.label}</Text>
                                            <Text style={styles.addressValue} numberOfLines={1}>{item.address}</Text>
                                        </View>
                                        {selectedId === item.id && (
                                            <View style={styles.radioSelected} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </>
                        ) : (
                            <View style={styles.formContainer}>

                                <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
                                    <Map size={20} color={Colors.primary} />
                                    <Text style={styles.mapButtonText}>Change Location</Text>
                                </TouchableOpacity>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Flat / House No / Building <Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. B-402, Galaxy Heights"
                                        value={newAddress.flat}
                                        onChangeText={(t) => setNewAddress({ ...newAddress, flat: t })}
                                    />

                                </View>



                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Area / Sector / Locality <Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. Andheri West"
                                        value={newAddress.area}
                                        onChangeText={(t) => setNewAddress({ ...newAddress, area: t })}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Landmark <Text style={styles.optional}>(Optional)</Text></Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. Near City Mall"
                                        value={newAddress.landmark}
                                        onChangeText={(t) => setNewAddress({ ...newAddress, landmark: t })}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Save As</Text>
                                    <View style={styles.labelContainer}>
                                        {['Home', 'Work', 'Other'].map((label) => (
                                            <TouchableOpacity
                                                key={label}
                                                style={[styles.labelChip, newAddress.label === label && styles.selectedLabelChip]}
                                                onPress={() => setNewAddress({ ...newAddress, label })}
                                            >
                                                {label === 'Home' && <Home size={14} color={newAddress.label === label ? Colors.white : Colors.black} />}
                                                {label === 'Work' && <Briefcase size={14} color={newAddress.label === label ? Colors.white : Colors.black} />}
                                                {label === 'Other' && <MapPin size={14} color={newAddress.label === label ? Colors.white : Colors.black} />}
                                                <Text style={[styles.labelText, newAddress.label === label && styles.selectedLabelText]}>{label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    {newAddress.label === 'Other' && (
                                        <TextInput
                                            style={[styles.input, { marginTop: 12 }]}
                                            placeholder="e.g. Grandma's House, Gym"
                                            value={newAddress.customLabel}
                                            onChangeText={(t) => setNewAddress({ ...newAddress, customLabel: t })}
                                        />
                                    )}
                                </View>

                                <TouchableOpacity
                                    style={[styles.saveButton, (!newAddress.flat || !newAddress.area) && styles.disabledButton]}
                                    onPress={handleSaveAddress}
                                    disabled={!newAddress.flat || !newAddress.area}
                                >
                                    <Text style={styles.saveButtonText}>Save Address</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </ScrollView>
                </View>
            </View>
            {renderMapModal()}
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    sheet: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
    closeButton: {
        padding: 4,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
    },
    optionSubtitle: {
        fontSize: 12,
        color: Colors.gray[500],
    },
    divider: {
        height: 1,
        backgroundColor: Colors.secondary,
        marginBottom: 20,
        opacity: 0.2,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.gray[500],
        marginBottom: 16,
        marginTop: 8,
        textTransform: 'uppercase',
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        marginBottom: 12,
    },
    selectedItem: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(234, 67, 53, 0.05)',
    },
    addressIcon: {
        marginRight: 12,
    },
    addressTextContainer: {
        flex: 1,
    },
    addressLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 2,
    },
    selectedText: {
        color: Colors.primary,
    },
    addressValue: {
        fontSize: 12,
        color: Colors.gray[600],
    },
    radioSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.primary,
        marginLeft: 12,
    },
    formContainer: {
        paddingTop: 10,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 8,
    },
    required: {
        color: 'red',
    },
    optional: {
        color: Colors.gray[500],
        fontWeight: 'normal',
        fontSize: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: Colors.background,
    },
    labelContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    labelChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: Colors.gray[100],
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selectedLabelChip: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    labelText: {
        marginLeft: 6,
        fontSize: 14,
        color: Colors.black,
    },
    selectedLabelText: {
        color: Colors.white,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: Colors.gray[300],
    },
    saveButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#E8F5E9',
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        gap: 8,
    },
    mapButtonText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    mapFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    confirmMapButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    confirmMapText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeMapButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: Colors.white,
        padding: 8,
        borderRadius: 20,
        elevation: 5,
    },
    mapHelperText: {
        textAlign: 'center',
        color: Colors.gray[600],
        marginBottom: 4,
    }
});


