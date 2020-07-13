const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let app = new express();
let router = require('./routes/user');
const config = require('./config/database');
const ProductData = require('./models/products');
const bodyParser = require('body-parser');


// DATABASE
mongoose.connect(config.db, config.dbOpts, (err) => {

    if (err) console.log(`Problem connecting to database: ${err}`);
    else console.log(`Connected to ${config.db}`);

});


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/user', router);


app.get('/', (req, res) => {
    res.send(`You've reached the server.`);
});

app.get('/products', (req, res) => {
    ProductData.find()
        .then((products) => {
            res.send(products)
        }).catch((err) => {
            res.send(err);
        });
});


const port = 5000;
app.listen(port, () => {
    console.log(`SERVER listening to port: localhost:${port}`);
});
