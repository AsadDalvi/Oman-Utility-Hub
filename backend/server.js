// backend/server.js

// 1. Importing our free web server tools
const express = require('express');
const cors = require('cors');


// 2. Importing our math engine functions from data engine.js file
const { calculateRentUtilities, calculateFuelCommute } = require('./data engine');


// 3. Initializing the Express web app server
const app = express();


// 4. Turning on CORS (Cross-Origin Resource Sharing) so our React frontend screen can talk to this server on Port 5000
app.use(cors());


// 5. Enabling JSON reading so our server can understand incoming data from user forms
app.use(express.json());


// 6. This is PATHWAY 1 of Rent & Utility Calculator Route
// Listens for property size and AC hours, runs the math, and returns the bill summary
app.post('/api/rent', (req, res) => {
    
    const { propertySize, acUsageHours, includeWaterHeater } = req.body; // Read the inputs sent from the frontend user forms

    const result = calculateRentUtilities(propertySize, acUsageHours, includeWaterHeater); // Send the inputs to our data engine to process the Oman Nama/APSR tariff math

    res.json(result);
});


// 7. This is PATHWAY 2 of The Fuel Commute Calculator Route
// Listens for travel details, looks up our distance matrix, and returns the fuel cost summary
app.post('/api/fuel', (req, res) => {
    
    const { startPoint, endPoint, carType, engineSize, fuelType, daysPerMonth } = req.body; // Read the driving configurations sent from the frontend user forms
    
    const result = calculateFuelCommute(startPoint, endPoint, carType, engineSize, fuelType, daysPerMonth); // Send the configuration details to our data engine to compute the distance and cost totals
    
    res.json(result);
});


// 8. Defining our local network pathway (Port 5000)
const PORT = 5000;


// 9. Boot up the backend engine and start listening for user traffic
app.listen(PORT, () => {
    console.log(`Oman Utility Hub Server running smoothly on http://localhost:${PORT}`);
});
