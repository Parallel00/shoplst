const express = require("express")
const exapp = express();
const whereItems = require("./routes/items")
const ExpressError = require("./expressError")

exapp.use(express.json());
exapp.use("/items", whereItems);

exapp.use(function (req, res, next) {
  return new ExpressError("Item not found", 404);
});

exapp.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: err.message,
  });
});

module.exports = app