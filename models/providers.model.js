const mongoose = require("mongoose");
require('../config/db_mongo');

const objectSchema = {
    id: {
        type: Number, 
        required: true,
        unique: true
    },
    company_name: {
        type: String, 
        required: true,
        unique: true 
    },
    CIF: {
        type: Number, 
        required: true,
        unique: true 
    },
    address: {
        type: String, 
        required: true 
    },
    url_web: {
        type: String, 
        required: true,
        unique: true
    }
}

const providerSchema = mongoose.Schema(objectSchema);

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;