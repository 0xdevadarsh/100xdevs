require('dotenv').config();
const mongoose = require('mongoose');

const dbUri = process.env.MONGODB_URI

// Connect to MongoDB
const dbConnection = async () => {
    try {
        await mongoose.connect(dbUri)
        console.log("Database connection established !!!")
    } catch (error) {
        console.log(`Database connection failed: ${error}`)
        exit()
    }
}


const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    isPublished: Boolean
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    dbConnection,
    Admin,
    User,
    Course
}