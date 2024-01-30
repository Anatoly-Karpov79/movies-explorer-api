const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  category: {
    ref: 'categories',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
   subcategory: {
   ref: 'subcategories',
   type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

module.exports = mongoose.model('product', productSchema);
