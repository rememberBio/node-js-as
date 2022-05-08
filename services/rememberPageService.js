const RememberPage = require("../models/rememberPage");

const createOrUpdateRememberPage = async(rememebrPage) => {
    try {
        let rememberPageCreated = null;
        if(rememebrPage['_id']) {
            rememberPageCreated = await RememberPage.findOneAndUpdate({_id: rememebrPage['_id'] },{rememebrPage});
        } else {
            rememberPageCreated = await RememberPage.create(rememebrPage);
        }
        return rememberPageCreated;
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    createOrUpdateRememberPage
};