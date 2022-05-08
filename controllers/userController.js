const userService = require("../services/userService");
const passport = require('passport');
var jwt = require('jsonwebtoken');

const createUser = async(req, res) => {
    try {
        const user = req.body;
        const createdUser = await userService.createUser(user);
        return res.status(200).json(createdUser);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const getUserById = async(req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(200).json(user);
    }
}
const deleteUser = async(req, res) => {
    try {
        const user = req.body;
        const deleteUser = await userService.deleteUser(user);
        return res.status(200).json(deleteUser);
    } catch (error) {
        return res.status(200).json(deleteUser);
    }
}

const getUsersList = async(req, res) => {
    try {
        let users = await userService.getUsersList();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};


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

const updatePassword = async(req, res, next) => {
    try {
        let user = await userService.updatePassword(
            req.body.id,
            req.body.password
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


const login = async (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.sendStatus(401);
      }
  
      return res.send(user);
    });
};

const createToken = async(req, res, next) => {
    passport.authenticate('local',
        async (err, user, info) => {
  
        if (err) {
        return next(err);
        }

        if (!user) {
        return res.sendStatus(401);
        }
      //create token
      const token = jwt.sign(
        { id: user._id },
        'rememberuYEc2B'
      );
      try {
        res.status(200).send({token});
      } catch (error) {
        return res.status(500).send("Internal Server Error");
      }
    })(req, res, next);
}
module.exports = {
    getUserById,
    createUser,
    deleteUser,
    getUsersList,
    updateUser,
    updateUserStatus,
    createToken,
    updatePassword
};