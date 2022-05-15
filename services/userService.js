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
const getUserByEmail = async(email) => {
    try {
        return await User.findOne({ email: email });
    } catch (error) {
        console.log(error);
    }
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

module.exports = {
    getUserById,
    createUser,
    deleteUser,
    getUsersList,
    updateUser,
    updateUserStatus,
    updatePassword,
    getUserByEmail
};