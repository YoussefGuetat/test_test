// src/application/addressValidation.ts
import axios from 'axios';

const PARIS_LAT = 48.8566; // Latitude of Paris
const PARIS_LON = 2.3522;  // Longitude of Paris
const EARTH_RADIUS_KM = 6371; // Earth's radius in kilometers

// Function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS_KM * c; // Distance in kilometers
}

// Function to validate the address
export const validateAddress = async (address: string): Promise<boolean> => {
    try {
        const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}`);
        
        if (response.data.features.length > 0) {
            const { geometry } = response.data.features[0];
            const lat = geometry.coordinates[1]; // Latitude
            const lon = geometry.coordinates[0]; // Longitude

            const distance = calculateDistance(PARIS_LAT, PARIS_LON, lat, lon);
            return distance <= 50; // Check if within 50 km
        }
        return false; // Address not found
    } catch (error) {
        console.error('Error validating address:', error);
        return false; // Handle API errors
    }
};
