const rememberPageService = require("../services/rememberPageService");
const wpService = require("../services/wpService");
const userService = require("../services/userService");

const createOrUpdateRememberPage = async(req, res) => {
    try {
        const rememberPage = req.body;
        //update in wp
        let wpCreatedRP = null;
        let user = req.user;
        if(rememberPage._id) {
            wpCreatedRP = await wpService.updateRememberPage(rememberPage);
        } else {
            wpCreatedRP = await wpService.createRememberPage(rememberPage);
        }
        //create or update in mongo db
        //set status, id, link
        rememberPage.status = "complete";
        rememberPage.wpPostId = wpCreatedRP.id;
        rememberPage.link = wpCreatedRP.link;
        updatedRememberPage = await rememberPageService.createOrUpdateRememberPage(rememberPage,user);

        //save rp to user
        await userService.updateUserRememberPage(updatedRememberPage._id,user);

        return res.status(200).json(updatedRememberPage);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createOrUpdateRememberPage
};