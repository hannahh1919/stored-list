var express = require('express');
var router = express.Router();
const Item = require('../models/Item');

// GET homepage (show items)
router.get('/', async function(req, res, next) {
  const items = await Item.find();
  res.render('index', { title: 'Stored List', list: items });
});

// -------------------------------
// POST /item  → Add new item
// -------------------------------
router.post('/item', async (req, res) => {
  try {
    const newItem = new Item({
      text: req.body.text
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------
// PUT /item/:id → Update an item
// ----------------------------------
router.put('/item/:id', async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------
// this deletes an item
// ----------------------------------
router.delete('/item/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
