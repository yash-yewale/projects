// Initialize the map
let map = L.map('map').setView([19.033, 73.029], 13); // Centered around Navi Mumbai

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let isCenterScheduled = false; // Track if a center is already scheduled

// Geolocation API to detect user location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        map.setView([userLat, userLon], 13);

        // Add user location marker
        const userMarker = L.marker([userLat, userLon]).addTo(map)
            .bindPopup("You are here!")
            .openPopup();

        // Display nearby recycling centers
        displayNearbyCenters(userLat, userLon);
    });
} else {
    alert("Geolocation is not supported by this browser.");
}

// Accurate recycling centers across Navi Mumbai and Mumbai
const recyclingCenters = [
    // Navi Mumbai Centers

    { name: "GreenTech Waste Management", lat: 19.0468, lon: 73.0209, info: "Gala 13, Juinagar, Navi Mumbai, Maharashtra 400708" },
    { name: "EcoClean Recycling Hub", lat: 19.0207, lon: 73.0138, info: "Shop 7, Sector 9, Seawoods, Navi Mumbai, Maharashtra 400703" },
    { name: "RecycloTech Waste Solutions", lat: 19.0735, lon: 73.0153, info: "Industrial Area, Turbhe Naka, Navi Mumbai, Maharashtra 400706" },
    { name: "Sustainable Recycling Center", lat: 19.0437, lon: 73.0130, info: "Plot 18, Sector 10, Nerul, Navi Mumbai, Maharashtra 400614" },
    { name: "ProRecycling Services", lat: 19.0155, lon: 73.0356, info: "CBD Belapur west, Navi Mumbai, Maharashtra 400709" },
    { name: "MahaRecycle Industries", lat: 19.0724, lon: 73.0266, info: "MIDC Industrial Estate, Turbhe, Navi Mumbai, Maharashtra 400705" },
    { name: "GreenFuture Kharghar", lat: 19.0342, lon: 73.0695, info: "Sector 20, Kharghar, Navi Mumbai, Maharashtra 410210" },
    { name: "Kalamboli Eco Hub", lat: 19.0022, lon: 73.1080, info: "Sector 1, Kalamboli, Navi Mumbai, Maharashtra 410218" },
    { name: "Taloja Recycling Services", lat: 19.0605, lon: 73.1240, info: "Taloja Industrial Area, Navi Mumbai, Maharashtra 410208" },
    

    // Mumbai Centers
    { name: "Mumbai Recycling Hub", lat: 19.0694, lon: 72.8421, info: "Dadar, Mumbai, Maharashtra 400014" },
    { name: "CleanTech Waste Management", lat: 19.1154, lon: 72.8596, info: "Andheri East, Mumbai, Maharashtra 400059" },
    { name: "Metro Recyclers", lat: 19.1552, lon: 72.8420, info: "Goregaon, Mumbai, Maharashtra 400063" },
    { name: "GreenCircle Waste Management", lat: 19.1240, lon: 72.8383, info: "Jogeshwari West, Mumbai, Maharashtra 400102" },
    { name: "Bandra Recycling Center", lat: 19.0585, lon: 72.8313, info: "Bandra West, Mumbai, Maharashtra 400050" },
    { name: "Waste Solutions Santacruz", lat: 19.0804, lon: 72.8359, info: "Santacruz West, Mumbai, Maharashtra 400054" },
    { name: "South Mumbai Recycling Center", lat: 18.9330, lon: 72.8345, info: "Colaba, Mumbai, Maharashtra 400005" },
    { name: "RecycloHub Worli", lat: 19.0170, lon: 72.8373, info: "Worli, Mumbai, Maharashtra 400018" },
    { name: "Kandivali Recycle Services", lat: 19.1976, lon: 72.8455, info: "Kandivali East, Mumbai, Maharashtra 400101" },
    { name: "Chembur Green Recyclers", lat: 19.0674, lon: 72.9068, info: "Chembur, Mumbai, Maharashtra 400074" },
    { name: "Vikhroli Waste Management", lat: 19.1100, lon: 72.9200, info: "Vikhroli West, Mumbai, Maharashtra 400079" },
    { name: "ReGreen Services Mulund", lat: 19.1656, lon: 72.9520, info: "Mulund West, Mumbai, Maharashtra 400080" },
    { name: "Sion Eco Recycling", lat: 19.0429, lon: 72.8666, info: "Sion, Mumbai, Maharashtra 400022" },
    { name: "Juhu Waste Recyclers", lat: 19.0955, lon: 72.8288, info: "Juhu, Mumbai, Maharashtra 400049" },
    { name: "Powai Sustainable Recycling", lat: 19.1150, lon: 72.9070, info: "Powai, Mumbai, Maharashtra 400076" },
    { name: "Ghatkopar Eco Hub", lat: 19.0860, lon: 72.9193, info: "Ghatkopar East, Mumbai, Maharashtra 400075" }
];

