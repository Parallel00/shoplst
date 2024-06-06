const Item = require('../item');
const express = require('express');

const exprout = express.Router();

exprout.get('/', async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.json({ items });
  } catch (err) {
    next(err);
  }
});

exprout.post('/', async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const newItem = new Item(name, price);
    res.json({ item: newItem });
  } catch (err) {
    next(err);
  }
});

exprout.get('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const foundItem = await Item.find(name);
    res.json({ item: foundItem });
  } catch (err) {
    next(err);
  }
});

exprout.patch('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const updatedData = req.body;
    const updatedItem = await Item.update(name, updatedData);
    res.json({ item: updatedItem });
  } catch (err) {
    next(err);
  }
});

exprout.delete('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    await Item.remove(name);
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
