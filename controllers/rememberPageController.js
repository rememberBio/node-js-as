const rememberPageService = require("../services/rememberPageService");
const wpService = require("../services/wpService");
const userService = require("../services/userService");

const createOrUpdateRememberPage = async(req, res) => {
    try {
        const rememberPage = req.body;
        let pageStatus = 'update';
        //update in wp
        let wpCreatedRP = null;
        let user = req.user;
        if(rememberPage._id) {
            if( rememberPage.pageManager && rememberPage.pageManager.toString() != user._id ) throw new Error('User is not allowed to edit this page');
            wpCreatedRP = await wpService.updateRememberPage(rememberPage);
        } else {
            pageStatus = 'create';
            if(!user.types.includes('pageManager')) throw new Error('User is not allowed to create page');
            wpCreatedRP = await wpService.createRememberPage(rememberPage);
        }
        //create or update in mongo db
        //set status, id, link
        rememberPage.status = "complete";
        rememberPage.wpPostId = wpCreatedRP.id;
        rememberPage.link = wpCreatedRP.link;
        updatedRememberPage = await rememberPageService.createOrUpdateRememberPage(rememberPage,user);

        //save rp to user
        if(pageStatus == 'create')
            await userService.updateUserRememberPage(updatedRememberPage._id,user);

        return res.status(200).json(updatedRememberPage);

    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};
const getById = async(req,res)=>{
    try {

        let user = req.user;

        const rpId = req.params.rpId;
        if(!rpId) throw new Error('There are no rp id');

        const rp = await rememberPageService.getById(rpId,user);
        
        return res.status(200).json(rp);

     } catch (err) {
        return res.status(500).send(err.message);
    }
}
module.exports = {
    createOrUpdateRememberPage,
    getById
};