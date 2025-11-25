// components/location/LocationInput.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaCrosshairs, FaChevronDown } from "react-icons/fa";
import LocationModal from "./LocationModal";
import { useDispatch } from "react-redux";
import { setLocation as setLocationAction } from "../../store/reducerSlice/locationSlice";
import { reverseGeocode } from "../../hook/useGeocode";
import { searchPlaces } from "../../api/searchPlaces";

const LocationInput = ({ onLocationChosen }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [recent, setRecent] = useState([]);
    const ref = useRef();
    const recentLocations = JSON.parse(localStorage.getItem("recentLocations")) || [];

    useEffect(() => {
        setRecent(recentLocations);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const onChange = async (e) => {
        const v = e.target.value;
        setValue(v);

        if (!v) {
            setFiltered([]);
            setOpenDropdown(false);
            return;
        }

        const results = await searchPlaces(v);
        setFiltered(results);
        setOpenDropdown(true);
    };

    const saveAndDispatch = (city, raw = null) => {
        // compute stable string for city
        const cityName = (typeof city === 'string' && city.trim())
            ? city.trim()
            : (raw && (raw.city || raw.name))
                ? String(raw.city || raw.name).trim()
                : 'Unknown';

        // save recent (always strings)
        const stored = recentLocations || [];
        const updated = [cityName, ...stored.filter((s) => s !== cityName)].slice(0, 5);
        localStorage.setItem("recentLocations", JSON.stringify(updated));
        setRecent(updated);

        // dispatch global location
        dispatch(setLocationAction({ city: cityName, raw }));
        setValue(cityName);
        setOpenDropdown(false);
        if (onLocationChosen) onLocationChosen({ city: cityName, raw });
    };


    const handleDetect = () => {
        if (!navigator.geolocation) return alert("Location not supported");
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                const geo = await reverseGeocode(latitude, longitude);
                saveAndDispatch(geo.city || "Unknown", geo.raw || geo);
            },
            () => alert("Unable to detect location")
        );
    };

    // choose from dropdown / recent
    const choose = (place) => {
        const city = place && (place.city || place.name) ? (place.city || place.name) : String(place || 'Unknown');
        saveAndDispatch(city, place);
    };

    return (
        <>
            <div ref={ref} className="relative">
                <div
                    className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 cursor-text"
                    onClick={() => setOpenDropdown((s) => !s)}
                >
                    <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
                    <input
                        value={value}
                        onChange={onChange}
                        placeholder="Location"
                        className="bg-transparent outline-none md:w-28 w-16 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500"
                    />
                    <button onClick={(e) => { e.stopPropagation(); handleDetect(); }} className="p-1 text-blue-600 dark:text-blue-400">
                        <FaCrosshairs />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setModalOpen(true); }} className="p-1 text-blue-600 dark:text-blue-400">
                        <FaChevronDown />
                    </button>
                </div>

                {openDropdown && (
                    <div className="absolute top-12 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-2 z-50 border border-gray-200 dark:border-gray-700">
                        {value && filtered.length > 0 ? (
                            filtered.map((place, idx) => {
                                // pick the best id available
                                const placeKey = place.place_id || place.id || `${place.city || place.name || 'place'}-${idx}`;
                                const title = place.city || place.name || 'Unknown place';
                                const subtitle = place.name || '';

                                return (
                                    <div
                                        key={placeKey}
                                        onClick={() => choose(place)}
                                        className="px-3 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md cursor-pointer"
                                    >
                                        <div className="font-medium dark:text-gray-200">{title}</div>
                                        <div className="text-xs text-gray-500">{subtitle}</div>
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                {recent.length > 0 && <div className="text-xs text-gray-500 dark:text-gray-400 px-2 mb-1">Recent</div>}
                                {recent.map((r, idx) => {
                                    // r should now be a string thanks to saveAndDispatch, but use a fallback key
                                    const recentKey = `${String(r || 'recent')}-${idx}`;
                                    return (
                                        <div
                                            key={recentKey}
                                            onClick={() => choose({ city: r })}
                                            className="px-3 py-2 text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200 rounded-md cursor-pointer"
                                        >
                                            {r}
                                        </div>
                                    );
                                })}
                                <div className="text-xs text-gray-400 px-2 mt-2">Tip: Click the arrow for full screen picker</div>
                            </>
                        )}

                    </div>
                )}
            </div>

            <LocationModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSelect={(payload) => {
                    saveAndDispatch(payload.city, payload.raw || null);
                }}
            />
        </>
    );
};

export default LocationInput;
