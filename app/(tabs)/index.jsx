import { useRouter } from 'expo-router';
import { ArrowRight, ChevronDown, MapPin, Search, ShoppingCart, X } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CarBottomSheet from '../../components/CarBottomSheet';
import CustomCarousel from '../../components/CustomCarousel';
import LocationBottomSheet from '../../components/LocationBottomSheet';
import { Colors } from '../../constants/Colors';
import { SERVICE_CATEGORIES, SERVICE_DETAILS } from '../../constants/ServiceData';
import { useCart } from '../../context/CartContext';

// Mock Data for Services
const BANNER_IMAGES = [
  'https://img.freepik.com/free-photo/beautiful-car-washing-service_23-2149212221.jpg',
  'https://img.freepik.com/free-photo/car-service-center-worker-cleaning-car-interior_23-2149021679.jpg',
  'https://img.freepik.com/free-photo/woman-cleaning-her-car-workshop_23-2148835565.jpg',
];


export default function HomeScreen() {
  const router = useRouter();
  const { cartItems, cartTotal, totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({ id: '1', label: 'Home', address: 'Parel Mumbai, Konkan Division...' });
  const [carModalVisible, setCarModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    id: '1',
    brand: 'Renault Kwid',
    regNumber: 'MH 04 AB 1234',
    nickname: 'My Daily Drive',
    image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/40532/kwid-exterior-right-front-three-quarter-158.jpeg'
  });

  const handleLocationSelect = (loc) => {
    setSelectedLocation(loc);
    setLocationModalVisible(false);
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setCarModalVisible(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    const query = text.toLowerCase();
    const results = [];

    // Search Categories
    SERVICE_CATEGORIES.forEach(cat => {
      if (cat.title.toLowerCase().includes(query)) {
        results.push({ type: 'category', data: cat });
      }
    });

    // Search Sub-services
    Object.keys(SERVICE_DETAILS).forEach(catId => {
      const services = SERVICE_DETAILS[catId];
      services.forEach(service => {
        if (service.title.toLowerCase().includes(query)) {
          // Find parent category for navigation context
          const parentCat = SERVICE_CATEGORIES.find(c => c.id.toString() === catId);
          results.push({ type: 'service', data: service, parentCategory: parentCat });
        }
      });
    });

    setSearchResults(results);
  };

  const handleSearchResultPress = (item) => {
    if (item.type === 'category') {
      router.push(`/service/${item.data.id}`);
    } else {
      // Navigate to category screen, ideally we could scroll to item or highlight it, 
      // but for now just opening the category is good context.
      router.push(`/service/${item.parentCategory.id}`);
    }
  };

  const renderServiceItem = (item, index) => {
    // Render the main large cards (first 4 items)
    if (item.isMain) {
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.mainServiceCard}
          onPress={() => router.push(`/service/${item.id}`)}
        >
          {item.tag && (
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>{item.tag}</Text>
            </View>
          )}
          {/* Visual Arc Decoration */}
          <View style={styles.arcDecoration} />

          <View style={styles.mainCardContent}>
            {/* Find a way to substitute icons later, currently using placeholders */}
            <View style={styles.iconPlaceholder} />
            {/* <Image source={item.icon} style={styles.mainServiceIcon} /> */}
            <Text style={styles.mainServiceTitle}>{item.title}</Text>
          </View>

          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png' }} // Placeholder car icon
            style={styles.mainServiceImage}
          />
        </TouchableOpacity>
      );
    }

    // Render smaller grid items
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.gridServiceItem}
        onPress={() => router.push(`/service/${item.id}`)}
      >
        <View style={styles.gridIconContainer}>
          {/* Icon Placeholder */}
          <View style={{ width: 30, height: 30, backgroundColor: Colors.gray[200], borderRadius: 15 }} />
        </View>
        <Text style={styles.gridServiceTitle}>{item.title}</Text>
        {item.title === 'Car Inspections' && <Text style={styles.gridTag}>At Your Home</Text>}
        {item.title === 'Suspension & Fitments' && <Text style={styles.gridTag}>Free Inspection</Text>}
        {item.title === 'Insurance Claims' && <Text style={styles.gridTag}>Cashless Claims</Text>}

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>




        {/* Context Cards (Location & Car) */}
        <View style={styles.contextCardsContainer}>
          <TouchableOpacity style={styles.contextCard} onPress={() => setLocationModalVisible(true)}>
            <View style={styles.cardLabelContainer}>
              <Text style={styles.cardLabel}>Location</Text>
              <ChevronDown size={12} color={Colors.gray[500]} />
            </View>
            <View style={styles.cardValueContainer}>
              <MapPin size={16} color={Colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.cardValue} numberOfLines={1}>{selectedLocation.label || 'Select Location'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contextCard} onPress={() => setCarModalVisible(true)}>
            <View style={styles.cardLabelContainer}>
              <Text style={styles.cardLabel}>Vehicle</Text>
              <ChevronDown size={12} color={Colors.gray[500]} />
            </View>
            <View style={styles.cardValueContainer}>
              <Image
                source={{ uri: selectedCar.image }}
                style={styles.cardCarImage}
              />
              <Text style={styles.cardValue}>
                {selectedCar.nickname || selectedCar.brand}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Banner */}
        {searchQuery.length === 0 && (
          <CustomCarousel images={BANNER_IMAGES} autoScrollInterval={5000} />
        )}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.primary} />
          <TextInput
            placeholder="Search 'Dent Paint'"
            placeholderTextColor={Colors.gray[600]}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <X size={20} color={Colors.gray[600]} />
            </TouchableOpacity>
          )}
        </View>



        {/* Search Results or Main Content */}
        {searchQuery.length > 0 ? (
          <View style={styles.searchResultsContainer}>
            {searchResults.length === 0 ? (
              <Text style={styles.noResultsText}>No services found matching "{searchQuery}"</Text>
            ) : (
              searchResults.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.searchResultItem}
                  onPress={() => handleSearchResultPress(item)}
                >
                  <View style={styles.resultIconContainer}>
                    {/* Simple placeholder icon logic */}
                    <View style={{ width: 10, height: 10, backgroundColor: Colors.primary, borderRadius: 5 }} />
                  </View>
                  <View>
                    <Text style={styles.resultTitle}>{item.data.title}</Text>
                    <Text style={styles.resultSubtitle}>
                      {item.type === 'category' ? 'Category' : `in ${item.parentCategory?.title}`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        ) : (
          <>


            {/* Services Grid */}
            <View style={styles.servicesGrid}>
              {/* Top 4 Main Services */}
              <View style={styles.mainGrid}>
                {SERVICE_CATEGORIES.slice(0, 4).map(renderServiceItem)}
              </View>

              {/* Minor Services */}
              <View style={styles.subGrid}>
                {SERVICE_CATEGORIES.slice(4).map(renderServiceItem)}
              </View>
            </View>
          </>
        )}

      </ScrollView>

      {/* Floating Cart Bar - Only show if items exist */}
      {totalItems > 0 && (
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
      )}

      <LocationBottomSheet
        visible={locationModalVisible}
        onClose={() => setLocationModalVisible(false)}
        onSelectLocation={handleLocationSelect}
        selectedId={selectedLocation?.id}
      />

      <CarBottomSheet
        visible={carModalVisible}
        onClose={() => setCarModalVisible(false)}
        onSelectCar={handleCarSelect}
        selectedId={selectedCar?.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 100, // Space for cart bar
  },


  contextCardsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
    marginBottom: 16,
  },
  contextCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    color: Colors.gray[400],
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  cardValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardValue: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  cardCarImage: {
    width: 24,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 16,
  },
  searchInput: {
    flex: 1,
    color: Colors.white,
    fontSize: 14,
  },


  servicesGrid: {
    paddingHorizontal: 16,
  },
  mainGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  mainServiceCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 16,
    height: 120,
    padding: 12,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  tagContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(50, 215, 75, 0.2)', // Green tint
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
  },
  tagText: {
    color: '#32D74B',
    fontSize: 10,
    fontWeight: 'bold',
  },
  arcDecoration: {
    position: 'absolute',
    top: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333', // Dark arc
    opacity: 0.5,
    zIndex: 0,
  },
  mainCardContent: {
    zIndex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  mainServiceTitle: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  mainServiceImage: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    top: 30,
    zIndex: 1,
  },
  subGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridServiceItem: {
    width: '23%', // 4 items per row approximately
    alignItems: 'center',
    marginBottom: 16,
  },
  gridIconContainer: {
    width: 50, // Slightly smaller than screenshot but fits better
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  gridServiceTitle: {
    color: Colors.white,
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
  gridTag: {
    fontSize: 8,
    color: '#32D74B',
    position: 'absolute',
    top: -5,
    right: -5,
  },
  cartBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(28, 28, 30, 0.95)', // Semi-transparent card color
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
  searchResultsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  noResultsText: {
    textAlign: 'center',
    color: Colors.gray[500],
    marginTop: 20,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  resultIconContainer: {
    marginRight: 12,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
  resultSubtitle: {
    fontSize: 12,
    color: Colors.gray[500],
  },
});
