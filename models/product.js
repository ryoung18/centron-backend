const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    category: String,
    partNumber: {type: String, required: true, unique: true, lowercase: true},
    title: String,
    stores: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store'
    }],
    images: String
  },
  { timestamps: true }
);


module.exports = mongoose.model('Product', productSchema);
