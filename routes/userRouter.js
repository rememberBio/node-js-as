const router = require("express").Router();
const userController = require("../controllers/userController");
const passport = require('passport');

var checkIfAdminIsAuth = require('../lib/middlewares/checkIfAdminIsAuth');

//A routers that needs auth to access
router.use(passport.authenticate('jwt', { session: false }));
router.get("/deleteUser", userController.deleteUser);
router.get("/getUserById/:id", userController.getUserById);
router.get("/getUsers", userController.getUsersList);
router.post("/updateUser", userController.updateUser);
router.get("/getUserByEmail/:email", userController.getUserByEmail);

//a routs that need admin token
router.use(checkIfAdminIsAuth);
router.post("/createUser", userController.createUser);
router.post("/createToken", userController.createToken);
router.post("/updatePassword", userController.updatePassword);
router.post("/login", userController.createToken);
router.post("/updateUserStatus", userController.updateUserStatus);



module.exports = router;