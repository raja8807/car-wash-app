export const MOCK_USER = {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    avatar: 'https://i.pravatar.cc/150?u=u1',
};

export const MOCK_VEHICLES = [
    {
        id: 'v1',
        type: 'Sedan',
        brand: 'Toyota',
        model: 'Camry',
        registration: 'ABC 1234',
        color: 'Silver',
    },
    {
        id: 'v2',
        type: 'SUV',
        brand: 'Honda',
        model: 'CR-V',
        registration: 'XYZ 9876',
        color: 'Black',
    },
];

export const MOCK_ADDRESSES = [
    {
        id: 'a1',
        label: 'Home',
        address: '123 Main St, Springfield, IL 62704',
        lat: 39.7817,
        lng: -89.6501,
    },
    {
        id: 'a2',
        label: 'Office',
        address: '456 Business Blvd, Springfield, IL 62704',
        lat: 39.7820,
        lng: -89.6510,
    },
];

export const MOCK_SERVICES = [
    {
        id: 's1',
        name: 'Basic Wash',
        description: 'Exterior wash, tire shine, and window cleaning.',
        price: 25,
        duration: '30 min',
        image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500&q=80',
    },
    {
        id: 's2',
        name: 'Premium Wash',
        description: 'Basic Wash + Interior vacuum, dashboard wipe, and air freshener.',
        price: 45,
        duration: '60 min',
        image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&q=80',
    },
    {
        id: 's3',
        name: 'Detailing',
        description: 'Full interior and exterior detailing, waxing, and polishing.',
        price: 120,
        duration: '120 min',
        image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?w=500&q=80',
    },
];

export const MOCK_BOOKINGS = [
    {
        id: 'b1',
        status: 'completed',
        date: '2023-10-15',
        time: '10:00 AM',
        vehicle: MOCK_VEHICLES[0],
        address: MOCK_ADDRESSES[0],
        service: MOCK_SERVICES[0],
        totalPrice: 25,
    },
    {
        id: 'b2',
        status: 'in_progress',
        date: '2023-10-25',
        time: '02:00 PM',
        vehicle: MOCK_VEHICLES[1],
        address: MOCK_ADDRESSES[1],
        service: MOCK_SERVICES[1],
        totalPrice: 45,
    },
    {
        id: 'b3',
        status: 'booked',
        date: '2023-11-01',
        time: '09:00 AM',
        vehicle: MOCK_VEHICLES[0],
        address: MOCK_ADDRESSES[0],
        service: MOCK_SERVICES[2],
        totalPrice: 120,
    },
];

export const MOCK_SLOTS = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
];
