const express = require('express');
const db = require('../config/database');
const router = express.Router(); 
const Product = require("../models/product");
const multer = require('multer');
let storage = multer.diskStorage({
    dest: __dirname + '/files/',
    // filename: file.filename
});
let upload = multer({ storage: storage });

//router get product
router.get('/product', function (req, res) {
    if (req) {
        Product.find(function (err, products) {
            if (err) return next(err);
            res.json(products);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'no products' });
    }
});

// router for post product to database;
router.post('/product', upload.any(), (req, res) => {
    // console.log(req.body);
    // debugger;
    // upload(req, res, function (err) {
    //     if (err) {
    //         return res.end("Error uploading file.");
    //     } else {
    //         debugger;
    //         console.log(req.body);
    //         console.log(req.files);
    //         req.files.forEach(function (f) {
    //             console.log(f);
    //             // and move file to final destination...  
    //         });
    //         res.end("File has been uploaded");
    //     }
    // });
    // if (!req.body) {
    //     res.json({ success: false, msg: 'You did not add any new product' });
    // } else {
    //     let newProduct = new Product({
    //         title: req.body.title,
    //         description: req.body.description,
    //         price: req.body.price
    //     })
    //     newProduct.save((err) => {
    //         if (err) {
    //             return res.json({ success: false, msg: 'Product already exist.' });
    //         }
    //         loadFile();
    //         res.json({ success: true, msg: 'Successful create new product.' })
    //     })
    // }
})

// loadFile = (path, name, callback) => {
//     debugger;
//     let writestream = GridFS.createWriteStream({
//         filename: name
//     });
//     writestream.on('close', function (file) {
//         callback(null, file);
//     });
//     fs.createReadStream(path).pipe(writestream);
// } 

module.exports = router;



// const multer = require('multer');
// var router = express.Router();
// const Image = requier('../config/imageFile.js'); //Image

// router.getImageById = (id, callback) => {
//     Image.find(id, callback);
// }

// router.addImageById = () => {
//     Image.create(image, callback);
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'img/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage
// });

// router.get('/', (req, res, next) => {
//     console.log('считать инфу с шаблона');
//     // res.render(index.ejs);
// });

// router.post('/', upload.any(), (req, res, next) => {
//     res.send(req.files);
//     let path = req.files[0].path;
//     let imageName = req.files[0].originalname;

//     let imagePath = {};
//     imagePath['path'] = path;
//     imagePath['originalName'] = imageName;

//     router.addImage(imagePath, (err) => {

//     });
// })

// module.exports = router;


