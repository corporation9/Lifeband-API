/**
 * Required External Modules
 */

 const express = require("express");
 const cors = require("cors");
 const helmet = require("helmet");
// const { clientOrigins, serverPort } = require("./config/env.dev");
 const MaskData = require('maskdata');
 const crypto = require('crypto')

 // ********************************* */
 //IMPORT 3rd PARTY-LIBS
 // ********************************* */
 const MongoClient = require('mongodb').MongoClient;
 const ObjectID = require('mongodb').ObjectID;
 // ********************************* */
 // CONFIGURE THE DATABASE
 // ********************************* */
 const url = 'mongodb://127.0.0.1:27017';
 const dbName = '';
 const serverPort = ;
 const logcollection = ""

 /**
  * App Variables
  */

 const app = express();
 const apiRouter = express.Router();

 /**
  *  App Configuration
  */

 app.use(helmet());
 app.use(cors({ origin: "*" }));
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }))

 app.get("/lookup-table", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("ap_table");
    // Find some documents
    collection.find({}).limit(90).toArray(function(err, docs) {
        res.send(docs);
    });
  });
});

app.get("/log", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("raw");
    // Find some documents
    collection.find({}).sort({$natural:-1}).toArray(function(err, docs) {
       res.send(docs);
    });
  });
});

app.get("/lb-map", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("lb_map");
    // Find some documents
    collection.find({}).sort({$natural:-1}).toArray(function(err, docs) {
        res.send(docs);
    });
  });
});

app.get("/lb-ble", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("lb_ble");
    // Find some documents
    collection.find({}).sort({$natural:-1}).toArray(function(err, docs) {
        res.send(docs);
    });
  });
});

app.get("/lb-wifi", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("lookupTable_notfound");
    // Find some documents
    collection.find({}).sort({$natural:-1}).toArray(function(err, docs) {
        res.send(docs);
    });
  });
});

app.get("/requests", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("l9g");
    // Find some documents
    collection.distinct("request", {})
    .then(results => {
      res.send(JSON.stringify(results));
      console.log(results.length);
    })
    .catch(err => console.error(err))
   });
});

app.get("/raw/:device", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("raw");
    // Find some documents
    collection.find({ lifeband: req.params.device }).sort({$natural:-1}).toArray(function(err, docs) {
        res.send(docs);
    });
  });
});

app.get("/notfound", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("lookupTable_notfound");
    // Find some documents
    collection.find({ lifeband_id: req.params.device }).sort({$natural:-1}).toArray(function(err, docs) {
        res.send(docs);
    });
  });
});

app.get("/log/:device", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection(logcollection);
    // Find some documents
    collection.find({ lifeband_id: req.params.device }).sort({$natural:-1}).toArray(function(err, docs) {
        res.send(docs);
    });
  });
});

app.get("/log/:device/:device_type", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection(logcollection);
    // Find some documents
    collection.find({ lifeband_id: req.params.device, device_type: req.params.device_type }).sort({$natural:-1}).toArray(function(err, docs) {
        res.send(docs);
    });
  });
});

app.get("/log/:dt", (req, res) => {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection("l9g");
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      res.send(docs);
    });
  });
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

/**
 * Server Activation
 */

app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);
