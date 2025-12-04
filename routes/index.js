var express = require('express');
var router = express.Router();

const ListItem = require('../models/ListItem');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const items = await ListItem.find();
    res.render('index', {
      title: 'Stored List',
      list: items.map(item => item.text)
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
