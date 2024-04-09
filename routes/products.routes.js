const productsControllers = require('../controllers/products.controllers');
const router = require("express").Router();

// http://localhost:3000/api/products
// http://localhost:3000/api/products/1
// http://localhost:3000/api/products/5
router.post("/", productsControllers.createProduct);
router.get("/:title?", productsControllers.readProduct);
router.put("/:title", productsControllers.updateProduct);
router.delete("/:title", productsControllers.deleteProduct);


module.exports = router;