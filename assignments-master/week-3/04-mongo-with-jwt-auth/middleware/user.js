const jwt = require('jwt')
const dotenv = reuire('dotenv')

dotenv.config()

function userMiddleware(req, res, next) {
    const auth = req.headers['Authorization']
    const token = auth.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SIGNING_PASSWORD)
        next()
    } catch (error) {
        res.status(401).json({ message : 'User is Invalid' })
    }
    
}

module.exports = userMiddleware;