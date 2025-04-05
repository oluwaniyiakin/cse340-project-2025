const pool = require("../database/");

const inventoryModel = {};

/* ***************************
 *  Get all classification data
 * ************************** */
inventoryModel.getClassifications = async function () {
  try {
    const data = await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
    console.log("Database response:", data);  // Log the result to see if data is as expected
    return data;
  } catch (error) {
    console.error("Error in getClassifications:", error);
    throw error;  // Throw error to propagate to the calling function
  }
};

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
inventoryModel.getInventoryByClassificationId = async function (classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("Get inventory by classification id error:", error);
    return null; // returns null if an error occurs
  }
};

/* ***************************
 *  Get inventory by ID
 * ************************** */
inventoryModel.getInventoryById = async function (invId) {
  try {
    const data = await pool.query(
      "SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.inv_id = $1",
      [invId]
    );
    return data.rows[0];
  } catch (error) {
    console.error("Get inventory by ID error:", error);
    return null; // returns null if an error occurs
  }
};

/* ***************************
 *  Add new classification
 * ************************** */
inventoryModel.addClassification = async function (classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1)";
    const data = await pool.query(sql, [classification_name]);
    return data.rowCount; // returns the number of rows affected
  } catch (error) {
    console.error("Add classification error:", error);
    return null; // returns null if an error occurs
  }
};

/* ***************************
 *  Add new vehicle to the inventory
 * ************************** */
inventoryModel.addInventory = async function (data) {
  try {
    const sql = `INSERT INTO inventory (
      classification_id, inv_make, inv_model, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_year,
      inv_miles, inv_color
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;

    const values = [
      data.classification_id,
      data.inv_make,
      data.inv_model,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_year,
      data.inv_miles,
      data.inv_color
    ];

    const result = await pool.query(sql, values);
    return result.rowCount; // returns the number of rows affected
  } catch (error) {
    console.error("Inventory insert error:", error);
    return null; // returns null if an error occurs
  }
};

module.exports = inventoryModel;
