<<<<<<< HEAD
const Util = {};

/**
 * Format a number as U.S. dollars.
 * @param {number} price - The price to format.
 * @returns {string} Formatted price, e.g., "$16,999.00"
 */
Util.formatPrice = function (price) {
  return `$${Number(price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
};

/**
 * Format mileage with commas.
 * @param {number} mileage - The mileage to format.
 * @returns {string} Formatted mileage, e.g., "74,750"
 */
Util.formatMileage = function (mileage) {
  return Number(mileage).toLocaleString('en-US');
};

/**
 * Build dynamic HTML for the vehicle detail view.
 * @param {Object} vehicle - Vehicle data from the database.
 * @returns {string} HTML string containing vehicle detail.
 */
Util.buildVehicleDetailHTML = function (vehicle) {
  return `
    <div class="vehicle-detail">
      <div class="vehicle-main-image">
        <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
      </div>
      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p class="price">Price: ${Util.formatPrice(vehicle.inv_price)}</p>
        <p class="mileage">Mileage: ${Util.formatMileage(vehicle.inv_miles)} miles</p>
        <p class="description">${vehicle.inv_description}</p>
        <p class="certification">Certification and Inspection: The vehicle has been inspected by an ASE-certified technician, indicating it meets quality standards.</p>
      </div>
    </div>
  `;
};

/**
 * getNav - Returns dynamic navigation bar HTML.
 * For now, returns a static navigation bar.
 * @returns {Promise<string>} A promise that resolves to a navigation bar HTML string.
 */
Util.getNav = async function () {
  // In a production app, you might dynamically build the nav from the database.
  return `
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/inventory">Inventory</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  `;
};

/**
 * handleErrors - Higher-Order Function for handling errors in asynchronous route handlers.
 * @param {Function} fn - An asynchronous function (route handler).
 * @returns {Function} A new function that wraps the async function with error handling.
 */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
=======
const formatPrice = (price) => {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };
  
  const formatMileage = (mileage) => {
    return mileage.toLocaleString('en-US');
  };
  
  module.exports = { formatPrice, formatMileage };
  
>>>>>>> d9ce623bd073062dc418caa107ad7638d1eaa0c2
