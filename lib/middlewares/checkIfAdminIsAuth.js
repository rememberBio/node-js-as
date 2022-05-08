const createError = require('http-errors');
const admins = ["tova@shal3v.com"]

module.exports = async function(req, res, next) {
    try {
        if (req.user) {
            if(admins.includes(req.user.email)) {
                return next();
            } else {
                return next(createError(401));
            }
        }
        else{
            return next(createError(401));
        }
    } catch (error) {
        return next(error);    
    }
}
