const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    const username = req.headers['username']
    const password = req.headers['password']

    try {
        const newUser = await User.create({ username, password })
        
        res.status(200).json({  message: 'User created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

router.get('/courses', async (req, res) => {
    try {
        const allCourses = await Course.find({})
        res.status(200).json({ courses : allCourses })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const username = req.headers['username']
    const courseId = req.params['courseId']

    try {
        const course = await User.updateOne(
            {   username : username },
            {  "$push": {   purchasedCourses: courseId }}      
        )
        res.status(200).json({ message: 'Course purchased successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
        const user = await User.findOne({
            username: req.headers.username
        });
    
        console.log(user.purchasedCourses);
        const courses = await Course.find({
            _id: {
                "$in": user.purchasedCourses
            }
        });
    
        res.json({
            courses: courses
        })
});

module.exports = router