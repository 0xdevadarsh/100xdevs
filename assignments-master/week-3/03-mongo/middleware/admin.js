const { Admin } = require('../db/index')

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers['username']
    const password = req.headers['password']

    const admin = await Admin.findOne({
        username,
        password
    })

    if (admin == null){
        res.status(401).json({
            message: 'Invalid User'
        })
    }
    next()

}

module.exports = adminMiddleware;