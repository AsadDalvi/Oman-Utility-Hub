// backend/data engine.js

// 1. Fuel Prices in Baisas
const FUEL_PRICES = {
    M91: 229,
    M95: 239,
    Diesel: 258
};


// 2. Fuel consumption rates by liters per 100 Kilometers
const VEHICLE_EFFICIENCY = {
    Sedan: { "1.5L-2.0L": 7.0, "2.5L-3.5L": 9.0, "4.0L+": 12.0 },
    Crossover: { "1.5L-2.0L": 8.0, "2.5L-3.5L": 10.0, "4.0L+": 13.0 },
    SUV: { "1.5L-2.0L": 9.5, "2.5L-3.5L": 12.0, "4.0L+": 15.5 },
    Pickup: { "1.5L-2.0L": 10.0, "2.5L-3.5L": 13.0, "4.0L+": 16.0 }
};


// 3. Driving Distance Matrix between Oman Locations in Kilometers via Main Highways only
const DISTANCE_MATRIX = {
  "Al Maabilah": { "Al Maabilah": 0, "Ruwi": 45, "Seeb": 15, "Al Khuwair": 32, "Muttrah": 48, "Barka": 25, "Sohar": 185, "Musannah": 65, "Samail": 55, "Amerat": 50, "Ansab": 28, "Salalah": 1010, "Al Khoud": 12 },
  "Ruwi": { "Al Maabilah": 45, "Ruwi": 0, "Seeb": 35, "Al Khuwair": 15, "Muttrah": 7, "Barka": 68, "Sohar": 225, "Musannah": 108, "Samail": 62, "Amerat": 18, "Ansab": 24, "Salalah": 1030, "Al Khoud": 38 },
  "Seeb": { "Al Maabilah": 15, "Ruwi": 35, "Seeb": 0, "Al Khuwair": 22, "Muttrah": 40, "Barka": 38, "Sohar": 195, "Musannah": 78, "Samail": 58, "Amerat": 48, "Ansab": 25, "Salalah": 1015, "Al Khoud": 8 },
  "Al Khuwair": { "Al Maabilah": 32, "Ruwi": 15, "Seeb": 22, "Al Khuwair": 0, "Muttrah": 20, "Barka": 55, "Sohar": 210, "Musannah": 95, "Samail": 52, "Amerat": 25, "Ansab": 14, "Salalah": 1020, "Al Khoud": 25 },
  "Muttrah": { "Al Maabilah": 48, "Ruwi": 7, "Seeb": 40, "Al Khuwair": 20, "Muttrah": 0, "Barka": 72, "Sohar": 230, "Musannah": 112, "Samail": 68, "Amerat": 22, "Ansab": 28, "Salalah": 1035, "Al Khoud": 42 },
  "Barka": { "Al Maabilah": 25, "Ruwi": 68, "Seeb": 38, "Al Khuwair": 55, "Muttrah": 72, "Barka": 0, "Sohar": 160, "Musannah": 40, "Samail": 75, "Amerat": 78, "Ansab": 52, "Salalah": 990, "Al Khoud": 35 },
  "Sohar": { "Al Maabilah": 185, "Ruwi": 225, "Seeb": 195, "Al Khuwair": 210, "Muttrah": 230, "Barka": 160, "Sohar": 0, "Musannah": 120, "Samail": 215, "Amerat": 235, "Ansab": 202, "Salalah": 1170, "Al Khoud": 195 },
  "Musannah": { "Al Maabilah": 65, "Ruwi": 108, "Seeb": 78, "Al Khuwair": 95, "Muttrah": 112, "Barka": 40, "Sohar": 120, "Musannah": 0, "Samail": 110, "Amerat": 118, "Ansab": 90, "Salalah": 1050, "Al Khoud": 75 },
  "Samail": { "Al Maabilah": 55, "Ruwi": 62, "Seeb": 58, "Al Khuwair": 52, "Muttrah": 68, "Barka": 75, "Sohar": 215, "Musannah": 110, "Samail": 0, "Amerat": 40, "Ansab": 35, "Salalah": 960, "Al Khoud": 50 },
  "Amerat": { "Al Maabilah": 50, "Ruwi": 18, "Seeb": 48, "Al Khuwair": 25, "Muttrah": 22, "Barka": 78, "Sohar": 235, "Musannah": 118, "Samail": 40, "Amerat": 0, "Ansab": 20, "Salalah": 1010, "Al Khoud": 45 },
  "Ansab": { "Al Maabilah": 28, "Ruwi": 24, "Seeb": 25, "Al Khuwair": 14, "Muttrah": 28, "Barka": 52, "Sohar": 202, "Musannah": 90, "Samail": 35, "Amerat": 20, "Ansab": 0, "Salalah": 1000, "Al Khoud": 22 },
  "Salalah": { "Al Maabilah": 1010, "Ruwi": 1030, "Seeb": 1015, "Al Khuwair": 1020, "Muttrah": 1035, "Barka": 990, "Sohar": 1170, "Musannah": 1050, "Samail": 960, "Amerat": 1010, "Ansab": 1000, "Salalah": 0, "Al Khoud": 1005 },
  "Al Khoud": { "Al Maabilah": 12, "Ruwi": 38, "Seeb": 8, "Al Khuwair": 25, "Muttrah": 42, "Barka": 35, "Sohar": 195, "Musannah": 75, "Samail": 50, "Amerat": 45, "Ansab": 22, "Salalah": 1005, "Al Khoud": 0 }
};


