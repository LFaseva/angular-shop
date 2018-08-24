const express = require('express');
const passport = require('passport');
const db = require('../config/database');
// require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const router = express.Router(); 
const User = require("../models/user");
const Product = require("../models/product");

// router for signup or new user
router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        let newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        newUser.save(function (err) {
            if (err) {
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
});

router.post('/product', (req, res) => {
    if(!req.body){
        res.json({ success: false, msg: 'You did not add any new product' });
    } else {
        let newProduct =  new Product({
            title: req.body.title,
            pictureUrl: req.body.pictureUrl,
            description: req.body.description,
            price: req.body.price
        })
        newProduct.save((err) => {
            if(err) {
                return res.json({success: false, msg: 'Product already exist.'});
            }
            res.json({success: true, msg: 'Successful create new product.'})
        })
    }
})

// router for login or sign-in
router.post('/signin', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), db.secret);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});

//router get product
router.get('/product', function(req,res) {
    if (req) {
        Product.find(function (err, products) {
            if (err) return next(err);
            res.json(products);
        });
    } else {
        return res.status(403).send({ success: false, msg: 'no products' });
    }
});


// //router for adding book only for authorized users
// router.post('/item', passport.authenticate('jwt', { session: false }), function (req, res) {
//     var token = getToken(req.headers);
//     if (token) {
//  //         var newItem = new Item({
//             isbn: req.body.isbn,
//             title: req.body.title,
//             author: req.body.author,
//             publisher: req.body.publisher
//         });

//         newItem.save(function (err) {
//             if (err) {
//                 return res.json({ success: false, msg: 'Save book failed.' });
//             }
//             res.json({ success: true, msg: 'Successful created new book.' });
//         });
//     } else {
//         return res.status(403).send({ success: false, msg: 'Unauthorized.' });
//     }
// });

// router for getting list of the products only for authorized users;
// router.get('/book', passport.authenticate('jwt', { session: false }), function (req, res) {
//     var token = getToken(req.headers);
//     if (token) {
//         debugger;
//         console.log('authentificate token');
//         Book.find(function (err, books) {
//             if (err) return next(err);
//             res.json(books);
//         });
//     } else {
//         debugger;
//         console.log(' NOT!!!! authentificate token');
//         return res.status(403).send({ success: false, msg: 'Unauthorized.' });
//     }
// });

// function for parse autorization token from request headers
// getToken = function (headers) {
//     if (headers && headers.authorization) {
//         var parted = headers.authorization.split(' ');
//         if (parted.length === 2) {
//             return parted[1];
//         } else {
//             return null;
//         }
//     } else {
//         return null;
//     }
// };


module.exports = router;