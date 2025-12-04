const mongoose = require('mongoose');

const ListItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ListItem', ListItemSchema);
