const {User} = require('../db/index')

function userMiddleware(req, res, next) {
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers['username']
    const password = req.headers['password']

    const user = User.findOne({username, password})
    if (user == null) {
        res.status(401).json({ message : 'Invalid User'})
    }
    next()
}

module.exports = userMiddleware;