const express = require('express');
const router = express.Router();

const axios = require('axios');
require('dotenv').config();

// Find Place route
router.get('/food-search', async (req, res) => {
    const { cuisine, priceRange, latitude, longitude } = req.query; // Get input and inputType from query parameters
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Load your API key from .env file

    if (!cuisine || !priceRange) {
        return res.status(400).json({ error: 'Input is required' });
    }

    try {
        // Construct the Find Place request URL
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address,name,rating,opening_hours,place_id&input=${encodeURIComponent(cuisine)}%20restaurant%20with%20price%20${encodeURIComponent(priceRange)}&inputtype=textquery&locationbias=circle:2000@${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&key=${apiKey}`;

        // Make the API request
        const response = await axios.get(url);
        
        // Send the results back to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Google Maps API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from Google Maps API' });
    }
});


module.exports = router;