const express = require('express');
const router = express.Router();
const User = require('../models/users');
const ProductData = require('../models/products');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
    User.find({}, {"password": 0})
        .then((users) => {
            res.send(users);
        });
});


let verifyToken = (req,res,next) => {
    let token = req.headers.authorization.split(' ')[1];
    let parts = token.split('.');
    if (parts.length !== 3) {
        return res.status(401).send('Unauthorized request');
    }
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'mySecret')
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}


router.post('/register', (req, res) => {
    let userData = req.body;

    User.findOne({  email: userData.email }, (err, user) => {
        console.log(user)
        if (err) {
            res.status(401).send(err)
        } else if (user) {
            res.status(401).send('User already registered')
        }
        //  else if (userData.username == user.username) {
        //     res.status(401).send('Username taken!!')
        // }
        else {

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(userData.password, salt, function(err, hash) {
                    userData.password = hash;
                    let newUser = new User(userData)
                    newUser.save((err, product) => {
                        if (err) res.send(err);
                        else {
                            res.status(200).send(product);
                        }
                    });
                });
            });

        }
    });

});


router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            res.status(401).send(err)
        }
        if (!user) {
            res.status(401).send('User not Found!');
        }
        if (user) {
            bcrypt.compare(userData.password, user.password, function (err, result) {
                if (err) {
                    res.status(401).send(err);
                    console.log(err);
                }
                if (result === true) {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'mySecret');
                    res.status(200).send({token});
                }
                if (result === false) {
                    res.status(401).send('Incorrect Password!');
                }
            });
        }

    });

});





router.post('/insert',verifyToken, (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE');
    let productData = req.body;
    let newProduct = new ProductData(productData);
    newProduct.save((err, product) => {
        if (err) res.send(err);
        else res.send(product);
    });
});


router.get('/edit/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    ProductData.findOne({_id: id}, (err, doc) => {
        if (err) res.send(err);
        else res.send(doc);
    });
});


router.post('/edited/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    let productData = req.body;
    let options = { new: true };
    ProductData.findByIdAndUpdate(id, productData, options, (err, doc) => {
        if (err) res.send(err);
        else res.send(doc);
    });
});

router.get('/delete/:id', verifyToken, (req, res) => {
    // res.header('Access-Control-Allow-Origin', "*");
    // res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE');
    let id = req.params.id;
    ProductData.findByIdAndDelete(id, (err, doc) => {
        if (err) res.send(err);
        else res.send(doc);
    });
});


module.exports = router;