// Function to display nearby centers within 5km radius
function displayNearbyCenters(userLat, userLon) {
    const centerListDiv = document.getElementById('center-list'); // The div where we will display the list of centers
    centerListDiv.innerHTML = ''; // Clear previous content

    const nearbyCenters = recyclingCenters.filter(center => {
        const distance = calculateDistance(userLat, userLon, center.lat, center.lon);
        return distance <= 3; // Centers within 5 km
    });

    if (nearbyCenters.length === 0) {
        centerListDiv.innerHTML = '<p>No nearby recycling centers found within 5 km.</p>';
    } else {
        nearbyCenters.forEach(center => {
            // Create a new div for each center
            const centerDiv = document.createElement('div');
            centerDiv.classList.add('center-item');

            centerDiv.innerHTML = `
                <h3>${center.name}</h3>
                <p>${center.info}</p>
                <button onclick="schedulePickup('${center.name}')">Schedule Pickup</button>
            `;

            centerListDiv.appendChild(centerDiv);

            // Add center marker to the map
            const marker = L.marker([center.lat, center.lon], {
                icon: L.icon({
                    iconUrl: 'centermarker.webp', // Custom icon for recycling centers
                    iconSize: [30, 40]
                })
            }).addTo(map);

            marker.bindPopup(`<strong>${center.name}</strong><br>${center.info}`);
        });
    }
}

// Calculate distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLon / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Schedule pickup function
function schedulePickup(centerName) {
    if (isCenterScheduled) {
        alert("You have already scheduled a pickup. Only one center can be scheduled.");
        return;
    }

    // Professional alert message
    alert(`Scheduling successful for ${centerName}! Further details will be emailed to you. Please be ready with the recycling material.`);

    // Set flag to prevent scheduling another center
    isCenterScheduled = true;

    // Show thank you popup
    showThankYouPopup();
}

// Thank you popup
function showThankYouPopup() {
    const popup = document.createElement('div');
    popup.classList.add('thank-you-popup');
    popup.innerHTML = `
        <h2>Thank You for Choosing BinBuddy!</h2>
        <p>We appreciate your efforts in contributing to a cleaner and greener planet. We will notify you with further details via email. Keep your recycling materials ready for collection!</p>
        <button onclick="closeThankYouPopup()">Close</button>
    `;
    document.body.appendChild(popup);
}

// Close thank you popup
function closeThankYouPopup() {
    const popup = document.querySelector('.thank-you-popup');
    if (popup) {
        popup.remove();
    }
}

// Search for a location using Nominatim and display nearby centers
document.getElementById('searchLocation').addEventListener('click', () => {
    const address = document.getElementById('locationInput').value;
    geocodeAddress(address);
});

function geocodeAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                map.setView([lat, lon], 13);
                displayNearbyCenters(lat, lon);

                // Scroll down to the centers near you section
                document.getElementById('center-info').scrollIntoView({ behavior: 'smooth' });
            } else {
                alert("Location not found. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
        });
}
