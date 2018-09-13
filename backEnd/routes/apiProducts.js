const mongoose = require('mongoose');
const express = require('express');
const app = express.Router(); 
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const URI = 'mongodb://admin:Lenuska110589@ds125602.mlab.com:25602/shop';
const conn = mongoose.createConnection(URI, { useNewUrlParser: true });
const Product = require('../models/Product');

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
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    metadata: req.body,
                    id: Date.now(),
                    bucketName: 'products'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ success: true, msg: 'save file to DB successful', 
    data: {
        title: req.body.title,
        description: req.body.description,
        filename:  req.file.filename,
        price: req.body.price,
        id: req.file.id
    }});
})

app.get('/products',  (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.render('index', { files: false });
        } else {
            files.map(file => {
                if (
                    file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png'
                ) {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            // res.render('index', { files: files });
            //переделать на общую функцию!!
            return res.json(files.map((file)=> {
                return{
                    id: file._id,
                    title: file.metadata.title,
                    description: file.metadata.description,
                    price: file.metadata.price,
                    filename: file.filename
                }
            }));
        }
    });
});

app.get('/files', (req, res) => {
    debugger;
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files exist
        return res.json(files);
    });
});

app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // File exists
        return res.json(file);
    });
});

app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

app.get('/images', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.render('index', { files: false });
        } else {
            files.map(file => {
                if (
                    file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png'
                ) {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            res.render('index', { files: files });
        }
    });
});

app.delete('/files/:id', (req, res) => {
    
    let id = Number(req.params.id);

    const deleteProduct = async(id) => {
        try{
            const file = await deleteFile(id);
            const chunks = await deleteChunks(id);
            if (file && chunks){
                return res.json({
                    success: true,
                    msg: 'file and chunks deleted',
                });
            }
        }
        
        catch (err) {
            res.json({
                success: false,
                msg: err,
            })
        }
    }
    deleteProduct(id);
});

const deleteFile = (id) => {
    return  new Promise((resolve, reject)=>{
        gfs.db.collection('products' + '.files').deleteOne({ _id: id }, function (err, data) {
            if (!data || data.length === 0) {
                debugger;
                reject(res.status(404).json({
                    err: 'No file exists'
                }));
            }
            resolve(true);
        })
    })
}

const deleteChunks = (id) => {
    return new Promise((resolve, reject) => {
        gfs.db.collection('products' + '.chunks').deleteMany({ files_id: id }, function (err, number) {
            if (number.deletedCount === 0) {
    
                return reject('there is no chunks');
            }
            resolve(true);
        });
    })
}

module.exports = app;
