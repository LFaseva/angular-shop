const mongoose = require('mongoose');
const express = require('express');
const app = express.Router(); 
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const URI = 'mongodb://admin:Lenuska110589@ds125602.mlab.com:25602/shop';
const schemaProduct = '../models/Product';
const conn = mongoose.createConnection(URI, { useNewUrlParser: true });

// init gfs
let gfs;

//create stream
conn.once('open', () => {
    gfs = new Grid(conn.db, mongoose.mongo);
})

//create storage
const storage = new GridFsStorage({
    url: URI,
    file: (req, file) => {
        return {
            filename: file.originalname + '_' + Date.now(),
            metadata: req.body,
            bucketName: 'products'
        }
    }
});

const upload = multer({ storage }).any();

app.post('/upload', upload, (req, res) => {
    res.json({ success: true, msg: 'save file to DB successful'});
})


module.exports = app;
