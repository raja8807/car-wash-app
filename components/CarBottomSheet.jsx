import { Check, Plus, Search, X } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';

const CAR_COLORS = [
    { name: 'White', code: '#FFFFFF', border: '#E0E0E0' },
    { name: 'Black', code: '#000000', border: '#000000' },
    { name: 'Silver', code: '#C0C0C0', border: '#A0A0A0' },
    { name: 'Grey', code: '#808080', border: '#606060' },
    { name: 'Blue', code: '#1565C0', border: '#1565C0' },
    { name: 'Red', code: '#D32F2F', border: '#D32F2F' },
    { name: 'Green', code: '#2E7D32', border: '#2E7D32' },
    { name: 'Yellow', code: '#FBC02D', border: '#FBC02D' },
];

const MOCK_CARS = [
    { id: '1', brand: 'Renault', model: 'Kwid', regNumber: 'MH 04 AB 1234', nickname: 'My Daily Drive', color: 'Red', image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/40532/kwid-exterior-right-front-three-quarter-158.jpeg' },
    { id: '2', brand: 'Hyundai', model: 'Creta', regNumber: 'MH 01 XY 9876', nickname: 'Family Car', color: 'White', image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/141115/creta-exterior-right-front-three-quarter.jpeg?isig=0&q=80' },
];

const MOCK_MAKES = [
    { id: 1, name: 'Maruti Suzuki' },
    { id: 2, name: 'Hyundai' },
    { id: 3, name: 'Tata Motors' },
    { id: 4, name: 'Mahindra' },
    { id: 5, name: 'Honda' },
    { id: 6, name: 'Toyota' },
    { id: 7, name: 'Kia' },
    { id: 8, name: 'Renault' },
    { id: 9, name: 'Volkswagen' },
    { id: 10, name: 'Skoda' },
    { id: 11, name: 'MG' },
    { id: 12, name: 'Nissan' },
    { id: 13, name: 'Jeep' },
    { id: 14, name: 'BMW' },
    { id: 15, name: 'Mercedes-Benz' },
    { id: 16, name: 'Audi' },
];

const MOCK_MODELS = {
    'Maruti Suzuki': [{ id: 101, name: 'Swift' }, { id: 102, name: 'Baleno' }, { id: 103, name: 'Brezza' }, { id: 104, name: 'Dzire' }, { id: 105, name: 'Ertiga' }, { id: 106, name: 'Wagon R' }, { id: 107, name: 'Alto K10' }, { id: 108, name: 'Grand Vitara' }],
    'Hyundai': [{ id: 201, name: 'Creta' }, { id: 202, name: 'Venue' }, { id: 203, name: 'i20' }, { id: 204, name: 'Grand i10 Nios' }, { id: 205, name: 'Verna' }, { id: 206, name: 'Aura' }, { id: 207, name: 'Alcazar' }],
    'Tata Motors': [{ id: 301, name: 'Nexon' }, { id: 302, name: 'Punch' }, { id: 303, name: 'Tiago' }, { id: 304, name: 'Altroz' }, { id: 305, name: 'Harrier' }, { id: 306, name: 'Safari' }, { id: 307, name: 'Tigor' }],
    'Mahindra': [{ id: 401, name: 'Scorpio-N' }, { id: 402, name: 'XUV700' }, { id: 403, name: 'Thar' }, { id: 404, name: 'Bolero' }, { id: 405, name: 'XUV300' }],
    'Honda': [{ id: 501, name: 'City' }, { id: 502, name: 'Amaze' }, { id: 503, name: 'Elevate' }],
    'Toyota': [{ id: 601, name: 'Innova Crysta' }, { id: 602, name: 'Fortuner' }, { id: 603, name: 'Glanza' }, { id: 604, name: 'Urban Cruiser Hyryder' }],
    'Kia': [{ id: 701, name: 'Seltos' }, { id: 702, name: 'Sonet' }, { id: 703, name: 'Carens' }],
    'Renault': [{ id: 801, name: 'Kwid' }, { id: 802, name: 'Triber' }, { id: 803, name: 'Kiger' }],
    // Defaults for others
    'default': [{ id: 991, name: 'Model X' }, { id: 992, name: 'Model Y' }, { id: 993, name: 'Sedan' }, { id: 994, name: 'SUV' }, { id: 995, name: 'Hatchback' }]
};

export default function CarBottomSheet({ visible, onClose, onSelectCar, selectedId }) {
    const [addingNew, setAddingNew] = useState(false);
    const [cars, setCars] = useState(MOCK_CARS);
    const [newCar, setNewCar] = useState({ brand: '', model: '', regNumber: '', nickname: '', color: '' });

    // API State
    const [selectionMode, setSelectionMode] = useState(null); // 'make' or 'model'
    const [searchText, setSearchText] = useState('');
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);


    // Mock Selection Logic
    const openSelection = (mode) => {
        setSelectionMode(mode);
        setSearchText('');
        if (mode === 'make') {
            setMakes(MOCK_MAKES);
        } else if (mode === 'model') {
            if (newCar.brand) {
                const selectedModels = MOCK_MODELS[newCar.brand] || MOCK_MODELS['default'];
                setModels(selectedModels);
            }
        }
    };



    const handleSelectOption = (item) => {
        if (selectionMode === 'make') {
            setNewCar({ ...newCar, brand: item.name, model: '' }); // reset model on make change
        } else {
            setNewCar({ ...newCar, model: item.name });
        }
        setSelectionMode(null);
    };

    const getFilteredOptions = () => {
        const list = selectionMode === 'make' ? makes : models;
        if (!searchText) return list;
        return list.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    };

    const renderSelectionModal = () => {
        if (!selectionMode) return null;

        return (
            <Modal transparent visible={!!selectionMode} animationType="fade">
                <View style={styles.selectionOverlay}>
                    <View style={styles.selectionContainer}>
                        <View style={styles.selectionHeader}>
                            <Text style={styles.selectionTitle}>Select {selectionMode === 'make' ? 'Make' : 'Model'}</Text>
                            <TouchableOpacity onPress={() => setSelectionMode(null)}>
                                <X size={24} color={Colors.black} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.searchBar}>
                            <Search size={20} color={Colors.gray[500]} />
                            <TextInput
                                style={styles.selectionSearchInput}
                                placeholder="Search..."
                                value={searchText}
                                onChangeText={setSearchText}
                                autoFocus
                            />
                        </View>
                        <FlatList
                            data={getFilteredOptions()}
                            keyExtractor={(item) => item.id.toString() || item.name}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.optionRow} onPress={() => handleSelectOption(item)}>
                                    <Text style={styles.optionText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            initialNumToRender={20}
                        />
                    </View>
                </View>
            </Modal>
        );
    };

    if (!visible) return null;

    const handleAddNew = () => {
        // In a real app, you would validate and save this data
        const carToAdd = {
            id: Math.random().toString(),
            brand: newCar.brand + ' ' + newCar.model,
            regNumber: newCar.regNumber,
            nickname: newCar.nickname,
            color: newCar.color,
            image: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png' // Placeholder
        };
        onSelectCar(carToAdd);
        setCars([...cars, carToAdd]);
        setNewCar({ brand: '', model: '', regNumber: '', nickname: '', color: '' });
        setAddingNew(false);
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.sheet}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>{addingNew ? 'Add New Car' : 'My Garage'}</Text>
                        <TouchableOpacity onPress={() => {
                            if (addingNew) setAddingNew(false);
                            else onClose();
                        }} style={styles.closeButton}>
                            <X size={24} color={Colors.black} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.content}>

                        {!addingNew ? (
                            <>
                                {/* Saved Cars List */}
                                {cars.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={[styles.carItem, selectedId === item.id && styles.selectedItem]}
                                        onPress={() => onSelectCar(item)}
                                    >
                                        <Image source={{ uri: item.image }} style={styles.carImage} />
                                        <View style={styles.carInfo}>
                                            <Text style={styles.carBrand}>{item.brand}</Text>
                                            <Text style={styles.carReg}>{item.regNumber}</Text>
                                            {item.nickname && (
                                                <View style={styles.nicknameContainer}>
                                                    <Text style={styles.nicknameText}>{item.nickname}</Text>
                                                </View>
                                            )}
                                        </View>
                                        {selectedId === item.id && (
                                            <View style={styles.selectedIcon}>
                                                <Check size={16} color={Colors.white} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}

                                {/* Add New Car Button */}
                                <TouchableOpacity style={styles.addButton} onPress={() => setAddingNew(true)}>
                                    <View style={styles.addIconCircle}>
                                        <Plus size={24} color={Colors.primary} />
                                    </View>
                                    <Text style={styles.addButtonText}>Add New Vehicle</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <View style={styles.formContainer}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Car Make <Text style={styles.required}>*</Text></Text>
                                    <TouchableOpacity style={styles.selectButton} onPress={() => openSelection('make')}>
                                        <Text style={[styles.selectText, !newCar.brand && styles.placeholderText]}>
                                            {newCar.brand || 'Select Make (e.g. Toyota)'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Car Model <Text style={styles.required}>*</Text></Text>
                                    <TouchableOpacity
                                        style={[styles.selectButton, !newCar.brand && styles.disabledInput]}
                                        onPress={() => newCar.brand && openSelection('model')}
                                        disabled={!newCar.brand}
                                    >
                                        <Text style={[styles.selectText, !newCar.model && styles.placeholderText]}>
                                            {newCar.model || 'Select Model (e.g. Camry)'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Registration Number <Text style={styles.required}>*</Text></Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. MH 02 AB 1234"
                                        autoCapitalize="characters"
                                        value={newCar.regNumber}
                                        onChangeText={(t) => setNewCar({ ...newCar, regNumber: t })}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Nickname <Text style={styles.optional}>(Optional)</Text></Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. My Beast"
                                        value={newCar.nickname}
                                        onChangeText={(t) => setNewCar({ ...newCar, nickname: t })}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Car Color</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorsContainer}>
                                        {CAR_COLORS.map((c) => (
                                            <TouchableOpacity
                                                key={c.name}
                                                style={[
                                                    styles.colorCircle,
                                                    { backgroundColor: c.code, borderColor: c.border },
                                                    newCar.color === c.name && styles.selectedColor
                                                ]}
                                                onPress={() => setNewCar({ ...newCar, color: c.name })}
                                            >
                                                {newCar.color === c.name && (
                                                    <Check size={12} color={c.code === '#FFFFFF' ? '#000' : '#FFF'} />
                                                )}
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>

                                <TouchableOpacity
                                    style={[styles.saveButton, (!newCar.brand || !newCar.model || !newCar.regNumber) && styles.disabledButton]}
                                    onPress={handleAddNew}
                                    disabled={!newCar.brand || !newCar.model || !newCar.regNumber}
                                >
                                    <Text style={styles.saveButtonText}>Save & Select Vehicle</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </ScrollView>
                </View>
            </View>
            {renderSelectionModal()}
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '90%', // Full screen / tall modal
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
        fontSize: 20,
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
    carItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: Colors.white,
    },
    selectedItem: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(234, 67, 53, 0.05)',
    },
    carImage: {
        width: 80,
        height: 50,
        resizeMode: 'contain',
        marginRight: 16,
    },
    carInfo: {
        flex: 1,
    },
    carBrand: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
    },
    carReg: {
        fontSize: 14,
        color: Colors.gray[600],
        marginTop: 2,
    },
    nicknameContainer: {
        marginTop: 4,
        backgroundColor: Colors.gray[100],
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    nicknameText: {
        fontSize: 10,
        color: Colors.gray[600],
        fontStyle: 'italic',
    },
    selectedIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderWidth: 2,
        borderColor: Colors.border,
        borderStyle: 'dashed',
        borderRadius: 12,
        marginTop: 8,
    },
    addIconCircle: {
        marginRight: 12,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
    },
    formContainer: {
        marginTop: 10,
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
    selectButton: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 12,
        backgroundColor: Colors.background,
    },
    selectText: {
        fontSize: 16,
        color: Colors.black,
    },
    placeholderText: {
        color: Colors.gray[500],
    },
    disabledInput: {
        backgroundColor: Colors.gray[200],
        opacity: 0.6,
    },
    colorsContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingVertical: 4,
    },
    colorCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedColor: {
        borderWidth: 2,
        transform: [{ scale: 1.1 }],
    },
    selectionOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    selectionContainer: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        maxHeight: '80%',
    },
    selectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    selectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: Colors.gray[100],
        margin: 16,
        borderRadius: 8,
    },
    selectionSearchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: Colors.black,
    },
    optionRow: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray[100],
    },
    optionText: {
        fontSize: 16,
        color: Colors.black,
    },
});
