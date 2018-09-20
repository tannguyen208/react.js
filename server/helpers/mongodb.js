var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "study";

function db() {}

db.findDocuments = function(collectionName, callback) {
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
      });
      client.close();
    }
  );
};

db.findDocument = function(collectionName, objectId, callback) {
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      collection.find({ _id: ObjectId(objectId) }).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
      });
      client.close();
    }
  );
};

db.insertDocument = function(jsonData, collectionName, callback) {
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      collection.insertOne(jsonData, function(err, result) {
        assert.equal(err, null);
        callback(result);
      });
      client.close();
    }
  );
};

db.updateDocument = function(jsonData, collectionName, objectId, callback) {
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      collection.updateOne(
        { _id: ObjectId(objectId) },
        { $set: jsonData },
        function(err, result) {
          assert.equal(err, null);
          callback(result);
        }
      );
      client.close();
    }
  );
};

db.deleteDocument = function(collectionName, objectId, callback) {
  MongoClient.connect(
    url,
    function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      collection.deleteOne({ _id: ObjectId(objectId) }, function(err, result) {
        assert.equal(err, null);
        callback(result);
      });
      client.close();
    }
  );
};
module.exports = db;
