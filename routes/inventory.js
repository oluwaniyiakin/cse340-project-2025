const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")
const invValidate = require("../middleware/invValidate")

// Management view
router.get("/", inventoryController.buildManagementView)

// Vehicle detail view
router.get("/detail/:inv_id", inventoryController.getVehicleDetail)

// Add Classification Routes
router.get("/add-classification", inventoryController.buildAddClassificationView)
router.post("/add-classification", invValidate.checkClassification, inventoryController.processAddClassification)

router.get('/add-inventory', inventoryController.buildAddInventoryView)
router.post('/add-inventory', invValidate.checkInventory, invController.processAddInventory)


// Add Inventory Routes
router.get("/add-inventory", inventoryController.buildAddInventoryView)
router.post("/add-inventory", invValidate.checkInventory, inventoryController.processAddInventory)

module.exports = router
