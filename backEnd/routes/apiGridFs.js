var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty')();
var Product = require('../models/Product');

var fs = require('fs');
var mongoose = require('mongoose');
var Gridfs = require('gridfs-stream');

router.post('/:id', )

// router.post('/upload/:id', multiparty, function (req, res) {
//     console.log('req,files0', req.file);
//     var db = mongoose.connection.db;
//     var mongoDriver = mongoose.mongo;
//     var gfs = new Gridfs(db, mongoDriver);
//     var writestream = gfs.createWriteStream({
//         filename: req.files.file.name,
//         mode: 'w',
//         content_type: req.files.file.mimetype,
//         metadata: req.body
//     });
//     fs.createReadStream(req.files.file.path).pipe(writestream);

//     writestream.on('close', function (file) {
//         Product.findById(req.params.id, function (err, user) {
//             // handle error
//             product.file = file._id;
//             product.save(function (err, updateProduct) {
//                 // handle error
//                 return res.json(200, updateProduct)
//             })
//         });
//         fs.unlink(req.files.file.path, function (err) {
//             // handle error
//             console.log('success!');
//         });
//     });
// });