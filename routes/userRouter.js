const router = require("express").Router();
const userController = require("../controllers/userController");


const checkIfAuthenticated = require('../lib/middlewares/authMiddleware');
router.get("/getUserByEmail/:email", userController.getUserByEmail);
router.post("/createUser", userController.createUser);

//A routers that needs auth to access
router.use(checkIfAuthenticated);
router.get("/getUserRp", userController.getUserRp);
router.post("/updateUser", userController.updateUser);
router.post("/updateUserStatus", userController.updateUserStatus);



module.exports = router;