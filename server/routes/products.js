var express = require('express');
var router = express.Router();
var db = require('../helpers/mongodb');

router.get('/products', function (req, res, next) {
  db.findDocuments("products", result => {
    res.json(result);
  });
});

router.get('/products/:objectId', function (req, res, next) {
  let objectId = req.params.objectId;
  db.findDocument("products", objectId, result => {
    res.json(result);
  })
});

router.get('/products/create', function (req, res, next) {
  db.insertDocument({}, "products", result => {
    res.json(result);
  })
});

router.get('/products/update/:id', function (req, res, next) {

});

router.get('/products/delete/:id', function (req, res, next) {

});


module.exports = router;
