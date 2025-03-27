const formatPrice = (price) => {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };
  
  const formatMileage = (mileage) => {
    return mileage.toLocaleString('en-US');
  };
  
  module.exports = { formatPrice, formatMileage };
  