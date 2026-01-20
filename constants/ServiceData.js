export const SERVICE_CATEGORIES = [
    { id: 1, title: 'Car Wash & Cleaning', icon: 'water', isMain: true, tag: 'Starting @ ₹499' },
    { id: 2, title: 'Car Detailing', icon: 'sparkles', isMain: true, tag: 'Premium' },
    { id: 3, title: 'Periodic Servicing', icon: 'settings', isMain: true, tag: 'Best Seller' },
    { id: 4, title: 'Mechanical Repairs', icon: 'hammer', isMain: true, tag: 'Expert Care' },
    { id: 5, title: 'Breakdown & Emergency', icon: 'warning' }, // Using 'warning' as a placeholder for alert/emergency
    { id: 6, title: 'Battery, Tyres & Parts', icon: 'disc' },
    { id: 7, title: 'Insurance & Legal', icon: 'document-text' },
    { id: 8, title: 'Doorstep Services', icon: 'home' },
];

export const SERVICE_DETAILS = {
    // A. Car Wash & Cleaning
    1: [
        { id: 'cw1', title: 'Exterior Wash', price: 499, description: 'Complete exterior body wash with high-pressure water and foam.', image: 'https://img.freepik.com/free-photo/man-washing-his-car-garage_1157-39327.jpg' },
        { id: 'cw2', title: 'Foam Wash', price: 699, description: 'Premium pH-balanced foam wash for deep cleaning and shine.', image: 'https://img.freepik.com/free-photo/car-wash-detailing-station_1303-22307.jpg' },
        { id: 'cw3', title: 'Interior Vacuum Cleaning', price: 399, description: 'Powerful vacuum cleaning of seats, carpets, and boot.', image: 'https://img.freepik.com/free-photo/car-detailing-studio-worker-vacuum-cleaning-seats_1303-22345.jpg' },
        { id: 'cw4', title: 'Dashboard Polishing', price: 299, description: 'Restores dashboard shine and protects against UV fading.', image: 'https://img.freepik.com/free-photo/hand-polishing-car-dashboard_1303-26612.jpg' },
        { id: 'cw5', title: 'Waterless Doorstep Wash', price: 599, description: 'Eco-friendly car wash at your designated location.', image: 'https://img.freepik.com/free-photo/cleaning-car-with-microfiber-cloth_1303-26633.jpg' },
        { id: 'cw6', title: 'Monthly Subscription', price: 1999, description: '4 exterior washes and 2 interior cleanings per month.', image: 'https://img.freepik.com/free-photo/calendar-reminder-subscription_23-2150062400.jpg' },
    ],
    // B. Car Detailing (Premium Services)
    2: [
        { id: 'cd1', title: 'Interior Deep Cleaning', price: 1499, description: 'Intensive cleaning of upholstery, roof, and floor mats.', image: 'https://img.freepik.com/free-photo/hand-disinfecting-car-interior_23-2148766157.jpg' },
        { id: 'cd2', title: 'Seat Shampooing', price: 999, description: 'Wet shampooing to remove stains and odors from seats.', image: 'https://img.freepik.com/free-photo/car-seat-cleaning_1303-26656.jpg' },
        { id: 'cd3', title: 'Leather Treatment', price: 1299, description: 'Conditioning and protection for leather seats and trims.', image: 'https://img.freepik.com/free-photo/car-leather-seats_1303-14576.jpg' },
        { id: 'cd4', title: 'Ceramic Coating', price: 9999, description: 'Long-lasting paint protection with hydrophobic properties.', image: 'https://img.freepik.com/free-photo/worker-polishing-car_1303-19642.jpg' },
        { id: 'cd5', title: 'Teflon / PPF Coating', price: 4999, description: 'Protective layer against scratches and minor abrasions.', image: 'https://img.freepik.com/free-photo/coating-car-paint_1303-22891.jpg' },
        { id: 'cd6', title: 'Engine Bay Cleaning', price: 599, description: 'Degreasing and cleaning of the engine compartment.', image: 'https://img.freepik.com/free-photo/car-engine-cleaning_1303-26701.jpg' },
    ],
    // C. Periodic Car Servicing
    3: [
        { id: 'ps1', title: 'General Servicing', price: 2999, description: 'Comprehensive checkup including fluid top-ups.', image: 'https://img.freepik.com/free-photo/auto-mechanic-checking-car_1303-14036.jpg' },
        { id: 'ps2', title: 'Oil & Filter Change', price: 1999, description: 'High-quality engine oil and oil filter replacement.', image: 'https://img.freepik.com/free-photo/mechanic-pouring-oil-into-engine_1303-19682.jpg' },
        { id: 'ps3', title: 'Brake Inspection', price: 699, description: 'Checking brake pads, discs, and fluid levels.', image: 'https://img.freepik.com/free-photo/mechanic-checking-brake-discs_1303-26645.jpg' },
        { id: 'ps4', title: 'AC Service', price: 1499, description: 'Cleaning AC vents, filter replacement, and gas top-up.', image: 'https://img.freepik.com/free-photo/mechanic-repairing-car-air-conditioner_1303-26792.jpg' },
        { id: 'ps5', title: 'Wheel Alignment', price: 899, description: 'Computerized wheel alignment and balancing.', image: 'https://img.freepik.com/free-photo/mechanic-adjusting-wheel-alignment_1303-26621.jpg' },
    ],
    // D. Mechanical Repairs
    4: [
        { id: 'mr1', title: 'Clutch Replacement', price: 4500, description: 'Replacement of clutch plate and pressure plate.', image: 'https://img.freepik.com/free-photo/mechanic-holding-clutch-disk_1303-26678.jpg' },
        { id: 'mr2', title: 'Suspension Work', price: 3500, description: 'Repair or replacement of shock absorbers and struts.', image: 'https://img.freepik.com/free-photo/mechanic-working-suspension_1303-22856.jpg' },
        { id: 'mr3', title: 'Brake Overhaul', price: 2500, description: 'Complete servicing of the braking system.', image: 'https://img.freepik.com/free-photo/car-brake-repair_1303-26689.jpg' },
        { id: 'mr4', title: 'Engine Diagnostics', price: 999, description: 'Scanning engine control unit for fault codes.', image: 'https://img.freepik.com/free-photo/mechanic-using-laptop-diagnose-car_1303-19634.jpg' },
        { id: 'mr5', title: 'Steering Repairs', price: 2999, description: 'Fixing steering rack, pump, or column issues.', image: 'https://img.freepik.com/free-photo/mechanic-inspecting-steering_1303-26712.jpg' },
    ],
    // E. Breakdown & Emergency Services
    5: [
        { id: 'be1', title: 'Roadside Assistance', price: 1499, description: '24/7 on-spot breakdown support.', image: 'https://img.freepik.com/free-photo/tow-truck-road_1303-19667.jpg' },
        { id: 'be2', title: 'Towing Service', price: 2499, description: 'Flatbed or tow truck service for vehicle transport.', image: 'https://img.freepik.com/free-photo/towing-car-road_1303-26723.jpg' },
        { id: 'be3', title: 'Jump-Start', price: 499, description: 'Battery jump-start service.', image: 'https://img.freepik.com/free-photo/mechanic-jump-starting-car_1303-26734.jpg' },
        { id: 'be4', title: 'Flat Tyre Support', price: 399, description: 'Puncture repair or stepney change.', image: 'https://img.freepik.com/free-photo/changing-car-wheel_1303-26745.jpg' },
    ],
    // F. Battery, Tyres & Spare Parts
    6: [
        { id: 'bt1', title: 'Battery Replacement', price: 4999, description: 'New battery installation with warranty.', image: 'https://img.freepik.com/free-photo/car-battery_1303-19612.jpg' },
        { id: 'bt2', title: 'Tyre Replacement', price: 3999, description: 'Brand new tyres with fitting and balancing.', image: 'https://img.freepik.com/free-photo/stack-new-tires_1303-19690.jpg' },
        { id: 'bt3', title: 'Puncture Repair', price: 199, description: 'Tubeless tyre puncture repair.', image: 'https://img.freepik.com/free-photo/repairing-flat-tire_1303-26756.jpg' },
        { id: 'bt4', title: 'Genuine Spares', price: 0, description: 'Original manufacturer spare parts on demand.', image: 'https://img.freepik.com/free-photo/spare-parts-store_1303-26767.jpg' }, // Price 0 or On Request
    ],
    // G. Insurance & Legal Services
    7: [
        { id: 'il1', title: 'Insurance Renewal', price: 0, description: 'Instant policy renewal with best quotes.', image: 'https://img.freepik.com/free-photo/insurance-policy-document_1303-26778.jpg' },
        { id: 'il2', title: 'Claim Assistance', price: 499, description: 'End-to-end support for insurance claims.', image: 'https://img.freepik.com/free-photo/car-damage-inspection_1303-26789.jpg' },
        { id: 'il3', title: 'RC Transfer', price: 1499, description: 'Ownership transfer documentation support.', image: 'https://img.freepik.com/free-photo/signing-documents_1303-26800.jpg' },
        { id: 'il4', title: 'FASTag Services', price: 499, description: 'New FASTag issuance or recharge support.', image: 'https://img.freepik.com/free-photo/toll-booth_1303-26811.jpg' },
        { id: 'il5', title: 'Extended Warranty', price: 4999, description: 'Extend your car warranty for peace of mind.', image: 'https://img.freepik.com/free-photo/warranty-document_1303-26822.jpg' },
    ],
    // H. Doorstep & Value-Added Services
    8: [
        { id: 'dv1', title: 'Pickup & Drop', price: 299, description: 'Hassle-free vehicle pickup and drop service.', image: 'https://img.freepik.com/free-photo/valet-driver_1303-26833.jpg' },
        { id: 'dv2', title: 'Mobile Mechanic', price: 699, description: 'Expert mechanic at your doorstep.', image: 'https://img.freepik.com/free-photo/mechanic-visiting-home_1303-26844.jpg' },
        { id: 'dv3', title: 'On-site Repairs', price: 499, description: 'Minor repairs and fixes at your location.', image: 'https://img.freepik.com/free-photo/repairing-car-street_1303-26855.jpg' },
        { id: 'dv4', title: 'Fleet Maintenance', price: 0, description: 'Customized plans for corporate fleets.', image: 'https://img.freepik.com/free-photo/fleet-cars_1303-26866.jpg' },
    ],
};
