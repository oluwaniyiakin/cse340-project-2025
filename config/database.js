const fs = require("fs");
const path = require("path");

// Path to vehicles.json file
const filePath = path.join(__dirname, "../data/vehicles.json");

// Function to read and parse JSON data
function readData() {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading vehicles.json:", error);
        return [];
    }
}

// Function to save data back to the JSON file (for future updates)
function saveData(data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
        console.error("Error writing to vehicles.json:", error);
    }
}

module.exports = { readData, saveData };
