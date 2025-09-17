exports.getLocation = async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).json({
            message: "Latitude and Longitude are required",
        });
    }

    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;

        const locationResponse = await fetch(url, {
            headers: {
                "User-Agent": "LyubaApp/1.0 (mehul@example.com)",
                "Accept-Language": "en",
            },
        });

        // If response isn't JSON
        const contentType = locationResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await locationResponse.text();
            console.error("Nominatim returned non-JSON:", text.slice(0, 200));
            return res.status(502).json({
                message: "Bad response from location service",
            });
        }

        const data = await locationResponse.json();
        const address = data.address || {};
        const city =
            address.city ||
            address.town ||
            address.village ||
            address.hamlet ||
            null;
        const postcode = address.postcode || null;

        if (city || postcode) {
            return res.status(200).json({
                message: "Location received",
                response: { city, pincode: postcode },
            });
        } else {
            return res.status(404).json({
                message: "Location not found",
                response: { error: "Could not fetch location information" },
            });
        }
    } catch (error) {
        console.error("Fetch error:", error);
        return res.status(500).json({
            message: "Internal server error",
            response: { error: error.message },
        });
    }
};
