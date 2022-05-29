const RememberPage = require("../models/rememberPage");

const createOrUpdateRememberPage = async(rememebrPage,user) => {
    let rememberPageCreated = null;
    if(rememebrPage._id) {
        console.log("update remember page");
        //console.log(rememebrPage);
        rememberPageCreated = await RememberPage.findOne({_id: rememebrPage._id});
        if(!rememberPageCreated) throw new Error('Invalid id of rp');
        await rememberPageCreated.update(rememebrPage);
        rememberPageCreated = await RememberPage.findOne({_id: rememebrPage._id});
    } else {
        console.log("create remember page")
        if(!rememebrPage.pageManager) rememebrPage.pageManager = user._id;
        rememberPageCreated = await RememberPage.create(rememebrPage);
    }
    return rememberPageCreated;
};
module.exports = {
    createOrUpdateRememberPage
};