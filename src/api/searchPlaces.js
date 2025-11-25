// api/searchPlaces.js

export async function searchPlaces(query) {
    if (!query) return [];

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=8`;

    try {
        const res = await fetch(url, {
            headers: {
                "User-Agent": "Appointer-Location-Search"
            }
        });

        const data = await res.json();

        return data.map((item) => ({
            name: item.display_name,
            city:
                item.address.city ||
                item.address.town ||
                item.address.village ||
                item.address.state ||
                "",
            lat: item.lat,
            lon: item.lon,
            raw: item,
        }));
    } catch (err) {
        console.error("Nominatim Error:", err);
        return [];
    }
}
