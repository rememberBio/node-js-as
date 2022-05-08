const rememberPageService = require("../services/rememberPageService");
const wpService = require("../services/wpService");
const userService = require("../services/userService");

const createOrUpdateRememberPage = async(req, res) => {
    try {
        const rememberPage = req.body;
        console.log(rememberPage);
        /*const userId = req.params.userId;*/
        //update in wp
        const wpCreatedRP = null;
        if(rememberPage.wpPostId) {
            wpCreatedRP = await wpService.updateRememberPage(rememberPage);
        } else {
            wpCreatedRP = await wpService.createRememberPage(rememberPage);
        }

        //create or update in mongo db
        //const createdRememberPage = await rememberPageService.createOrUpdateRememberPage(rememberPage);
        
        return res.status(200)/*.json(createdRememberPage)*/;
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createOrUpdateRememberPage
};