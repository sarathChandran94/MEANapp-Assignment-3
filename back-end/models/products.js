const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let NewProductSchema = new Schema({
    productId: Number,
    productName: String,
    productCode: String,
    releaseDate: String,
    description: String,
    price: Number,
    starRating: Number,
    imageUrl: String
});

module.exports = mongoose.model('product', NewProductSchema);
