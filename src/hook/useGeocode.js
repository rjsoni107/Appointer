// hooks/useGeocode.js
export async function reverseGeocode(lat, lon) {
    // Using OpenStreetMap Nominatim (no key). Good for dev / demo.
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        // return useful fields
        return {
            city:
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.county ||
                data.address.state ||
                "",
            raw: data,
        };
    } catch (err) {
        console.error("reverseGeocode error:", err);
        return { city: "", raw: null };
    }
}
