const Provider = require('../models/providers.model');
const Product = require('../models/products.model');

// CREATE
/*{
    "id": 1,
    "company_name": "SmartLabs",
    "CIF": 1000000,
    "address": "Calle Juana Frances",
    "url_web": "www.smartlabs.es"
} */
const createProvider = async (req, res) => {
    try {
        const data = req.body;
        let answer = await new Provider(data).save();
        res.status(201).json(answer);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// READ
// http://localhost:3000/api/providers
const getProvider = async (req, res) => {
    try {
        const company_name = req.params.company_name;
        let providers = company_name ? await Provider.find({ company_name }, '-_id -__v') : await Provider.find({}, '-_id -__v'); //{}
        res.status(200).json(providers); // Respuesta de la API para 1 producto o todos
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// UPATE
/* {
    "id": 2,
    "company_name": "ICP Tech",
    "CIF": 900000,
    "address": "Meco",
    "url_web": "www.icptech.es"
} */
const updateProvider = async (req, res) => {
    try {
        const company_name = req.params.company_name;
        const newData = req.body;
        let provider = await Provider.updateOne({company_name}, newData)
        res.status(200).json(provider);
    } 
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}


const deleteProvider = async (req, res) => {
    const company_name = req.params.company_name;

    let provider_to_delete = await Provider.find({ company_name });
    let provider = provider_to_delete[0]._id.toString();
    let ee = await Product.find({ provider });

    if (ee.length == 0){
        await Provider.deleteOne({company_name});
        return res.status(200).send("Producto borrado!. Has borrado: "+ company_name);
    }
    
    res.status(400).send("No se puede borrar el proveedor "+ company_name + " porque tiene productos.");
}

module.exports = {
    getProvider,
    createProvider,
    updateProvider,
    deleteProvider
}