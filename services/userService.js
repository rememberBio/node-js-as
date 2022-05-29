const { Error } = require("mongoose");
const User = require("../models/user");

//add new user to the users collection in the database
const createUser = async(newUser) => {
    const userCreated = await User.create(newUser);
    return userCreated;
};
// get user by _id
const getUserById = async(id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        console.log(error);
    }
};

// get user by the unique email
const getUserByEmailAndPassword = async(email,password) => {
    let user =  await User.findOne({ email: email  });
    if(user) {
        if(user.checkPassword(password)) return user;
        else throw new Error("The password is incorect");
    } else throw new Error("There are no user with this email");
};
// remove user from the users collection by authorized user
const deleteUser = async(user) => {
    try {
        return await User.deleteOne({ _id: user._id });
    } catch (error) {
        console.log(error);
    }
};

//get users collection
const getUsersList = async() => {
    try {
        let users = await User.find({})
        return users
    } catch (error) {
        console.log(error);
    }
};
//update user details
const updateUser = async(id, updateduser) => {
    try {
        console.log(updateduser.password);
        let user = await User.findByIdAndUpdate(id, updateduser, { new: false });
        return user;
    } catch (error) {
        console.log(error);
    }
};
//update user details
const updatePassword = async(id, password) => {
    try {
        let user = await User.findByIdAndUpdate(id, { password:password }, { new: false });
        console.log(password);
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
    let userRp = rememberPages.findIndex((rp) => {
        return rp.page.toString() == rpId
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
module.exports = {
    updateUserRememberPage,
    getUserById,
    createUser,
    deleteUser,
    getUsersList,
    updateUser,
    updateUserStatus,
    updatePassword,
    getUserByEmailAndPassword
};