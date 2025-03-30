const db = require("../config/database");

/* ****************************************
 *  Get a Vehicle by Inventory ID
 * **************************************** */
async function getVehicleById(inventory_id) {
  try {
    const query = "SELECT * FROM inventory WHERE inventory_id = $1";
    const { rows } = await db.query(query, [inventory_id]);
    return rows[0]; // Return the first row (single vehicle)
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    throw error;
  }
}

/* ****************************************
 *  Get All Inventory Items with Classification Names
 * **************************************** */
async function getAllInventory() {
  try {
    const sql = `
      SELECT inventory.*, classification.classification_name
      FROM inventory
      JOIN classification ON inventory.classification_id = classification.classification_id
      ORDER BY inventory.inventory_id DESC`;
    const { rows } = await db.query(sql);
    return rows;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
}

/* ****************************************
 *  Get All Classifications
 * **************************************** */
async function getClassifications() {
  try {
    const sql = "SELECT * FROM classification ORDER BY classification_name ASC";
    const { rows } = await db.query(sql);
    return rows;
  } catch (error) {
    console.error("Error fetching classifications:", error);
    return [];
  }
}

/* ****************************************
 *  Add a New Classification
 * **************************************** */
async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
    const result = await db.query(sql, [classification_name]);
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error adding classification:", error);
    return null;
  }
}

/* ****************************************
 *  Add a New Inventory Item
 * **************************************** */
async function addInventory(classification_id, inv_make, inv_model, inv_description = "", inv_price = 0, inv_stock = 0) {
  try {
    const sql = `
      INSERT INTO inventory (classification_id, inv_make, inv_model, inv_description, inv_price, inv_stock)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [classification_id, inv_make, inv_model, inv_description, inv_price, inv_stock];
    const result = await db.query(sql, values);
    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error adding inventory item:", error);
    return null;
  }
}

/* ****************************************
 *  Export Model Functions
 * **************************************** */
module.exports = {
  getVehicleById,
  getAllInventory,
  getClassifications,
  addClassification,
  addInventory
};
