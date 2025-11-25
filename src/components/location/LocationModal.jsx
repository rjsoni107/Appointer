// components/location/LocationModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaCrosshairs, FaTimes, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { reverseGeocode } from "../../hook/useGeocode";
import { searchPlaces } from "../../api/searchPlaces";

const defaultCities = [
    { name: "Delhi, India", city: "Delhi" },
    { name: "Noida, Uttar Pradesh, India", city: "Noida" },
    { name: "Gurgaon, Haryana, India", city: "Gurgaon" },
    { name: "Ghaziabad, Uttar Pradesh, India", city: "Ghaziabad" },
    { name: "Faridabad, Haryana, India", city: "Faridabad" },
    { name: "Hisar, Haryana, India", city: "Hisar" },
    { name: "Mujafrnagar, Uttar Pradesh, India", city: "Mujafrnagar" }
];

const LocationModal = ({ open, onClose, onSelect }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [recent, setRecent] = useState([]);
    const ref = useRef();
    const stored = JSON.parse(localStorage.getItem("recentLocations")) || [];

    useEffect(() => {
        setRecent(stored);
    }, [open]);

    useEffect(() => {
        let timer = setTimeout(async () => {
            if (!query) {
                setResults(defaultCities);
                return;
            }

            const results = await searchPlaces(query);
            setResults(results);
        }, 300); // debounce for smooth typing

        return () => clearTimeout(timer);
    }, [query]);


    // Auto-detect
    const handleDetect = () => {
        if (!navigator.geolocation) {
            alert("Browser does not support geolocation");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                const geo = await reverseGeocode(latitude, longitude);
                if (geo.city) {
                    selectLocation(geo.city, geo);
                } else {
                    alert("Unable to determine city from GPS");
                }
            },
            () => alert("Unable to detect location")
        );
    };

    const saveRecent = (city) => {
        const updated = [city, ...stored.filter((c) => c !== city)].slice(0, 5);
        localStorage.setItem("recentLocations", JSON.stringify(updated));
        setRecent(updated);
    };

    const selectLocation = (city, raw = null) => {
        saveRecent(city);
        onSelect({ city, raw });
        onClose();
    };

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start md:items-center justify-center p-4">
            <div ref={ref} className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-blue-600" />
                        <input
                            className="w-96 bg-transparent outline-none text-lg dark:text-gray-200 placeholder-gray-500"
                            placeholder="Search city or area (e.g., Noida, Sector 18)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={handleDetect} className="px-3 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center gap-2">
                            <FaCrosshairs /> Auto-detect
                        </button>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="p-4 max-h-96 overflow-auto">
                    {recent.length > 0 && (
                        <div className="mb-3">
                            <h4 className="text-sm text-gray-500 mb-2 flex items-center gap-2"><FaClock /> Recent</h4>
                            <div className="flex flex-wrap gap-2">
                                {recent.map((r) => (
                                    <button key={r} onClick={() => selectLocation(r)} className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h4 className="text-sm text-gray-500 mb-2">Suggestions</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {results.map((place, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => selectLocation(place.city || place.name, place)}
                                    className="flex items-start gap-2 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800"
                                >
                                    <FaMapMarkerAlt className="text-blue-600 mt-1" />

                                    <div>
                                        <div className="font-medium text-gray-700 dark:text-gray-200 text-justify">
                                            {place.city || place.name}
                                        </div>

                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {place.name}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
