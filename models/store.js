const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    name: String,
    size: String,
    price: Number,
    url: String,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }
)

module.exports = mongoose.model('Store', storeSchema);
