const invModel = require("../models/inventoryModel");

const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function () {
  try {
    console.log("🔍 Fetching classifications...");
    let data = await invModel.getClassifications();

    if (!data || !data.rows || data.rows.length === 0) {
      console.error("❌ No classifications found.");
      return "<ul><li><a href='/' title='Home page'>Home</a></li></ul>";
    }

    console.log("✅ Classifications:", data.rows);

    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.rows.forEach((row) => {
      list += `<li>
        <a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">
          ${row.classification_name}
        </a>
      </li>`;
    });
    list += "</ul>";

    return list;
  } catch (error) {
    console.error("❌ Database error in getNav:", error);
    return "<ul><li><a href='/' title='Home page'>Home</a></li></ul>"; // Return a fallback nav in case of error
  }
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = function (data) {
  try {
    if (!data || data.length === 0) {
      return '<p class="notice">Sorry, no matching vehicles could be found.</p>';
    }

    let grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += `<li>
        <a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />
        </a>
        <div class="namePrice">
          <hr />
          <h2>
            <a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
        </div>
      </li>`;
    });
    grid += "</ul>";

    return grid;
  } catch (error) {
    console.error("❌ Error in buildClassificationGrid:", error);
    return '<p class="notice">Error loading vehicles.</p>';
  }
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other functions in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
