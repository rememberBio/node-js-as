const router = require("express").Router();
const rememberPageController = require("../controllers/rememberPageController");
const passport = require('passport');


//A routers that needs auth to access
router.use(passport.authenticate('jwt', { session: false }));

router.post("/createOrUpdate", rememberPageController.createOrUpdateRememberPage);

module.exports = router;