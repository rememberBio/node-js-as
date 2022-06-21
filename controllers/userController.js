const userService = require("../services/userService");

const createUser = async(req, res) => {
    try {
        const user = req.body;
        const createdUser = await userService.createUser(user);
        if(createdUser == 'userNotActive') return res.status(200).send(createdUser);
        return res.status(200).json(createdUser);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

const getUserByEmail = async(req, res) => {
    try {
        const email = req.params.email;
        const user = await userService.getUserByEmail(email);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateUser = async(req, res, next) => {
    try {
        let user = await userService.updateUser(
            req.body.id,
            req.body.user
        );
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }

};


const updateUserStatus = async(req, res, next) => {
    try {
        let user = await userService.updateUserStatus(
            req.body.email,
            req.body.isActive
        );
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }

};
const getUserRp = async(req, res, next) => {
    try {
        const user = req.user;
        const rp = await userService.getUserRp(user);
        return res.status(200).json(rp); 
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}
module.exports = {
    createUser,
    updateUser,
    updateUserStatus,
    getUserByEmail,
    getUserRp
};