const buildVehicleDetailHTML = (vehicle) => {
  return `
      <div class="vehicle-detail">
          <img src="${vehicle.full_img}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image">
          <div class="vehicle-info">
              <h2>${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
              <p class="price">Price: $${vehicle.price.toLocaleString()}</p>
              <p class="mileage">Mileage: ${vehicle.mileage.toLocaleString()} miles</p>
              <p class="description">${vehicle.description}</p>
              <p class="color">Color: ${vehicle.color}</p>
          </div>
      </div>
  `;
};

module.exports = { buildVehicleDetailHTML };
