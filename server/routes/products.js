var express = require("express");
var router = express();
var db = require("../helpers/mongodb");

router.get("/", function(req, res, next) {
  res.json({
    status: 200,
    message: "",
    data: []
  });
});

router.get("/products", function(req, res, next) {
  db.findDocuments("products", result => {
    res.json({
      status: 200,
      message: "",
      data: result
    });
  });
});

router.get("/products/:objectId", function(req, res, next) {
  let objectId = req.params.objectId;
  db.findDocument("products", objectId, result => {
    if (result)
      res.json({
        status: 200,
        message: "",
        data: result
      });
  });
});

router.post("/products/create", function(req, res, next) {
  let jsonData = req.body;
  if (!jsonData) return res.sendStatus(400);
  db.insertDocument(jsonData, "products", result => {
    if (result)
      res.json({
        status: 200,
        message: "created",
        data: result
      });
  });
});

router.post("/products/update/:objectId", function(req, res, next) {
  let objectId = req.params.objectId;
  let jsonData = req.body;
  if (!jsonData) return res.sendStatus(400);

  db.updateDocument(jsonData, "products", objectId, result => {
    res.json({
      status: 200,
      message: "updated",
      data: {}
    });
  });
});

router.post("/products/delete/:objectId", function(req, res, next) {
  let objectId = req.params.objectId;
  db.deleteDocument("products", objectId, result => {
    res.json({
      status: 200,
      message: "deleted",
      data: {}
    });
  });
});

module.exports = router;
