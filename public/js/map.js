mapboxgl.accessToken = mapToken;

// Initialize map with better style & controls
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', // better visual style
    center: listing.geometry.coordinates,
    zoom: 10,
    pitch: 45, // slight 3D tilt
    bearing: -10 // angled view
});

// Add navigation controls (zoom + rotation)
map.addControl(new mapboxgl.NavigationControl());

// Add fullscreen button
map.addControl(new mapboxgl.FullscreenControl());

// Add geolocation (user current location)
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
    })
);

// Create popup with better UI
const popup = new mapboxgl.Popup({ offset: 30 }).setHTML(`
    <div style="font-family: sans-serif;">
        <h3 style="margin:0;">${listing.title}</h3>
        <p style="margin:5px 0; color:gray;">
            Exact location provided after booking
        </p>
    </div>
`);

// Create marker with animation
const marker = new mapboxgl.Marker({
    color: "#e63946", // modern red
    scale: 1.2
})
.setLngLat(listing.geometry.coordinates)
.setPopup(popup)
.addTo(map);

// Fly animation when map loads
map.on('load', () => {
    map.flyTo({
        center: listing.geometry.coordinates,
        zoom: 12,
        speed: 1.2,
        curve: 1.4,
        essential: true
    });
});