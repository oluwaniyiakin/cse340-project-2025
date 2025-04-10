const inventoryModel = require("../models/inventoryModel");

const utilities = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
utilities.getNav = async function () {
  try {
    const data = await inventoryModel.getClassifications();

    if (!data || !data.rows || data.rows.length === 0) {
      console.error("No classifications found in the database.");
      return "<ul><li>No Classifications Found</li></ul>";
    }

    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';

    data.rows.forEach((row) => {
      list += `<li>
        <a href="/inventory/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">
          ${row.classification_name}
        </a>
      </li>`;
    });

    list += "</ul>";
    return list;
  } catch (error) {
    console.error("Error in getNav:", error);
    return "<ul><li>Error loading navigation</li></ul>";
  }
};

/* **************************************
 * Build the classification dropdown <select>
 ************************************** */
utilities.buildClassificationList = async function (selectedId = null) {
  try {
    const data = await inventoryModel.getClassifications();
    let dropdown = '<select name="classification_id" id="classification_id" required>';
    dropdown += '<option value="">Choose a classification</option>';

    data.rows.forEach((row) => {
      dropdown += `<option value="${row.classification_id}" ${
        row.classification_id == selectedId ? "selected" : ""
      }>${row.classification_name}</option>`;
    });

    dropdown += "</select>";
    return dropdown;
  } catch (error) {
    console.error("Error building classification list:", error);
    return "<select><option>Error loading classifications</option></select>";
  }
};

/* **************************************
 * Build the classification view HTML
 ************************************** */
utilities.buildClassificationGrid = async function (data) {
  let grid = "";

  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += `<li>
        <a href="../../inventory/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />
        </a>
        <div class="namePrice">
          <hr />
          <h2>
            <a href="../../inventory/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
        </div>
      </li>`;
    });
    grid += "</ul>";
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }

  return grid;
};

/* **************************************
 * Build single vehicle display HTML
 ************************************** */
utilities.buildSingleVehicleDisplay = async function (vehicle) {
  let svd = "<section id='vehicle-display'><div>";

  svd += `<section class='imagePrice'>
    <img src='${vehicle.inv_image}' alt='Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors' id='mainImage'>
  </section>`;

  svd += `<section class='vehicleDetail'>
    <h3>${vehicle.inv_make} ${vehicle.inv_model} Details</h3>
    <ul id='vehicle-details'>
      <li><h4>Price:</h4> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</li>
      <li><h4>Description:</h4> ${vehicle.inv_description}</li>
      <li><h4>Color:</h4> ${vehicle.inv_color}</li>
      <li><h4>Miles:</h4> ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)}</li>
    </ul>
  </section>`;

  svd += "</div></section>";
  return svd;
};

/* ****************************************
 * Middleware For Handling Errors
 **************************************** */
utilities.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = utilities;
