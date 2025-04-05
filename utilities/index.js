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
      list += "<li>";
      list +=
        `<a href="/inventory/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a>`;
      list += "</li>";
    });

    list += "</ul>";
    return list;
  } catch (error) {
    console.error("Error in getNav:", error);
    return "<ul><li>Error loading navigation</li></ul>";
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
      grid += "<li>";
      grid += `<a href="../../inventory/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
                <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />
              </a>`;
      grid += '<div class="namePrice"><hr />';
      grid += `<h2><a href="../../inventory/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
                ${vehicle.inv_make} ${vehicle.inv_model}
              </a></h2>`;
      grid += `<span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>`;
      grid += "</div></li>";
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

  svd += "<section class='imagePrice'>";
  svd += `<img src='${vehicle.inv_image}' alt='Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors' id='mainImage'>`;
  svd += "</section>";

  svd += "<section class='vehicleDetail'>";
  svd += `<h3>${vehicle.inv_make} ${vehicle.inv_model} Details</h3>`;
  svd += "<ul id='vehicle-details'>";
  svd += `<li><h4>Price:</h4> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</li>`;
  svd += `<li><h4>Description:</h4> ${vehicle.inv_description}</li>`;
  svd += `<li><h4>Color:</h4> ${vehicle.inv_color}</li>`;
  svd += `<li><h4>Miles:</h4> ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)}</li>`;
  svd += "</ul></section>";

  svd += "</div></section>";
  return svd;
};

/* ****************************************
 * Middleware For Handling Errors
 **************************************** */
utilities.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = utilities;
