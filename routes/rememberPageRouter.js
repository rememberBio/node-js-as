const router = require("express").Router();
const rememberPageController = require("../controllers/rememberPageController");
const checkIfAuthenticated = require('../lib/middlewares/authMiddleware');


//A routers that needs auth to access
router.use(checkIfAuthenticated);

router.get("/getById/:rpId", rememberPageController.getById);
router.post("/createOrUpdate", rememberPageController.createOrUpdateRememberPage);


module.exports = router;