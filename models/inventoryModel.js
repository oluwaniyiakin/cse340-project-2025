const pool = require("../database");

/* ***********************
 * 1️⃣ Get all vehicle classifications
 *************************/
async function getClassifications() {
    try {
        const result = await pool.query(
            "SELECT classification_id, classification_name FROM classification ORDER BY classification_name;"
        );
        return result.rows;
    } catch (error) {
        console.error("❌ Error fetching classifications:", error.message);
        throw error;
    }
}

/* ***********************
 * 2️⃣ Get all vehicles by classification ID
 *************************/
async function getInventoryByClassification(classification_id) {
    try {
        const result = await pool.query(
            `SELECT inventory_id, classification_id, inv_make, inv_model, inv_year, inv_price, inv_mileage, inv_description, inv_image 
             FROM inventory 
             WHERE classification_id = $1 
             ORDER BY inv_year DESC, inv_make, inv_model;`,
            [classification_id]
        );
        return result.rows;
    } catch (error) {
        console.error(`❌ Error fetching inventory for classification ${classification_id}:`, error.message);
        throw error;
    }
}

/* ***********************
 * 3️⃣ Get a single vehicle by ID (including multiple images)
 *************************/
async function getVehicleById(inv_id) {
    try {
        const vehicleResult = await pool.query(
            `SELECT inventory_id, classification_id, inv_make, inv_model, inv_year, inv_price, inv_mileage, inv_description, inv_image 
             FROM inventory WHERE inventory_id = $1;`,
            [inv_id]
        );
        
        let vehicle = vehicleResult.rows[0];
        
        if (vehicle) {
            const imageResults = await pool.query(
                "SELECT image_url FROM vehicle_images WHERE vehicle_id = $1;",
                [inv_id]
            );
            vehicle.images = imageResults.rows.map(row => row.image_url);
        }

        return vehicle;
    } catch (error) {
        console.error(`❌ Error fetching vehicle with ID ${inv_id}:`, error.message);
        throw error;
    }
}

/* ***********************
 * 4️⃣ Add a new vehicle
 *************************/
async function addVehicle({ classification_id, make, model, year, price, mileage, description, image_url }) {
    try {
        const result = await pool.query(
            `INSERT INTO inventory (classification_id, inv_make, inv_model, inv_year, inv_price, inv_mileage, inv_description, inv_image)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING *;`,
            [classification_id, make, model, year, price, mileage, description, image_url]
        );
        return result.rows[0];
    } catch (error) {
        console.error("❌ Error adding vehicle:", error.message);
        throw error;
    }
}

/* ***********************
 * 5️⃣ Update an existing vehicle
 *************************/
async function updateVehicle(inv_id, { classification_id, make, model, year, price, mileage, description, image_url }) {
    try {
        const result = await pool.query(
            `UPDATE inventory
             SET classification_id = $1, inv_make = $2, inv_model = $3, inv_year = $4, inv_price = $5, 
                 inv_mileage = $6, inv_description = $7, inv_image = $8
             WHERE inventory_id = $9 
             RETURNING *;`,
            [classification_id, make, model, year, price, mileage, description, image_url, inv_id]
        );
        
        return result.rows[0];
    } catch (error) {
        console.error(`❌ Error updating vehicle with ID ${inv_id}:`, error.message);
        throw error;
    }
}

/* ***********************
 * 6️⃣ Delete a vehicle
 *************************/
async function deleteVehicle(inv_id) {
    try {
        const result = await pool.query(
            "DELETE FROM inventory WHERE inventory_id = $1 RETURNING *;",
            [inv_id]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`❌ Error deleting vehicle with ID ${inv_id}:`, error.message);
        throw error;
    }
}

/* ***********************
 * 7️⃣ Add additional vehicle images
 *************************/
async function addVehicleImage(vehicle_id, image_url) {
    try {
        const result = await pool.query(
            "INSERT INTO vehicle_images (vehicle_id, image_url) VALUES ($1, $2) RETURNING *;",
            [vehicle_id, image_url]
        );
        return result.rows[0];
    } catch (error) {
        console.error(`❌ Error adding image for vehicle ID ${vehicle_id}:`, error.message);
        throw error;
    }
}

module.exports = {
    getClassifications,
    getInventoryByClassification,
    getVehicleById,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    addVehicleImage
};