// 4. Rent & Home Utility Engine according to Authority for Public Services Regulation (APSR) Tariffs
// FIXED: Renamed function to match your server.js API request references! [🔗]
function calculateRentUtilities(propertySize, acUsageHours, includeWaterHeater) {
    
    // 7BHK Easter Egg Trigger (Sends a flag to freeze the UI)
    if (propertySize === "7BHK") {
        return { isEasterEgg: true };
    }

    // Base Load (kWh) and AC Count Scaling for EVERY home/villa size
    let baseLoad = 500; 
    let acCount = 1;

    if (propertySize === "1BHK") {
        baseLoad = 400;
        acCount = 1;
    } else if (propertySize === "2BHK") {
        baseLoad = 700;
        acCount = 2;
    } else if (propertySize === "3BHK") {
        baseLoad = 1100;
        acCount = 3;
    } else if (propertySize === "4BHK") {
        baseLoad = 1400;
        acCount = 4;
    } else if (propertySize === "5BHK") {
        baseLoad = 1700;
        acCount = 5;
    } else if (propertySize === "6BHK") {
        baseLoad = 2000;
        acCount = 6;
    } else if (propertySize === "Villa") {
        baseLoad = 2500;
        acCount = 7;
    }
    
    // Total AC consumption formula (Count * Daily Hours * 1.5 kWh * 30 days)
    let acConsumption = acCount * acUsageHours * 1.5 * 30; 

    // Winter Water Heater Penalty rule
    let heaterConsumption = includeWaterHeater ? (acCount * 3 * 30) : 0;

    // Summing total monthly units used
    let totalKwh = baseLoad + acConsumption + heaterConsumption;

    // Official APSR Tariff Pricing Slabs from Nama (Converts baisas to OMR) 
    let electricityCostOMR = 0;
    if (totalKwh <= 4000) {
        electricityCostOMR = (totalKwh * 14) / 1000;
    } else if (totalKwh <= 6000) {
        electricityCostOMR = ((4000 * 14) + ((totalKwh - 4000) * 18)) / 1000;
    } else {
        electricityCostOMR = ((4000 * 14) + (2000 * 18) + ((totalKwh - 6000) * 32)) / 1000;
    }

    // Flat rate estimation for water bills based on size
    let waterCostOMR;
    if (
        propertySize === "Villa" ||
        propertySize === "6BHK" ||
        propertySize === "5BHK"
    ) {
        waterCostOMR = 18;
    } else {
        waterCostOMR = 8;
    }

    // Eco-savings prediction logic which is 20% reduction in target
    let potentialSavingsOMR = electricityCostOMR * 0.20;

    // Return all calculated utility costs and savings
    return {
        isEasterEgg: false,
        totalKwh: Math.round(totalKwh),
        electricityBill: Number(electricityCostOMR.toFixed(3)),
        waterBill: waterCostOMR,
        utilityTotal: Number((electricityCostOMR + waterCostOMR).toFixed(3)),
        potentialSavings: Number(potentialSavingsOMR.toFixed(3))
    };
}


// 5. Fuel Cost Engine
function calculateFuelCommute(startPoint, endPoint, carType, engineSize, fuelType, daysPerMonth) {

    // Get distance between selected locations
    const distanceLookup = DISTANCE_MATRIX[startPoint]?.[endPoint];
    const oneWayDistance = distanceLookup !== undefined ? distanceLookup : 15; 

    // FIXED: Replaced 'distanceKm' with 'oneWayDistance' to resolve your reference error crash! [🔗]
    const totalKmPerMonth = oneWayDistance * 2 * daysPerMonth;

    // Get vehicle fuel consumption (L/100km)
    const efficiency = VEHICLE_EFFICIENCY[carType]?.[engineSize] || 8.0;

    // Calculate monthly fuel usage
    const totalLiters = (totalKmPerMonth / 100) * efficiency;

    // Get fuel price per liter
    const pricePerLiterBaisa = FUEL_PRICES[fuelType] || 229;

    // Calculate monthly fuel cost
    const totalCostOMR = (totalLiters * pricePerLiterBaisa) / 1000;

    // Estimate potential fuel savings (20%)
    const fuelSavingsOMR = totalCostOMR * 0.20;

    return {
        oneWayDistance: oneWayDistance, // FIXED here as well
        monthlyDistance: totalKmPerMonth,
        litersConsumed: Number(totalLiters.toFixed(1)),
        monthlyCost: Number(totalCostOMR.toFixed(3)),
        potentialSavings: Number(fuelSavingsOMR.toFixed(3))
    };
}


// Exporting all functions so server.js can import them
// FIXED: Realigned export pointer name to connect with server dependencies! [🔗]
module.exports = { calculateRentUtilities, calculateFuelCommute };
