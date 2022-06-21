const { Error } = require("mongoose");
const User = require("../models/user");
const RememberPage = require("../models/rememberPage");

//add new user to the users collection in the database
const createUser = async(newUser) => {
    var user = await User.findOne({email:newUser.email});
    if(user) {
        if(!user.isActive) {
            return 'userNotActive';
        } 
    }
   
    const userCreated = await User.create(newUser);
    return userCreated;
};

// get user by the unique email
const getUserByEmail = async(email) => {
    let user =  await User.findOne({ email: email  });
    if(!user) throw new Error("There are no user with this email");
    return user;
};
//update user details
const updateUser = async(id, updateduser) => {
    try {
        let user = await User.findByIdAndUpdate(id, updateduser, { new: true });
        return user;
    } catch (error) {
        console.log(error);
    }
};

//update user active status  by email address
const updateUserStatus = async(email, active) => {
    try {
        let user = await User.findOneAndUpdate({ email: email }, { isActive: active }, { new: false });
        return user;
    } catch (error) {
        console.log(error);
    }
};

const updateUserRememberPage = async (rpId,user,permission = 'pageManager' ) => {
    let rememberPages = user.rememberPages;
    if(!rememberPages) rememberPages = [];
    let userRp = rememberPages.findIndex((rp) => {
        return rp.page&&rp.page.toString() == rpId
    });
    if(userRp < 0 ) {
        console.log(" ---- Add Rp to user Remember pages as manager --------- ");
        rememberPages.push({
            page: rpId,
            Permissions: permission
        });

        await user.update({ rememberPages:rememberPages }, { new: false });
    }
}
const getUserRp = async(user) => {
    let rememberPages = user.rememberPages;
    if(rememberPages.length) {
        let rememberPage = await RememberPage.findById(rememberPages[rememberPages.length-1].page);
        return rememberPage;
    } else return null;
};

module.exports = {
    updateUserRememberPage,
    createUser,
    updateUser,
    updateUserStatus,
    getUserByEmail,
    getUserRp
};