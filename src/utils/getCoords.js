const getCoords = () => {
    return new Promise((resolve, reject) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
        };

        const success = (pos) => {
            const coords = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            };
            resolve(coords);
        };

        const error = (err) => {
            console.error("Error getting user location:", err);
            reject(null);
        };

        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            console.error("Geolocation is not supported by this browser.");
            reject(null);
        }
    });
};

export default getCoords;