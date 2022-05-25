const RememberPage = require("../models/rememberPage");

const createOrUpdateRememberPage = async(rememebrPage,user) => {
    let rememberPageCreated = null;
    if(rememebrPage._id) {
        console.log("update remember page");
        //console.log(rememebrPage);
        rememberPageCreated = await RememberPage.findOne({_id: rememebrPage._id});
        await rememberPageCreated.update(rememebrPage);
        //console.log(rememberPageCreated);
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