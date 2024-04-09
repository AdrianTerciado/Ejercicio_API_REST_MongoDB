const Product = require('../models/products.model');
const Provider = require('../models/providers.model');

// CREATE
/*	{
    "id": 1,
    "title": "Tortilla - Marquina",
    "price": 1.80,
    "description":"La mejor tortilla de la zona en el Teatro Marquina",
    "provider": "SmartLabs"
    } */
const createProduct = async (req, res) => {
    try {
        let company_name = req.body.provider;
        const provider = await Provider.find({ company_name });
        let provider_id = provider[0]._id.toString();

        let data = {
            "id": req.body.id,
            "title": req.body.title,
            "price": req.body.price,
            "description": req.body.description,
            "provider": provider_id
        }

        let answer = await new Product(data).save();
        res.status(201).json(answer);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// READ
// http://localhost:3000/api/products
// http://localhost:3000/api/products/Rosquillas
const readProduct = async (req, res) => {
    try {
        const title = req.params.title;

        let products = title ? await Product
                                .find({ title })
                                .populate('provider', '-_id -__v')
                                .select('-_id -__v')
                            : await Product
                                .find() //{}
                                .populate('provider', '-_id -__v')
                                .select('-_id -__v')



        res.status(200).json(products); // Respuesta de la API para 1 producto o todos
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// UPDATE
const updateProduct = async (req, res) => {
    try {
        const title = req.params.title;

        let company_name = req.body.provider;
        const provider = await Provider.find({ company_name });
        let provider_id = provider[0]._id.toString();

        let newData = {
            "id": req.body.id,
            "title": req.body.title,
            "price": req.body.price,
            "description": req.body.description,
            "provider": provider_id
        }

        let updatedProduct = await Product.updateOne({ title }, newData);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

//DELETE
const deleteProduct = async (req, res) => {
    const title = req.params.title;
    await Product.deleteOne({ title });
    res.status(200).send("Producto borrado!. Has borrado: " + title);
}

module.exports = {
    createProduct,
    readProduct,
    updateProduct,
    deleteProduct
}