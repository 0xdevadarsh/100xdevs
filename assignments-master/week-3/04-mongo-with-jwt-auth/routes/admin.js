const { Router } = require("express");
const jwt = require('jwt')
const dotenv = require('dotenv')
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db")
const router = Router();

dotenv.config()

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body['username']
    const password = req.body['password']

    try {
        const newAdmin = await Admin.create({ username, password })
        res.status(200).json({ message: 'Admin created successfully' })    
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'})
    }
});

router.post('/signin', async (req, res) => {
    const username = req.body['username']
    const password = req.body['password']   

    try {
        const user = await Admin.findOne({username, password})
        if (!user){
            const jwtToken = jwt.sign({username, password}, process.env.JWT_SIGNING_PASSWORD)
            res.status(200).json({ token: jwtToken })
        } else {
            res.status(401).json({ message: 'Invalid admin credentials' })
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body['title']
    const description = req.body['description']
    const price = req.body['price']
    const imageLink = req.body['imageLink']

    try {
        const newCourse = await Course.create({title, description, price, imageLink})
        res.status(200).json({ message: 'Course created successfully', courseId: newCourse._id })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    try {
        const allCouses = await Course.find({})
        res.status(200).json({ courses: allCouses })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
});

module.exports = router;