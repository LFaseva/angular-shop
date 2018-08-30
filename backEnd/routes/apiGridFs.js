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
const conn = mongoose.createConnection(URI);

// init gfs
let gfs;
//create stream
conn.once('open', () => {
    gfs = new Grid(conn.db, mongoose.mongo);
    gfs.collection('products');
})

//create storage
const storage = new GridFsStorage({
    url: URI,
    file: (req, file) => {
        console.log('file',file);
        console.log('file',req.body);
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    // bucketName: 'products'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage }).any();

app.post('/upload', upload, (req, res) => {
})


module.exports = app;
