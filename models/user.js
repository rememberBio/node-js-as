const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');

const saltRounds = 10;

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: mongoose.Schema.Types.String, unique: true, required: true },
    password: { type: String },
    phone: { type: String },
    isActive: { type: Boolean, default: false },
    types: [{ type: String, default: "pageManager" }], //editor,pageManager,siteManager
    rememberPages:[{
        page: { type: Schema.Types.ObjectId , ref: 'RememberPage' },
        permissions: { type: String, default: "pageManager" }, //editor, pageManager
    }],
});

userSchema.plugin(uniqueValidator);
userSchema.pre('save', function(next) {

    var user = this;
    
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });
});

userSchema.pre('findOneAndUpdate', function (next) {
    var user = this._update;
    if (!user.password) return next();
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
    });
    
});

userSchema.methods.checkPassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    })
};

module.exports = mongoose.model('User', userSchema);