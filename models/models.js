const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    propertyType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceUnit: {
        type: String,
        required: true
    },
    baths: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    areaUnit: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports.Post = mongoose.model('Post', postSchema);
