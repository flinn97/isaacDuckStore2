const mongoose = require('mongoose');

const DuckSchema = new mongoose.Schema({
  color:   { type: String, required: true, 
    enum:['Yellow', 'Red', 'Green', 'Black'] },

  size:    { type: String, required: true,
    enum:['XLarge','Large','Medium','Small','XSmall']},
    
  price:   { type: Number, required: true },

  quantity:{ type: Number, required: true },

  deleted: { type: Boolean, default: false }

});

module.exports = mongoose.model('Duck', DuckSchema);