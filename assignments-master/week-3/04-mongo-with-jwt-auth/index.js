const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const { connectDB } = require("./db")

const app = express()
const PORT = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

async function initialiseServer() {
    /**
     * In production system , our server has dependency on other system,
     * so for our system to run properly, its important that those dependencies should be up and a persistent 
     * connection should be established between our server and all of its dependencies.
     */

    /**
     * For our use case the only dependency is the database connection
     */

    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(`Error while instantiating the server: ${error}`)
    }
}


initialiseServer()


