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
    console.log('rp id: ',rememberPageCreated._id);
    
    return rememberPageCreated;
};

const getById = async(rememberPageId,user) => {
    let rememberPage = await RememberPage.findById(rememberPageId);
    if(!rememberPage) throw new Error('There are no rp with this id');
    if( rememberPage.pageManager && rememberPage.pageManager.toString() != user._id ) throw new Error('User is not allowed to edit this page');
    return rememberPage;
}
module.exports = {
    createOrUpdateRememberPage,
    getById
};