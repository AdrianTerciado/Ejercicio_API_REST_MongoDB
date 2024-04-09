const providersControllers = require('../controllers/providers.controllers');
const router = require("express").Router();

// http://localhost:3000/api/providers
// http://localhost:3000/api/providers/1
// http://localhost:3000/api/providers/5
router.get("/:company_name?", providersControllers.getProvider);
router.post("/", providersControllers.createProvider);
router.put("/:company_name", providersControllers.updateProvider);
router.delete("/:company_name", providersControllers.deleteProvider);


module.exports = router;